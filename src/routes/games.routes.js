import { Router } from "express"
import { validateSchemas } from "../middlewares/validateSchema.middlewares.js"
import { gameSchema } from "../schemas/games.schemas.js"
import { getGames } from "../controllers/games.controllers.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games")

export default gamesRouter