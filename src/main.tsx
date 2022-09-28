import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Intl from "@/components/Intl";
import store from "@/store";
import Router from "@/router/index";
import "./main.less";

const App: React.FC = () => {
  if (!window.global) window.global = globalThis;
  return (
    <Provider store={store}>
      <Intl>
        <Router />
      </Intl>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
