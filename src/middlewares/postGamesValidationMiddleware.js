import { postGameSchema } from "../schemas/postGamesSchema.js";

export default function postGamesValidationMiddleware(req, res, next) {
  const validation = postGameSchema.validate(req.body, { abortEarly: true });
  if (validation.error) return res.status(422).send(validation.error.details);
  next();
}
