import Joi from "joi";
export var TaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    end_date: Joi.string().required() || Joi.date().required()
});
