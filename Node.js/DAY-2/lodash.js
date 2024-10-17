const _ = require('lodash');

const users = [
  { 'user': 'Alice', 'age': 25 },
  { 'user': 'Bob', 'age': 30 },
  { 'user': 'Charlie', 'age': 35 }
];

// 사용자 이름만 추출
const userNames = _.map(users, 'user');
console.log(userNames); // 출력: ['Alice', 'Bob', 'Charlie']

// 나이가 30 이상인 사용자 필터링
const filteredUsers = _.filter(users, user => user.age >= 30);
console.log(filteredUsers);
// 출력: [{ 'user': 'Bob', 'age': 30 }, { 'user': 'Charlie', 'age': 35 }]