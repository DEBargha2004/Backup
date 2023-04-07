import * as yup from 'yup'

export const signFormSchema = yup.object({
    email : yup.string()
    .email('Email id not valid')
    .required('This field can\'t be empty'),
    password : yup.string()
    .required('This field can\'t be empty')
})