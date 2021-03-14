import React, { useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import {
    useRecoilValue,
} from "recoil";
import { imagesAtom } from "components/DropArea"

var model
var images

const loadModel = async () => {
    model = await tf.loadLayersModel('https://cnn-repo.s3.ap-east-1.amazonaws.com/models/tfjs/model.json')
    console.log(model)
    return model
}

const loadImageUrl = async (url) => {
    return new Promise((resolve, reject) => {
        const im = new Image()
        im.src = url
        im.onload = () => {
            resolve(im)
        }
    })
}

const predict = async (images) => {
    console.log("predict")
    console.log(images)

    const predictions = await Promise.all(images.map(async (image) => {
        const img = await loadImageUrl(image)
        const tensorImg = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
        const prediction = await model.predict(tensorImg).data();
        return prediction
    }))

    return predictions
}

const ImageClassifier = () => {
    images = useRecoilValue(imagesAtom)

    if (model) {
        const predictions = predict(images)
        console.log(predictions)
    }

    useEffect(() => {
        loadModel().then(() => {
            /* In case the user drag images earlier than model load */
            const predictions = predict(images)
            console.log(predictions)
        })
    }, [])

    return (
        <div></div>
    )
}

export { ImageClassifier as default };