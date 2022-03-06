import { postCustomersSchema } from "../schemas/postCustomersSchema.js";

export default function postCustomersValidationMiddleware(req, res, next) {
  const validation = postCustomersSchema.validate(req.body, {
    abortEarly: true,
  });
  if (validation.error) return res.status(400).send(validation.error.details);
  next();
}
