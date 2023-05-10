import { db } from "../database/database.connection.js"


export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        console.table(games.rows)
        res.send(games.rows).status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function postGames(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body

    const gamesExist = await db.query(`SELECT * FROM games where name=$1`, [name])
    if (!gamesExist) return res.sendStatus(409)
}