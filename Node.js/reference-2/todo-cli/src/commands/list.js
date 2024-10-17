import { loadTodos } from "../utils/fileHandler.js";
import { displayTodos } from "../utils/formatter.js";

async function listTodos() {
  const todos = await loadTodos();

  displayTodos(todoos);
}

export { listTodos };