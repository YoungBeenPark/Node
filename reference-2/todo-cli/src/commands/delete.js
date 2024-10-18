import inquirer from "inquirer";
import { saveTodos, loadTodos } from "../utils/fileHandler.js";
import chalk from "chalk";

async function deleteTodo() {
  const todos = await loadTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow("삭제할 할 일이 없습니다."));
    
    return;
  }

  const choices = todos.map((todo, index) => ({
    name: `${todo.title} (${todo.completed ? "완료" : "미완료"})`,
    value: todo.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "삭제할 할 일을 선택하세요:",
      choices,
    },
  ]);

  const updatedTodos = todos.filter((todo) => todo.id !== answers.id);

  await saveTodos(updatedTodos);

  console.log(chalk.green("할 일이 성공적으로 삭제되었습니다!"));
}

export { deleteTodo };