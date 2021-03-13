import * as tf from '@tensorflow/tfjs';

const ImageClassifier = async () => {
    const model = await tf.loadLayersModel('https://cnn-repo.s3.ap-east-1.amazonaws.com/models/tfjs/model.json')
    console.log(model)
}

export default ImageClassifier;