import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function postRentals(req, res){
    const { customerId, gameId, daysRented } = req.body
    const { id } = req.params

    const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
    const game = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])

    const rentedGames = await db.query(`SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`, [gameId])

    const avaiableGames = rentedGames.rows[0].count - game.rows[0].stockTotal

    if (customer.rows[0].length === 0 || game.rows[0].length === 0 || avaiableGames >= 0) return res.sendStatus(400)
    const rentDate = dayjs().format('YYYY/MM/DD')
    const originalPrice = game.rows[0].pricePerDay * daysRented
    

    try {
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
        return res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }

}


export async function getRentals(req, res){
        const games = await db.query(`SELECT * FROM games;`)
        const customers = await db.query(`SELECT * FROM customers;`)

    try {
        const resRentals = await db.query(`SELECT rentals.* FROM rentals;`)

        const rentals = resRentals.rows.map(rental => {
            const customer = customers.rows.find(customer => customer.id === rental.customerId);
            const game = games.rows.find(game => game.id === rental.gameId);
          
            return {
              ...rental,
              customer: {
                id: customer.id,
                name: customer.name
              },
              game: {
                id: game.id,
                name: game.name
              }
            };
          });
        return res.send(rentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function finishRental(req, res){
    const {id} = req.params

    const rentalId = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id])

    if (rentalId.rows.length === 0) return res.sendStatus(404)
    if (rentalId.rows[0].returnDate !== null) return res.sendStatus(400)

    
    const rentDate = rentalId.rows[0].rentDate
    const returnDate = dayjs().format('YYYY/MM/DD')
    const diffDays =( new Date(returnDate) - new Date(rentDate)) / (1000 * 60 * 60 * 24)

    const daysRented = rentalId.rows[0].daysRented

    let multiplicatorFee = 0
    if (daysRented < diffDays) multiplicatorFee = diffDays - daysRented

    const delayFee = multiplicatorFee * (rentalId.rows[0].originalPrice / daysRented)
    
    try {
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`, [returnDate, delayFee, id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res){
    const {id} = req.params

    const rentalId = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id])

    if (rentalId.rows.length === 0) return res.sendStatus(404)
    if (rentalId.rows[0].returnDate === null) return res.sendStatus(400)

    try {
        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}