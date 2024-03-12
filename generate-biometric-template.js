const fs = require('fs');
const faceapi = require('face-api.js');
const path = require('path');

// Load face-api.js models
const MODEL_URL = './node_modules/face-api.js/weights';
faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);

// Function to generate biometric template from a facial recognition image
async function generateBiometricTemplate(imagePath) {
  // Load image
  const img = await faceapi.fetchImage(imagePath);

  // Detect face
  const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

  // Check if a face is detected
  if (detections.length > 0) {
    const faceDescriptor = detections[0].descriptor;

    // The 'faceDescriptor' contains the facial features and can be considered as a biometric template
    console.log('Biometric Template:', faceDescriptor);

    // You can save the biometric template to a file or a database if needed
    // fs.writeFileSync('biometric_template.json', JSON.stringify(faceDescriptor));
  } else {
    console.log('No face detected in the image.');
  }
}

// Example usage
const imagePath = '/1593014642661.jpg'
generateBiometricTemplate(imagePath);
