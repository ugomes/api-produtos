const Joi = require('joi');

// Esquema para registro de usuário
const registerSchema = Joi.object({
    username: Joi.string().email().min(6).required().messages({
        'string.base': 'O nome de usuário deve ser um texto.',
        'string.empty': 'O nome de usuário não pode estar vazio.',
        'string.min': 'O nome de usuário deve ter no mínimo {#limit} caracteres.',
        'string.email': 'O nome de usuário deve ser um endereço de e-mail válido.',
        'any.required': 'O campo nome de usuário é obrigatório.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'A senha deve ser um texto.',
        'string.empty': 'A senha não pode estar vazia.',
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres.',
        'any.required': 'O campo senha é obrigatório.'
    })
});

// Esquema para login de usuário
const loginSchema = Joi.object({
    username: Joi.string().email().min(6).required().messages({
        'string.base': 'O nome de usuário deve ser um texto.',
        'string.empty': 'O nome de usuário não pode estar vazio.',
        'string.min': 'O nome de usuário deve ter no mínimo {#limit} caracteres.',
        'string.email': 'O nome de usuário deve ser um endereço de e-mail válido.',
        'any.required': 'O campo nome de usuário é obrigatório.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'A senha deve ser um texto.',
        'string.empty': 'A senha não pode estar vazia.',
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres.',
        'any.required': 'O campo senha é obrigatório.'
    })
});

// Middleware de validação genérico (reutilizado do productValidator)
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(', ');
        const err = new Error(errorMessages);
        err.statusCode = 400; // Bad Request
        return next(err);
    }
    next();
};

module.exports = {
    validate,
    registerSchema,
    loginSchema
};