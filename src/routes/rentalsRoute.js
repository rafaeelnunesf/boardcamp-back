import { Router } from "express";
import {
  getRentals,
  postRentals,
  getRentalsById,
  putRentalsById,
} from "../controllers/rentalsController.js";

import postRentalValidationMiddleware from "../middlewares/postRentalsValidationMiddleware.js";
const rentalsRoute = Router();

rentalsRoute.post("/rentals", postRentalValidationMiddleware, postRentals);
rentalsRoute.get("/rentals", getRentals);
/* rentalsRoute.get("/rentals/:id", getRentalsById);
rentalsRoute.put(
  "/rentals/:id",
  postRentalValidationMiddleware,
  putRentalsById
); */

export default rentalsRoute;
