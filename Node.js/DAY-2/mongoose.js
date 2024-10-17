const mongoose = require('mongoose');

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// User 스키마 정의
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number }
});

// User 모델 생성
const User = mongoose.model('User', userSchema);

// 새로운 사용자 생성 및 저장
const createUser = async () => {
  const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });

  try {
    const savedUser = await newUser.save();
    console.log('사용자 저장 성공:', savedUser);
  } catch (error) {
    console.error('사용자 저장 실패:', error);
  }
};

createUser();