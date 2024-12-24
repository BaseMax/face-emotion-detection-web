async function loadModels() {
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('models');
    await faceapi.nets.ageGenderNet.loadFromUri('models');
    await faceapi.nets.faceExpressionNet.loadFromUri('models');
    console.log("Models loaded successfully.");

    document.getElementById('imageUpload').disabled = false;
    document.getElementById('loadingIndicator').style.display = 'none';
  } catch (error) {
    console.error("Error loading models:", error);
  }
}

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const img = await faceapi.bufferToImage(file);
    const canvasElement = document.querySelector('canvas');

    canvasElement.style.display = 'block';
    canvasElement.width = img.width;
    canvasElement.height = img.height;

    const canvas = faceapi.createCanvasFromMedia(img);
    canvasElement.replaceWith(canvas);

    const detections = await faceapi.detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceExpressions();

    faceapi.matchDimensions(canvas, img);
    const resizedDetections = faceapi.resizeResults(detections, img);

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const expressions = detections[0]?.expressions;
    if (expressions) {
      const emotion = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0];
      document.getElementById('emotionResult').innerText = `Detected Emotion: ${emotion[0]} (${Math.round(emotion[1] * 100)}%)`;
    }
  }
}

document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

window.onload = async () => {
  await loadModels();
};
