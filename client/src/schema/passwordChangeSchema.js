import * as yup from 'yup'

export const passwordChangeSchema = yup.object({
    password : yup.string()
    .required('This field can\'t be empty'),
    confirmPassword : yup.string()
    .required('This field can\'t be empty')
    .oneOf([yup.ref('password'),null],'Password not matched')
})