import * as yup from 'yup';
import { IAccount } from '../interfaces/interfaces';

const accountSchema: yup.ObjectSchema<IAccount> = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
    role: yup.string().required(),
    verified: yup.boolean(),
    // user: yup.string().required()
})