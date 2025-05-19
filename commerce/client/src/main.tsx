import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/app/store.ts";
import { Provider } from "react-redux";
import { UserAuthProvider } from "./context/useAuthContext.tsx";
import "./index.css";
import { ThemeProvider } from "./context/useThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <UserAuthProvider>
            <App />
          </UserAuthProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
