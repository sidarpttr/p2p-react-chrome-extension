const axios = require("axios");

class CustomHttpAdapter {
    constructor(sslContext = null) {
        this.sslContext = sslContext;
        this.instance = axios.create({
            httpsAgent: sslContext ? new (require("https").Agent)(sslContext) : undefined,
        });
    }
}

function legacySession() {
    let sslContext = null;
    if (typeof window === "undefined") {
        // Node.js ortamında çalışıyorsak SSL/TLS seçeneklerini kullan
        sslContext = {
            secureOptions: require("https").constants.SSL_OP_LEGACY_SERVER_CONNECT,
        };
    }

    return new CustomHttpAdapter(sslContext).instance;
}

function modernSession() {
    let sslContext = null;
    if (typeof window === "undefined") {
        // Node.js ortamında çalışıyorsak SSL/TLS seçeneklerini kullan
        sslContext = {
            secureOptions:
                require("https").constants.SSL_OP_NO_SSLv2 | require("https").constants.SSL_OP_NO_SSLv3,
        };
    }

    return new CustomHttpAdapter(sslContext).instance;
}

module.exports = { legacySession, modernSession };
