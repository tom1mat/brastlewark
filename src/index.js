import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./styles/bootstrap.min.css";
import "./styles/styles.css";
// document.addEventListener("keydown", event => {
//   const input = document.getElementById("search");
//   if (event.ctrlKey && event.keyCode == 32) {
//     if (input.classList.contains("centered")) {
//       input.placeholder = "Search";
//       input.classList.remove("centered");
//       input.focus();
//     } else {
//       input.placeholder = "Search (Press ESC to dismiss)";
//       input.classList.add("centered");
//       input.focus();
//     }
//   } else {
//     input.placeholder = "Search";
//   }
//   if (event.keyCode == 27) {
//     input.classList.remove("centered");
//     window.focus();
//   }
// });
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
