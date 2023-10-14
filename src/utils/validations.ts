import * as yup from "yup";
import { IAccount, ICreateAccount } from "../interfaces/interfaces";


// yup.addMethod(yup.string, 'notExsists', async() => {
    
// })

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

export const accountSchema: yup.ObjectSchema<ICreateAccount> = yup.object({
  name: yup.string().min(3).required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(
      /[!@#$%^&*()\-_=+{};:,<.>]/,
      getCharacterValidationError("special caracters")
    ),
  role: yup.string(),
  phone: yup
    .string()
    .matches(/^01[0125][0-9]{8}$/, { message: "Enter a valid phone number" }),
  address: yup.string(),
  // user: yup.string().required()
});

export const validateSchema = async (
  schema: yup.ObjectSchema<any>,
  data: any
) => {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    throw error;
  }
};
