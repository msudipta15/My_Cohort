import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import App2 from "./app2.jsx";

createRoot(document.getElementById("root")).render(<App />);
createRoot(document.getElementById("root2")).render(<App2 />);
