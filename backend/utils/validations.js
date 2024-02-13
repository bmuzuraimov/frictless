const Joi = require("joi");
const { ValidationError, asyncHandler } = require("@utils/error_handler");

const validateLogin = asyncHandler(async (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    timezone: Joi.string().allow(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error.details.message);
  } else {
    next();
  }
});

const validateIOS = asyncHandler(async (req, res, next) => {
  const iosSchema = Joi.object({
    userId: Joi.string().required(),
    ios_email: Joi.string().email().required(),
    ios_password: Joi.string().required(),
  });
  const { error } = iosSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error.details.message);
  } else {
    next();
  }
});


const validateSignup = asyncHandler(async (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    timezone: Joi.string().allow(),
  }).validate(req.body);
  if (error) {
    throw new ValidationError(error.details.message);
  }
  next(); // No error, proceed to the next middleware
});

const validateNotionCallback = asyncHandler(async (req, res, next) => {
  const { error } = Joi.object({
    userId: Joi.string().required(),
    code: Joi.string().required(),
    redirect_uri: Joi.string().required(),
  }).validate(req.body);
  if (error) {
    throw new ValidationError(error.details.message);
  }
  next(); // No error, proceed to the next middleware
});

module.exports = {
  validateLogin,
  validateSignup,
  validateNotionCallback,
  validateIOS,
};
