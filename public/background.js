"use strict";

let storedToken = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "makeRequest") {
        makeRequest(sendResponse);
        return true; // Indicates that the response will be sent asynchronously
    } else if (request.action === "storeToken") {
        storedToken = request.payload.token;
        console.log("Token stored:", storedToken);
        sendResponse({ status: "success" });
    } else {
        console.warn("Unknown action:", request.action);
        sendResponse({ status: "error", message: "Unknown action" });
    }
});

/**
 * Makes a request and sends the response.
 * @param {function} sendResponse - Function to send a response.
 */
async function makeRequest(sendResponse) {
    if (!storedToken) {
        sendResponse({ status: "error", message: "No token stored" });
        return;
    }

    try {
        const response = await fetch("http://192.168.158.252:3000", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            sendResponse({ status: "error", message: "Failed to fetch data" });
            return;
        }

        const data = await response.json();
        sendResponse({ status: "success", data: data });
    } catch (error) {
        sendResponse({ status: "error", message: error.message });
    }
}
