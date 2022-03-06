import joi from "joi";
export const postCustomersSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .pattern(/[0-9]{10,11}/)
    .required(),
  cpf: joi
    .string()
    .pattern(/[0-9]{11}/)
    .required(),
  birthday: joi
    .string()
    .pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    .required(),
});
