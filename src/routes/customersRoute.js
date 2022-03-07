import { Router } from "express";
import {
  getCustomers,
  postCustomers,
  getCustomersById,
  putCustomersById,
} from "../controllers/customersController.js";

import postCustomersValidationMiddleware from "../middlewares/postCustomersValidationMiddleware.js";
const customersRoute = Router();

customersRoute.get("/customers", getCustomers);
customersRoute.post(
  "/customers",
  postCustomersValidationMiddleware,
  postCustomers
);
customersRoute.get("/customers/:id", getCustomersById);
customersRoute.put(
  "/customers/:id",
  postCustomersValidationMiddleware,
  putCustomersById
);

export default customersRoute;
