1. Add.js
기존 함수에서
async function addTodo() {

다른 모듈에서 사용할 수 있도록 내보내도록 수정
export const addTodo = async () => {


2. search.js
Search.js 상단 부분에 import chalk from 'chalk'; 없어서 추가