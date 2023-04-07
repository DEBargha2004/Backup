import * as yup from 'yup'
export const otpSchema = yup.object({
    otp: yup.number()
    .required('This field can\'t be empty')
})