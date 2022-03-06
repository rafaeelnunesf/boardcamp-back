import { Router } from "express";
import categoriesRoute from "./categoriesRoute.js";
import gamesRoute from "./gamesRoute.js";

const routes = Router();

routes.use(categoriesRoute);
routes.use(gamesRoute);

export default routes;
