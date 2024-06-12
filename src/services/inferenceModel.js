const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

    const classes = ["Apel", "Mangga", "Pisang", "Jeruk", "Strawberry"];

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const fruitName = classes[classResult];

    return { fruitName, confidenceScore  };
  } catch (error) {
    console.log("Kesalahan Input");
  }
}

module.exports = predictClassification;