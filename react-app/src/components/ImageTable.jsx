import React, { lazy, Suspense } from "react"; import {
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
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
`;

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
            <DropArea></DropArea>
            <ImageRows>
                {imageRows.map((imageRow) => (
                    <ImageRow>
                        <img style={imageStyle} src={imageRow[0]} />
                        <div>{imageRow[1]}</div>
                    </ImageRow>
                ))}
            </ImageRows>
        </div>
    );
}

export default ImageTable