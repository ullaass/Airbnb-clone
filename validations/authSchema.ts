import * as yup from "yup"

export const registerSchema = yup
  .object({
    name: yup.string().required().min(3).max(50),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
    password_confirmation: yup.string().oneOf([yup.ref("password")], "Confirm Password not match").required(),                  //oneof used to cehck password same or not
  })
  .required()

export type RegisterType = yup.InferType<typeof registerSchema>;

export const loginSchema = yup
  .object({
    
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
    
  })
  .required()

export type LoginType = yup.InferType<typeof loginSchema>;