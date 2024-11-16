const https = require("https");
const axios = require("axios");

class CustomHttpAdapter {
    constructor(sslContext = null) {
        this.sslContext = sslContext;
        this.instance = axios.create({
            httpsAgent: new https.Agent({
                ...sslContext,
            }),
        });
    }
}

function legacySession() {
    const sslContext = {
        secureOptions: https.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    };

    return new CustomHttpAdapter(sslContext).instance;
}

module.exports = { legacySession };
