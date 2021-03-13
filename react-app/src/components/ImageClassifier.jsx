import React, { useEffect } from "react"; 
import * as tf from '@tensorflow/tfjs';
import {
    useRecoilValue,
} from "recoil";
import { imagesAtom } from "components/DropArea"

var model
const LoadModel = async () => {
    model = await tf.loadLayersModel('https://cnn-repo.s3.ap-east-1.amazonaws.com/models/tfjs/model.json')
    console.log(model)
    Predict() /* In case the user drag images earlier than model load */
}

const Predict = (images) => {
    console.log("Predict")
}

const ImageClassifier = () => {
    const images = useRecoilValue(imagesAtom)

    Predict(images)

    useEffect(() => {
        LoadModel()
    }, [])

    return (
        <div></div>
    )
}

export { ImageClassifier as default };