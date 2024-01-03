const Joi = require('joi');

const createNotesSchema = Joi.object({
   userId : Joi.string(), 
   title : Joi.string().min(4).required(),
   content : Joi.string().min(5).required(),
});

const addViewerSchema = Joi.object({
    userId : Joi.string(),
    email : Joi.string().email().required()
});

module.exports = {
    createNotesSchema,
    addViewerSchema
}