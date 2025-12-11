import React from "react";
import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/common/ToastContext";

const App: React.FC = () => {
  return (
    // main.tsx에 Router가 있으므로 여기는 Provider만 감쌉니다.
    <AuthProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;

/* z-index 관리
   - Hero Background: 0
   - Hero Content: 1
   - Header: 999
   - Login Page (Auth): 1000
   - Toast Message: 1001
*/