const errorHandler = (err, req, res, next) => {
    console.error(err); // Log for debugging

    // Default response
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const code = err.code || "INTERNAL_ERROR";

    res.status(statusCode).json({
        success: false,
        message,
        code,
        details: err.details || null
    });
};

module.exports = errorHandler;
