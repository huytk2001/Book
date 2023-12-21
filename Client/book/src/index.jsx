import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

console.log("Application is rendered.");
console.log("====================================");
console.log(App); // Corrected log statement
console.log("====================================");
