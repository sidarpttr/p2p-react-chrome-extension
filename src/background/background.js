"use strict";

import { FETCH_ORDERS_URL } from "../constants/constants";
import { createFetchOrdersPayload } from "../utils/utils";

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
    const payload = createFetchOrdersPayload(storedToken);
    await fetch(FETCH_ORDERS_URL, payload)
        .then((response) => {
            if (response.ok) return response.json();
            return { status: "error", message: "bağlantı kurulamadı" };
        })
        .then((data) => sendResponse({ status: "success", data: data }))
        .catch((error) => {
            sendResponse({ status: "error", message: error.message });
        });
}
