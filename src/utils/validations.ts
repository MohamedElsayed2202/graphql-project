import * as yup from "yup";
import { IAccount, ICreateAccount } from "../interfaces/interfaces";


// yup.addMethod(yup.string, 'notExsists', async() => {
    
// })



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
