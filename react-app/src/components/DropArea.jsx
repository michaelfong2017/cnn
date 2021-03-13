import React, { useEffect, useState, useRef } from "react";
import {
  useRecoilState,
  atom
} from "recoil";

const width = 300;
const height = 300;
const borderStyle = "2px dotted #000";

const dropAreaStyle = {
  width: width,
  height: height,
  border: borderStyle,
};

const imagesAtom = atom({
  key: 'images',
  default: []
})
const filenamesAtom = atom({
  key: 'filenames',
  default: []
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
      setImages(images => [...images, fileContents]);
      return fileContents;
    }));
    return results;
  }



  const onDrop = (e) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    console.log("Files: ", files);
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
    setFilenames(filenames => [...filenames, ...newFilenames]);
    console.log([...filenames, ...newFilenames])
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
      let div = container.current;
      div.removeEventListener("dragenter", onDragEnter);
      div.removeEventListener("dragleave", onDragLeave);
      div.removeEventListener("dragover", onDragOver);
      div.removeEventListener("drop", onDrop);
    };
  }, [container.current]);

  return (
    <div>
      {err && <p>{err}</p>}
      <div style={dropAreaStyle} ref={container}>

      </div>
      <div className="button-wrapper">
        {images && <button onClick={() => {
          setImages([])
          setFilenames([])
        }}>Remove All</button>}
      </div>
    </div>
  );
};
export { DropArea as default, imagesAtom, filenamesAtom };
