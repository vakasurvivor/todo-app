import styles from "./Dialog.module.css";
import clsx from "clsx";
import { useDialog } from "@/DialogContext";

export default function Dialog({ ref }) {
  const { closeDialog } = useDialog();
  return (
    <dialog
      aria-labelledby="tech-stack-label"
      className={clsx(styles.dialog, "dialog-fade-up")}
      id="tech-stack-dialog"
      ref={ref}
    >
      <section aria-labelledby="tech-stack-label">
        <div>
          <img width="24" height="24" src="img/layers.svg" alt="" />
          <h2 id="tech-stack-label">技術選定</h2>
        </div>
        <section aria-labelledby="frontend-label">
          <h3 id="frontend-label">Frontend</h3>
          <ul>
            <li>
              <div>
                <img
                  width="24"
                  height="24"
                  src="img/frontend/vite.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Vite</span>
              </div>
            </li>
            <li>
              <div>
                <img
                  width="24"
                  height="24"
                  src="img/frontend/react.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>React (JavaScript)</span>
              </div>
            </li>
            <li>
              <div>
                <img
                  width="24"
                  height="24"
                  src="img/frontend/css-modules.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>CSS Modules</span>
              </div>
            </li>
          </ul>
        </section>
        <section aria-labelledby="backend-label">
          <h3 id="backend-label">Backend</h3>
          <ul>
            <li>
              <div>
                <img
                  width="24"
                  height="24"
                  src="img/backend/nginx.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>nginx（HTTP Server）</span>
              </div>
              <ul>
                <li>dist (from Vite)</li>
              </ul>
            </li>
            <li>
              <div>
                <img
                  width="24"
                  height="24"
                  src="img/backend/node-js.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Node.js (API Server)</span>
              </div>
              <ul>
                <li>Express</li>
                <li>Prisma</li>
              </ul>
            </li>
            <li>
              <div>
                <img
                  width="24"
                  height="24"
                  src="img/backend/postgresql.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>PostgorSQL (DB Server)</span>
              </div>
            </li>
          </ul>
        </section>
        <div>
          <button
            aria-label="閉じる"
            className="close-dialog shadow-sm"
            type="button"
            onClick={closeDialog}
          >
            閉じる
          </button>
        </div>
      </section>
    </dialog>
  );
}
