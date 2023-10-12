import * as yup from 'yup';
import { IAccount } from '../interfaces/interfaces';

export const accountSchema: yup.ObjectSchema<IAccount> = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
    role: yup.string(),
    verified: yup.boolean(),
    // user: yup.string().required()
})

export const validateSchema = async (schema: yup.ObjectSchema<any>, data: any) => {
    try {
        await schema.validate(data, {abortEarly: false});
    } catch (error) {
        if(error instanceof yup.ValidationError){
            
        console.log(error.errors);
        }
    }
}