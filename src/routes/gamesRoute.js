import { Router } from "express";
import { getGames, PostGames } from "../controllers/gamesController.js";
import postGamesValidationMiddleware from "../middlewares/postGamesValidationMiddleware.js";
const gamesRoute = Router();

gamesRoute.get("/games", getGames);
gamesRoute.post("/games", postGamesValidationMiddleware, PostGames);

export default gamesRoute;
