import React from "react";
import ReactDOM from "react-dom/client";
// 👇 수정됨: HashRouter 사용
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css"; // (이 경로에 css 파일이 있어야 합니다)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 👇 수정됨: 앱 전체를 HashRouter로 감싸기 */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);