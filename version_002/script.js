// main.js

import { initDB } from "./script/db.js";
import { taskList, dialog } from "./script/dom/index.js";

window.onload = async () => {
  await initDB();
  await taskList.render();
  taskList.attachEvents();
  dialog.attachEvents();
};
