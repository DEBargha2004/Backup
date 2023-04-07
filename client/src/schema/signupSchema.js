import * as yup from 'yup'

export const signupFormSchema = yup.object({
    firstname : yup.string()
    .required('This field can\'t be empty'),
    lastname : yup.string()
    .required('This field can\'t be empty'),
    email : yup.string()
    .email('Email id not valid')
    .required('This field can\'t be empty'),
    password : yup.string()
    .required('This field can\'t be empty'),
    confirmPassword : yup.string()
    .oneOf([yup.ref('password'),null],'Password not matched')
    .required('This field can\'t be empty')
})