import { connectDB } from "./script/db-fetch.js";
import { taskList, dialog } from "./script/dom/index.js";
import "./main.css";

const app = document.querySelector("#app");

const init = async () => {
  await connectDB();
  await taskList.render();
  taskList.attachEvents();
  dialog.attachEvents();
};

init();
