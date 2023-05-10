import { Router } from "express"
import { getCustomers, getCustomersID, postCustomer, putCustomer } from "../controllers/customers.controllers.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersID)
customersRouter.post("/customers", postCustomer)
customersRouter.put("/customers/:id",putCustomer)

export default customersRouter