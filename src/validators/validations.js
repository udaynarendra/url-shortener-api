import Joi from 'joi';
const urlValidation=Joi.object({
    url:Joi.string()
    .trim()
    .uri()
    .required()
})
const registerValidation=Joi.object({
    name:Joi.string()
    .trim()
    .min(3)
    .max(20)
    .required(),
    email:Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
    password:Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/)
    .required()
    .messages({
        "string.pattern.base":"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    })
})
const loginValidation=Joi.object({
    email:Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
    password:Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/)
    .required()
    .messages({
        "string.pattern.base":"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    })
})
export {urlValidation,registerValidation,loginValidation};