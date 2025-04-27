import { body } from "express-validator";

const validateName = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters long.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must contain only letters and spaces."),
];

const validatePassword = [
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .isLength({ max: 20 })
    .withMessage("Password must be at most 20 characters long.")
    .matches(/^(?=.*[a-z])/) // at least one lowercase
    .withMessage("Password must include at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/) // at least one uppercase
    .withMessage("Password must include at least one uppercase letter")
    .matches(/^(?=.*[0-9])/) // at least one number
    .withMessage("Password must include at least one number")
    .matches(/^(?=.*[!@#$%^&*])/) // at least one special char
    .withMessage(
      "Password must include at least one special character (!@#$%^&*)"
    ),
];

const validateEmail = [
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required.")
    .isLength({ max: 100 })
    .withMessage("Email must be at most 100 characters long.")
    .isEmail()
    .withMessage("Invalid email format.")
    .normalizeEmail(), // Sanitize email by removing unnecessary characters and standardizing format
];

export const userValidations = [
  ...validateName,
  ...validateEmail,
  ...validatePassword,
];
