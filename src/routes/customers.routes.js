import { Router } from "express"
import { getCustomers, getCustomersID, postCustomer, putCustomer } from "../controllers/customers.controllers.js"
import { validateSchemas } from "../middlewares/validateSchema.middlewares.js"
import { customersSchema } from "../schemas/customers.schemas.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersID)
customersRouter.post("/customers",validateSchemas(customersSchema) ,postCustomer)
customersRouter.put("/customers/:id",putCustomer)

export default customersRouter