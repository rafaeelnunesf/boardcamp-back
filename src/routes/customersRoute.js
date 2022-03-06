import { Router } from "express";
import {
  getCustomers,
  postCustomers,
  getCustomersById,
  putCustomersById,
} from "../controllers/customersController.js";

import postCustomersValidationMiddleware from "../middlewares/postCustomersValidationMiddleware.js";
const gamesRoute = Router();

gamesRoute.get("/customers", getCustomers);
gamesRoute.post("/customers", postCustomersValidationMiddleware, postCustomers);
gamesRoute.get("/customers/:id", getCustomersById);
gamesRoute.put(
  "/customers/:id",
  postCustomersValidationMiddleware,
  putCustomersById
);

export default gamesRoute;
