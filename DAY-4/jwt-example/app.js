// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3002;

// 비밀 키 (환경 변수로 관리하는 것이 좋음)
const SECRET_KEY = 'your_secret_key';

// 미들웨어 설정
app.use(bodyParser.json());

// 로그인 라우트: 사용자 인증 후 JWT 발급
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자 인증 로직 (예시: 간단한 검증)
  if (username === 'user' && password === 'password') {
    // 페이로드에 포함할 정보
    const payload = {
      username: username,
      role: 'admin'
    };

    // 토큰 생성
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 인증 미들웨어: 토큰 검증
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Bearer 토큰 분리
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// 보호된 라우트: 인증된 사용자만 접근 가능
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({
    message: 'You have accessed a protected route',
    user: req.user
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});