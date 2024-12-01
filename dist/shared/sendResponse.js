"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    // Check if the response has already been sent
    if (res.headersSent) {
        console.warn('Response already sent, skipping further response logic.');
        return;
    }
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || undefined, // meta should be undefined if not provided
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
