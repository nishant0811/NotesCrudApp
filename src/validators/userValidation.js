const Joi = require('joi');

const createUserSchema = Joi.object({
    name : Joi.string().min(4).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required()
});

const loginUserSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),
})

module.exports = {
    createUserSchema,
    loginUserSchema
}