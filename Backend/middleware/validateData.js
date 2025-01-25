const { check, validationResult } = require('express-validator');
const query = require('../models/user');

const loginValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .trim(),
    (req, res, next) => {
    	
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                code: "VALIDATION_ERROR",
                details: error.array().reduce((acc, err) => {
                    acc[err.path] = err.msg; // Set field name as key and message as value
                    return acc;
                }, {})
            });

		}
            next();
 
    }
];

const signupValidation = [
    check('username')
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long.')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .custom(async (value) => {
            const user = await query.getUserByEmail(value);
            if (user) {
                throw new Error('Email already exists.');
            }
            return true; // Validation passes if the email does not exist.
        })
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .matches(/\d/)
        .withMessage('Password must contain at least one number.')
        .trim(),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match.')
        .trim(),
    (req, res, next) => {


        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                code: "VALIDATION_ERROR",
                details: error.array().reduce((acc, err) => {
                    acc[err.path] = err.msg; // Set field name as key and message as value
                    return acc;
                }, {})
            });
        }
        next();
    }
];

const postValidation = [
    check('title')
        .notEmpty()
        .withMessage('Title is required.')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long.')
        .trim(),
    check('content')
        .notEmpty()
        .withMessage('Content is required.')
        .isLength({ min: 6 })
        .withMessage('Content must be at least 6 characters long.')
        .trim(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                code: "VALIDATION_ERROR",
                details: error.array().reduce((acc, err) => {
                    acc[err.path] = err.msg; // Set field name as key and message as value
                    return acc;
                }, {})

            })
        }
        next();
    }
];

const commentValidation = [
    check('content')
        .notEmpty()
        .withMessage('Comment is required.')
        .isLength({ min: 3 })
        .withMessage('Comment must be at least 3 characters long.')
        .trim(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                code: "VALIDATION_ERROR",
                details: error.array().reduce((acc, err) => {
                    acc[err.path] = err.msg; // Set field name as key and message as value
                    return acc;
                }, {})
            });
        }
        next();
    }
];

module.exports = { loginValidation, signupValidation, postValidation, commentValidation };
