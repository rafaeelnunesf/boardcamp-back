import express, { json } from "express";
import routes from "./routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
app.use(routes);

app.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
