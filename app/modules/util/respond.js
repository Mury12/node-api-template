/**
 * Standarizes function replies
 * 
 * @param {any} message 
 * @param {boolean} error 
 * 
 */
export function respond(message, error = false) {
    const response = {
        success: !error,
        status: 'ok',
    }
    if (typeof message === "object") response.data = message
    else response.status = message;
    return response;
}