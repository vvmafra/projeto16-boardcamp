import { Router } from "express"
import { postRentals } from "../controllers/rentals.controllers.js"
import { validateSchemas } from "../middlewares/validateSchema.middlewares.js"
import { rentalsSchema } from "../schemas/rentals.schemas.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals")
rentalsRouter.post("/rentals", validateSchemas(rentalsSchema) ,postRentals)
rentalsRouter.post("/rentals/:id/return")
rentalsRouter.delete("/rentals/:id")

export default rentalsRouter