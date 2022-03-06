import { Router } from "express";
import categoriesRoute from "./categoriesRoute.js";
import gamesRoute from "./gamesRoute.js";
import customersRoute from "./customersRoute.js";

const routes = Router();

routes.use(categoriesRoute);
routes.use(gamesRoute);
routes.use(customersRoute);

export default routes;
