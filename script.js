async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  await faceapi.nets.ageGenderNet.loadFromUri('/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/models');
}

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const img = await faceapi.bufferToImage(file);
    document.querySelector('canvas').style.display = 'block';
    document.querySelector('canvas').width = img.width;
    document.querySelector('canvas').height = img.height;
    
    const canvas = faceapi.createCanvasFromMedia(img);
    document.body.append(canvas);
    
    const detections = await faceapi.detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceExpressions();

    faceapi.matchDimensions(canvas, img);
    const resizedDetections = faceapi.resizeResults(detections, img);
    canvas?.clear();
    canvas?.drawDetections(resizedDetections);
    canvas?.drawFaceExpressions(resizedDetections);

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
