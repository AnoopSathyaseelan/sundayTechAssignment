const mongoose = require('mongoose');


const apiRequestLogSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    requestData: {
        type: Object,
        default: {},
    },
    responseData: {
        type: Object,
        default: {},
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    metadata: {
        type: Object,
        default: {},
    },
});


const APIRequestLog = mongoose.model('APIRequestLog', apiRequestLogSchema);

module.exports = APIRequestLog;