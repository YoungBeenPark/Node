const fs = require('fs');

const source = fs.createReadStream('copy.txt');
const destination = fs.createWriteStream('replica.txt');

let totalBytes = 0;

source.pipe(destination);

source.on('data', (chunk) => {
  totalBytes += chunk.length;
  console.log(`Copied ${totalBytes} bytes of data.`);
});

source.on('end', () => {
  console.log('파일 복사를 완료했습니다.');
});

source.on('error', (err) => {
  console.error('읽기 에러:', err);
});

destination.on('error', (err) => {
  console.error('쓰기 에러:', err);
});