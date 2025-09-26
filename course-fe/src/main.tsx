import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/user/index.scss";
import Layout from "./Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Layout />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
