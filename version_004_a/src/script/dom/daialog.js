// dom/dialog.js

export const dialog = {
  attachEvents,
};

function attachEvents() {
  const dialogEl = document.getElementById("tech-stack-dialog");
  const openBtnEl = document.querySelector(".open-dialog");
  const closeBtnEl = document.querySelector(".close-dialog");

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
