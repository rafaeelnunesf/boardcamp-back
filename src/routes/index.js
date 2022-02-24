import { Router } from "express";
import categoriesRoute from "./categoriesRoute.js";

const routes = Router();

routes.use(categoriesRoute);

export default routes;
