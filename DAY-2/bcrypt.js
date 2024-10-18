const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainPassword = 'myPassword123';

// 비밀번호 해싱
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);

  // 해싱된 비밀번호와 평문 비교
  bcrypt.compare(plainPassword, hash, (err, result) => {
    if (err) throw err;
    console.log('Password match:', result); // 출력: true
  });
});