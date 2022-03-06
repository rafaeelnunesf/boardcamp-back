import { Router } from "express";
import {
  getCategories,
  PostCategories,
} from "../controllers/categoriesController.js";
import postCategorieValidationMiddleware from "../middlewares/postcategoriesValidationMiddleware.js";
const categoriesRoute = Router();

categoriesRoute.get("/categories", getCategories);
categoriesRoute.post(
  "/categories",
  postCategorieValidationMiddleware,
  PostCategories
);

export default categoriesRoute;
