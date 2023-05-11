import joi from "joi"

export const rentalsSchema = joi.object({
    customerId: joi.number().integer().positive(),
    gameId: joi.number().integer().positive(),
    daysRented: joi.number().integer().positive()
})