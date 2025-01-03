# Face Emotion Detection Web App

This is a simple web-based application that detects emotions from images using **face-api.js**. It leverages pre-trained deep learning models to analyze facial expressions and categorize them into emotions such as **happy**, **sad**, **surprised**, **angry**, and more.

## Features

- **Upload Image**: Upload an image from your device to detect emotions.
- **Real-Time Emotion Detection**: Automatically detects the dominant emotion from the uploaded image.
- **Multiple Emotions**: Displays the emotion with the highest confidence score.

## Technology Stack

- **HTML5**: For the webpage structure.
- **CSS3**: For styling the app.
- **JavaScript**: For handling image processing and emotion detection.
- **face-api.js**: A library for face detection and emotion recognition based on deep learning.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/BaseMax/face-emotion-detection-web.git
cd face-emotion-detection-web
```

### 2. Install a Local Web Server

To run this app locally, you will need to serve the files using a local web server.

**Using http-server (via npm):**

If you have Node.js installed, you can use http-server to serve the app.

```bash
npm install -g http-server
http-server .
```

### 3. Download the Models

The app uses pre-trained models from `face-api.js`. You need to download these models and place them in a models folder in the root directory.

Go to the face-api.js model directory.

Download the following models:
- ssdMobilenetv1
- faceLandmark68Net
- faceRecognitionNet (optional)
- ageGenderNet (optional)
- faceExpressionNet

After downloading the models from the `/weights` directory (https://github.com/justadudewhohacks/face-api.js), place them in the `/models` folder within your project directory.

### 4. Run the Application

Once you have the models in place and the server running, open your browser and navigate to:

```bash
http://localhost:8080
```

You should be able to upload an image and see the emotion detected from the face.

## How It Works

- The user uploads an image using the file input.
- The image is processed using the `face-api.js` library.
- The library detects the face(s) in the image, processes the facial landmarks, and analyzes the emotion.
- The detected emotion with the highest confidence score is displayed.

## Emotion Detection

The following emotions can be detected:

- Happy
- Sad
- Surprised
- Angry
- Disgusted
- Fearful

### Contributing

If you would like to contribute to this project, feel free to fork the repository, create a branch, and submit a pull request. Make sure to follow these steps:

- Fork the repository.
- Create a new branch.
- Make your changes.
- Create a pull request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

- face-api.js for providing pre-trained models for face detection and emotion recognition.
- TensorFlow.js for powering various machine learning models.

Copyright 2024, Max Base
