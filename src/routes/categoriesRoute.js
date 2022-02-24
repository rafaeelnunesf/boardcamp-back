import { Router } from "express";
import {
  getCategories,
  PostCategories,
} from "../controllers/categoriesController.js";
const categoriesRoute = Router();

categoriesRoute.get("/categories", getCategories);
categoriesRoute.post("/categories", PostCategories);

export default categoriesRoute;
