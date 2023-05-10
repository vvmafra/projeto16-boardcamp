import joi from "joi"

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().positive().required(),
    pricePerDay: joi.number().integer().positive().required()
})