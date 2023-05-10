import { Router } from "express"
import { validateSchemas } from "../middlewares/validateSchema.middlewares.js"
import { gameSchema } from "../schemas/games.schemas.js"
import { getGames, postGames } from "../controllers/games.controllers.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateSchemas(gameSchema),postGames)

export default gamesRouter