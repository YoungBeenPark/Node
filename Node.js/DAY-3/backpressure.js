const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipe = promisify(pipeline);

async function copyFile() {
  try {
    await pipe(
      fs.createReadStream('copy.txt'),
      fs.createWriteStream('backreplica.txt')
    );
    console.log('File copy completed.');
  } catch (err) {
    console.error('Pipeline failed.', err);
  }
}

copyFile();