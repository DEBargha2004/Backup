import express from "express";
import signRoute from "./routes/sign.js";
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5000'
    ],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use('/', signRoute)



app.listen(4000, () => {
    console.log('Listening at port 4000');
})