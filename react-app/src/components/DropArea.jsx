import React, { useEffect, useState, useRef } from "react";
import {
  useRecoilState,
  atom
} from "recoil";
import styled from "styled-components"

import sample1 from "images/classification/Sample 1.jpeg"
import sample2 from "images/classification/Sample 2.jpeg"
import sample3 from "images/classification/Sample 3.jpeg"

const width = "300px";
const height = "300px";
const borderStyle = "2px dotted #000";

const DragBox = styled.div`
  width: ${width};
  height: ${height};
  border: ${borderStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  white-space: pre-line;
`

const maxImageNumber = 8

const imagesAtom = atom({
  key: 'images',
  default: [sample1, sample2, sample3]
})
const filenamesAtom = atom({
  key: 'filenames',
  default: ["Sample 1.jpeg", "Sample 2.jpeg", "Sample 3.jpeg"]
})

const DropArea = () => {
  const [images, setImages] = useRecoilState(imagesAtom)
  const [filenames, setFilenames] = useRecoilState(filenamesAtom)
  const [err, setErr] = useState(false)

  const container = useRef(null);


  const handleFileChosen = async (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  }


  const readAllFiles = async (AllFiles) => {
    const results = await Promise.all(AllFiles.map(async (file) => {
      const fileContents = await handleFileChosen(file);
      setImages(images => {
        let length = images.length + 1
        return [...images, fileContents].slice(Math.max(length - maxImageNumber, 0))
      });
      return fileContents;
    }));
    return results;
  }

  const loadImageUrl = async (url) => {
    return new Promise((resolve, reject) => {
      const im = new Image()
      im.src = url
      im.crossOrigin = 'anonymous'
      im.onload = () => {
        resolve(im)

        setImages(images => {
          let length = images.length + 1
          return [...images, url].slice(Math.max(length - maxImageNumber, 0))
        });
        setErr("")
      }
      im.onerror = () => {
        console.log("onerror")
        reject(im)

        setErr("File format must be either png or jpg, not hyperlink or else!");
      }
    })
  }

  /* Input by drag and drop */

  const onDrop = (e) => {
    e.preventDefault();

    const imageUrl = e.dataTransfer.getData('url')
    const {
      dataTransfer: { files },
    } = e;

    console.log("imageUrl: ", imageUrl)
    console.log("files: ", files);

    /* If user is dragging online image from another window, directly process and return */
    if (imageUrl !== null) {
      loadImageUrl(imageUrl)
    }

    const { length } = files;

    if (length === 0) {
      return false;
    }
    const fileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      // "image/gif",
      // "image/x-icon",
    ];
    const { size, type } = files[0];

    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    console.log(readAllFiles(Array.from(files)))

    // Retrieve and save filenames
    var newFilenames = []
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      newFilenames.push(files[i].name);
    }
    setFilenames(filenames => {
      let length = filenames.length + newFilenames.length
      return [...filenames, ...newFilenames].slice(Math.max(length - maxImageNumber, 0))
    });
  };
  const onDragEnter = (e) => {
    console.log("onDragEnter");
    e.preventDefault();
  };
  const onDragLeave = (e) => {
    console.log("onDragLeave");
    e.preventDefault();
  };
  const onDragOver = (e) => {
    console.log("onDragOver");
    e.preventDefault();
  };

  /* Input by input URL */
  const [inputUrl, setInputUrl] = useState('')
  const handleChangeUrl = (e) => {
    setInputUrl(e.target.value)
  }
  const handleSubmitUrl = (e) => {
    e.preventDefault()
    loadImageUrl(inputUrl)
  }

  useEffect(() => {
    console.log("DropArea useEffect is called");

    if (container.current) {
      let div = container.current;
      div.addEventListener("dragenter", onDragEnter);
      div.addEventListener("dragleave", onDragLeave);
      div.addEventListener("dragover", onDragOver);
      div.addEventListener("drop", onDrop);
    }
    return () => {
      /* This if condition prevents null error, it needs to be inside "return". */
      if (container.current) {
        let div = container.current;
        div.removeEventListener("dragenter", onDragEnter);
        div.removeEventListener("dragleave", onDragLeave);
        div.removeEventListener("dragover", onDragOver);
        div.removeEventListener("drop", onDrop);
      }
    };
    /* Usually it is good to include "container.current" in the dependency array, this time it is also
    good to not include it so that useEffect is only executed once at the beginning instead of twice. */
  }, []);

  return (
    <div>
      {err && <p>{err}</p>}
      <DragBox ref={container}>
        {"Drag images here (from local\n\nfilesystem or browser window)"}
      </DragBox>
      <form onSubmit={handleSubmitUrl}>
        <label style={{whiteSpace: "pre"}}>
          {"Image URL:  "}
          <input type="text" value={inputUrl} onChange={handleChangeUrl} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="button-wrapper" style={{ marginTop: "15px" }}>
        {images && <button onClick={() => {
          setImages([])
          setFilenames([])
        }}>Remove All</button>}
      </div>
      <h5 style={{ marginTop: "20px" }}>Maximum {maxImageNumber} images</h5>
    </div>
  );
};
export { DropArea as default, imagesAtom, filenamesAtom };
