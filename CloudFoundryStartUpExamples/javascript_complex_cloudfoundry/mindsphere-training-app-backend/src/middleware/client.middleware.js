const got = require('got');
const HttpsProxyAgent = require('https-proxy-agent');

/**
 * Middleware creates a *got* client which already knows
 * the MindSphere gateway url and the access token.
 * 
 * It will automatically use a proxy if it is defined as https_proxy
 * environment variable.
 * 
 * The got client is added to the request context as `req.http`.
 * 
 * @param {string} [gatewayBaseUrl] - Defines the gateway base URL. 
 * Defaults to eu1 gateway url -- only change it for debugging purposes.
 * @returns Express middleware function.
 */
exports.middleware = (gatewayBaseUrl = 'https://gateway.eu1.mindsphere.io') => (req, res, next) => {
    const gotConfig = {
        baseUrl: gatewayBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (process.env.https_proxy) {
        gotConfig.agent = new HttpsProxyAgent(process.env.https_proxy)
    }

    if (req && req.user && req.user.token) {
        gotConfig.headers['Authorization'] = `Bearer ${req.user.token}`;
    }

    req.http = got.extend(gotConfig);

    next();
}