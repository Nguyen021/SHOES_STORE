import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import { legacy_createStore as createStore } from "redux";
import App from "./App";
import mainReducer from "./reducers/RootReducer";
import reportWebVitals from "./reportWebVitals";
const store = createStore(mainReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/* // <React.StrictMode> */}
    <App />
    {/* \ </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
