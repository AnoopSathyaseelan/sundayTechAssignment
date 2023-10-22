const APIRequestLog = require('./models/logger.schema'); // Import your API request log schema model


const logAPIMiddleware = async (req, res, next) => {
    try {
        const { method, url, body, params, query } = req;
        const requestData = { method, url, body, params, query };
        res.on('finish', async () => {
            const { statusCode, statusMessage, _headers, _header, _headerNames } = res;
            const responseData = { statusCode, statusMessage, headers: _headers, header: _header, headerNames: _headerNames };
            const logEntry = new APIRequestLog({
                method,
                url,
                requestData,
                responseData,
                metadata: {}
            });
            await logEntry.save();
        });
        next();
    } catch (error) {
        console.error('API Request Logging Error:', error);
        next();
    }
};

module.exports = logAPIMiddleware;