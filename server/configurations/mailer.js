import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: process.env.service,
    auth: {
        user: process.env.email_user,
        pass: process.env.pass
    }
})


export { transporter };