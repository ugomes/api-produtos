
const Joi = require('joi');

// Esquema para criação de um produto (todos os campos são obrigatórios)
const createProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'O nome deve ser um texto.',
        'string.empty': 'O nome não pode estar vazio.',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres.',
        'any.required': 'O campo nome é obrigatório.'
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'O preço deve ser um número.',
        'number.positive': 'O preço deve ser um número positivo.',
        'any.required': 'O campo preço é obrigatório.'
    })
});

// Esquema para atualização parcial (PATCH) de um produto (todos os campos são opcionais)
const patchProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
        'string.base': 'O nome deve ser um texto.',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres.'
    }),
    price: Joi.number().positive().messages({
        'number.base': 'O preço deve ser um número.',
        'number.positive': 'O preço deve ser um número positivo.'
    })
});

// Middleware de validação genérico
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
    createProductSchema,
    patchProductSchema
};
