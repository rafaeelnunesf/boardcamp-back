import { postRentalSchema } from "../schemas/postRentalsSchema.js";

export default function postRentalValidationMiddleware(req, res, next) {
  const validation = postRentalSchema.validate(req.body, {
    abortEarly: true,
  });
  if (validation.error) return res.status(400).send(validation.error.details);
  next();
}
