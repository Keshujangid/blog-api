const route = require('express').Router();
const authController = require('../controllers/authcontroller');
const formValidator = require('../middleware/validateData');


route.post('/login', formValidator.loginValidation, authController.login);

route.post('/register', formValidator.signupValidation, authController.register)

route.post('/logout', (req, res) => {
    req.logout(
        (err) => { console.log(err) }
    );
    res.json({ message: 'logout' })
});

route.post('/verify-token', authController.verifyToken);

module.exports = route;