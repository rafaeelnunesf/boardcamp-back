import { Router } from "express";
import categoriesRoute from "./categoriesRoutes/index.js";

const routes = Router();

routes.use(categoriesRoute);

export default routes;
