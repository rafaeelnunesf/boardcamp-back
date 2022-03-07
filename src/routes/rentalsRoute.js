import { Router } from "express";
import {
  getRentals,
  postRentals,
  getRentalsById,
  postRentalsById,
} from "../controllers/rentalsController.js";

import postRentalValidationMiddleware from "../middlewares/postRentalsValidationMiddleware.js";
const rentalsRoute = Router();

rentalsRoute.post("/rentals", postRentalValidationMiddleware, postRentals);
rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals/:id/return", postRentalsById);
/* rentalsRoute.put(
  "/rentals/:id",
  postRentalValidationMiddleware,
  putRentalsById
); */

export default rentalsRoute;
