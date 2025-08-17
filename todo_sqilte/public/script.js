// script.js

import { connectDB } from "./script/db-fetch.js";
import { taskList, dialog } from "./script/dom/index.js";

window.onload = async () => {
  await connectDB();
  await taskList.render();
  taskList.attachEvents();
  dialog.attachEvents();
};
