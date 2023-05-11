import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows).status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersID(req, res) {
    const { id } = req.params
    const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
    if (customer.rows.length === 0) return res.sendStatus(404)

    try {
        return res.send(customer.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body

    const customerExist = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])
    if (customerExist.rows.length !== 0) return res.sendStatus(409)

    const adjustedBirthday = dayjs(birthday).format('YYYY/MM/DD')

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);`,[name, phone, cpf, adjustedBirthday])
        return res.sendStatus(201)
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function putCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    const customerExist = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])
    if (customerExist.rows.length !== 0 && Number(id)!==Number(customerExist.rows[0].id)) return res.sendStatus(409)
    const adjustedBirthday = dayjs(birthday).format('YYYY/MM/DD')

    try {
        await db.query(`UPDATE customers SET name=$2, phone=$3, cpf=$4, birthday=$5 WHERE id=$1;`, [id, name, phone, cpf, adjustedBirthday])
        return res.sendStatus(200)
    } catch (err){
        res.status(500).send(err.message)
    }
}