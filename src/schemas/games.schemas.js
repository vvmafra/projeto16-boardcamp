import joi from "joi"

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.link().required(),
    stockTotal: joi.number().positive().required(),
    pricePerDay: joi.number().positive().required()
})