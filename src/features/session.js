const https = require("https");
const axios = require("axios");


class CustomHttpAdapter {
    constructor(ctx) {
        this.ctx = ctx;
    }

    request(config) {
        config.httpsAgent = new https.Agent(this.ctx);
        return axios.request(config);
    }
}

function legacySession() {
    const ctx = {
        secureOptions: 0x4 // OP_LEGACY_SERVER_CONNECT
    };

    const instance = axios.create({
        httpsAgent: new https.Agent(ctx)
    });

    return instance;
}

function modernSession() {
    const agent = new https.Agent({
        rejectUnauthorized: true, // Default SSL context
    });

    const instance = axios.create({
        httpsAgent: agent,
    });

    return instance;
}

module.exports = { legacySession, modernSession };
