import * as yup from 'yup'

export const forgotPassSchema = yup.object({
    email : yup.string()
    .email('Email id not valid')
    .required('This field can\'t be empty')
})

