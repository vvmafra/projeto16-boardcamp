import { Router } from "express"
import { deleteRental, finishRental, getRentals, postRentals } from "../controllers/rentals.controllers.js"
import { validateSchemas } from "../middlewares/validateSchema.middlewares.js"
import { rentalsSchema } from "../schemas/rentals.schemas.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchemas(rentalsSchema) ,postRentals)
rentalsRouter.post("/rentals/:id/return", finishRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter