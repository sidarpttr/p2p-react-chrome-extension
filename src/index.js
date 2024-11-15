import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./components/popup";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("root");
    if (container) {
        const root = createRoot(container);
        root.render(<Popup />);
    } else {
        console.error("Root container not found");
    }
});
