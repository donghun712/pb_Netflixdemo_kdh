import React from "react";
import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/common/ToastContext";

const App: React.FC = () => {
  return (
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