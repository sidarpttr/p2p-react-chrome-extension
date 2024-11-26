import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./components/pages/popup";
import { AppProvider } from "./components/pages/popup";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("root");
    if (container) {
        const root = createRoot(container);
        root.render(
            <AppProvider>
                <Popup />
            </AppProvider>
        );
    } else {
        console.error("Root container not found");
    }
});
