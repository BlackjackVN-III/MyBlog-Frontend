import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SignalRProvider } from "./context/SignalRContext.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <SignalRProvider>
      <App />
    </SignalRProvider>
  </AuthProvider>
);