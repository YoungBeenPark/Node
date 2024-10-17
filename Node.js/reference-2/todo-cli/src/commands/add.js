import inquirer from "inquirer";
import { saveTodos, loadTodos } from "../utils/fileHandler.js"
import { v4 as uuid4 } from "uuid"
import chalk from "chalk";

export const addTodo = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "할 일의 제목을 입력하세요:",
      validate: (input) => (input ? true : "제목을 입력해야 합니다."),
    },
    {
      type: "input",
      name: "description",
      message: "할 일의 설명을 입력하세요. (선택 사항):",
    },
  ]);

  const todos = await loadTodos();

  todos.push({
    id: uuid4(),
    title: answers.title,
    description: answers.description || "",
    completed: false,
  });

  await saveTodos(todos);

  console.log(chalk.green("할 일이 성공적으로 추가되었습니다!"));
}