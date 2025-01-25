const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const customError = require('../utils/customError');

async function verifyJwtToken(req, res, next) {
    
    const token = req.headers['authorization'];
    if (!token) {
        return next(new customError("Unauthorized",401))
    }
    const bearer = token.split(' ');
    const bearerToken = bearer[1];

    if (!bearerToken) {
        return next(new customError("Unauthorized",401))
    }
    try {
        const payload = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.userId = payload.userId;
    } catch (error) {
        console.log(error);
        return next(new customError("Unauthorized",401))
    }

    next();
}


module.exports = { verifyJwtToken};
