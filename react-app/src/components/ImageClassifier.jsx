import React, { useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import {
    useRecoilState,
    atom,
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
        im.crossOrigin = 'anonymous'
        im.onload = () => {
            resolve(im)
        }
    })
}

const predictionsAtom = atom({
    key: 'predictions',
    default: []
})

const ImageClassifier = () => {
    images = useRecoilValue(imagesAtom)
    const [predictions, setPredictions] = useRecoilState(predictionsAtom)

    const predict = async (images) => {
        console.log("predict")
        console.log(images)

        await Promise.all(images.map(async (image) => {
            const img = await loadImageUrl(image)
            const tensorImg = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
            const prediction = await model.predict(tensorImg).data();
            return prediction
        })).then((values) => {
            setPredictions(values)
            console.log("Time: " + Date.now())
        })
    }

    useEffect(() => {
        if (model) {
            console.log("Time: " + Date.now())
            predict(images)
        }
        else {
            loadModel().then(() => {
                /* In case the user drag images earlier than model load */
                predict(images)
            })
        }
    }, [images])

    return (
        <div></div>
    )
}

export { ImageClassifier as default, predictionsAtom };