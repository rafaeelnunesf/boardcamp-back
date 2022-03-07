import { Router } from "express";
import {
  getRentals,
  postRentals,
  deleteRentalsById,
  postRentalsById,
} from "../controllers/rentalsController.js";

import postRentalValidationMiddleware from "../middlewares/postRentalsValidationMiddleware.js";
const rentalsRoute = Router();

rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals", postRentalValidationMiddleware, postRentals);
rentalsRoute.post("/rentals/:id/return", postRentalsById);
rentalsRoute.delete("/rentals/:id", deleteRentalsById);

export default rentalsRoute;
