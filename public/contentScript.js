"use strict";

/**
 * Sends a message to the background script.
 * @param {string} action - The action to be performed.
 * @param {Object} payload - The payload to be sent with the message.
 */
function sendMessage(action, payload) {
    chrome.runtime.sendMessage({ action, payload }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("Message sent:", response);
        }
    });
}

const session = localStorage.getItem("session");
if (session) {
    const token = JSON.parse(session).access_token;
    sendMessage("storeToken", { token });
} else {
    console.error("Session not found in localStorage");
}
