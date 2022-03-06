import joi from "joi";

export const postCategorieSchema = joi.object({
  name: joi.string().required(),
});
