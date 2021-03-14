import React, { useEffect } from "react";
import {
    useRecoilValue,
    selector,
} from "recoil";

import { imagesAtom, filenamesAtom } from "components/DropArea"
import { predictionsAtom } from "components/ImageClassifier"

import styled from "styled-components"
import DropArea from "components/DropArea"

const imageStyle = {
    width: 300,
    height: 300,
};

const ImageRow = styled.div`
    display: flex;
    flex-direction: row;
`;
const ImageColumn = styled.div`
    display: flex;
    flex-direction: column-reverse;
`;
const InputImage = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
`
const Output = styled.h3`
    margin: auto 10%;
    white-space: pre-line;
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
    const predictions = useRecoilValue(predictionsAtom)
    console.log(imageRows)

    return (
        <div>
            <h2 style={{ marginTop: "15px" }}>
                Camouflage clothes VS Normal clothes classification
            </h2>
            <DropArea></DropArea>

            <ImageRow>
                <ImageColumn>
                    {imageRows.map((imageRow, i) => (
                        <InputImage key={i}>
                            <img style={imageStyle} src={imageRow[0]} />
                            <div>{imageRow[1]}</div>
                        </InputImage>
                    ))}
                </ImageColumn>
                <ImageColumn>
                    {predictions.map((prediction, i) => (
                        <Output key={i}>
                            <div style={{fontSize: "15px"}}>
                                {"Probability of camouflage clothes: " + prediction[0] + "\n\n"
                                    + "Probability of normal clothes: " + prediction[1] + "\n\n"}
                            </div>
                            <div style={{ color: "#6232a8" }}>
                                {prediction[0] > prediction[1] ? "Camouflage clothes" : "Normal clothes"}
                            </div>
                        </Output>
                    ))}
                </ImageColumn>
            </ImageRow>

        </div >
    );
}

export default ImageTable