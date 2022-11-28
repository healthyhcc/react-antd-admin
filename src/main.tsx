import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import IntlTheme from "@/components/IntlTheme";
import store from "@/store";
import Router from "@/router/index";
import "./main.css";

const App: React.FC = () => {
  if (!window.global) window.global = globalThis;
  return (
    <Provider store={store}>
      <IntlTheme>
        <Router />
      </IntlTheme>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
