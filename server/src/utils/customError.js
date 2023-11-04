class CustomError extends Error {
    /**
     * 
     * @param {string} message 
     * @param {number} code HTTP status codes
     */
    constructor (message, code) {
        super(message)
        this.code = code;
        this.name = "CustomError"
    }
    
}
module.exports = CustomError