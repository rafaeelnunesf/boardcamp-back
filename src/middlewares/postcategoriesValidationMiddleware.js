import { postCategorieSchema } from "../schemas/postCategoriesSchema.js";

export default function postCategorieValidationMiddleware(req, res, next) {
  const validation = postCategorieSchema.validate(req.body, {
    abortEarly: true,
  });
  if (validation.error) return res.status(422).send(validation.error.details);
  next();
}
