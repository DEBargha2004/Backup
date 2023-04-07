import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.emailhost,
    port: process.env.port,
    secure: process.env.secure,
    auth: {
        user: process.env.email_user,
        pass: process.env.pass
    }
})


export { transporter };