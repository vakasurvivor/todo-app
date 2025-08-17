// main.js

import { initDB } from "./script/db-array.js";
import { renderTaskList, attachTaskListEvents } from "./script/dom.js";

window.onload = async () => {
  await initDB({
    onSuccess: renderTaskList,
  });

  attachTaskListEvents();
  attachDialogEvents();
};

function attachDialogEvents() {
  const dialogEl = document.getElementById("techStackDialog");
  const openBtnEl = document.getElementById("openTechStack");
  const closeBtnEl = document.getElementById("closeTechStack");

  openBtnEl.addEventListener("click", () => {
    dialogEl.showModal();
    openBtnEl.setAttribute("aria-expanded", "true");
  });

  closeBtnEl.addEventListener("click", () => {
    dialogEl.close();
    openBtnEl.setAttribute("aria-expanded", "false");
    openBtnEl.focus();
  });

  dialogEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dialogEl.close();
      openBtnEl.setAttribute("aria-expanded", "false");
      openBtnEl.focus();
    }
  });
}
