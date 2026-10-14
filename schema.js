const Joi = require('joi');

module.exports.applicationSchema = Joi.object({
        company: Joi.string().required(),
        role: Joi.string().required(),
        status: Joi.string().required(),
        appliedDate: Joi.date().required(),
        deadline: Joi.date().required(),
        location: Joi.string().allow("", null),
        link: Joi.string().allow("", null),
        resume: Joi.string().allow("", null),
        notes: Joi.string().allow("", null),
});