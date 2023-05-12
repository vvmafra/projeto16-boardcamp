import { Router } from "express"
import { getRentals, postRentals } from "../controllers/rentals.controllers.js"
import { validateSchemas } from "../middlewares/validateSchema.middlewares.js"
import { rentalsSchema } from "../schemas/rentals.schemas.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchemas(rentalsSchema) ,postRentals)
rentalsRouter.post("/rentals/:id/return")
rentalsRouter.delete("/rentals/:id")

export default rentalsRouter