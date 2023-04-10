const Joi = require("joi");

const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }   
         
        if (!req.value) {
        req.value = {};
        }
        req.value['body'] = result.value;
        next();
    };
};
   
const schemas = {
    authSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
    depositWithdrawalDraftSchema: Joi.object().keys({
        amount: Joi.number().required(),
    }),
    transferSchema: Joi.object().keys({
        amount: Joi.number().required(),
        email: Joi.string().email().required(),
    }),
};

module.exports = {
    validateRequest,
    schemas,
};