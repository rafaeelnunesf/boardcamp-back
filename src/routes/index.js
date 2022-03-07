import { Router } from "express";
import categoriesRoute from "./categoriesRoute.js";
import gamesRoute from "./gamesRoute.js";
import customersRoute from "./customersRoute.js";
import rentalsRoute from "./rentalsRoute.js";

const routes = Router();

routes.use(categoriesRoute);
routes.use(gamesRoute);
routes.use(customersRoute);
routes.use(rentalsRoute);

export default routes;
