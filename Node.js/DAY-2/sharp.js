const sharp = require('sharp');

sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', (err, info) => {
    if (err) {
      console.error('Error processing image:', err);
    } else {
      console.log('Image processed:', info);
    }
  });