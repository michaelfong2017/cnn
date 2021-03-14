import React, { useEffect } from "react";
import {
    useRecoilValue,
    selector,
} from "recoil";

import { imagesAtom, filenamesAtom } from "components/DropArea"
import styled from "styled-components"
import DropArea from "components/DropArea"

const imageStyle = {
    width: 300,
    height: 300,
};

const ImageRows = styled.div`
    display: flex;
    flex-direction: column-reverse;
`;
const ImageRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 20px;
`;
const InputImage = styled.div`
    display: flex;
    flex-direction: column;
`
const Output = styled.h3`
    margin: auto 10%;
`

const imageRowsState = selector({
    key: 'imageRows',
    get: ({ get }) => {
        const images = get(imagesAtom);
        const filenames = get(filenamesAtom);

        const zip = (a, b) => a.map((k, i) => [k, b[i]])
        return zip(images, filenames)
    },
});

const ImageTable = () => {
    const imageRows = useRecoilValue(imageRowsState)
    console.log(imageRows)

    return (
        <div>
            <h2 style={{ marginTop: "15px" }}>
                Camouflage clothes VS Normal clothes classification
            </h2>
            <DropArea></DropArea>
            <ImageRows>
                {imageRows.map((imageRow, i) => (
                    <ImageRow key={i}>
                        <InputImage>
                            <img style={imageStyle} src={imageRow[0]} />
                            <div>{imageRow[1]}</div>
                        </InputImage>
                        <Output>
                            Camouflage clothes
                        </Output>
                    </ImageRow>
                ))}
            </ImageRows>
        </div >
    );
}

export default ImageTable