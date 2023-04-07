import express from "express";
import MediaRoute from "./Routes/media.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import fileUpload from "express-fileupload";


const app = express()

app.use(cors({
    origin:
    [
        'http://localhost:3000',
        'http://localhost:4000'
    ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json({limit:'50mb'}))
app.use(fileUpload())
app.use('/',MediaRoute)


app.listen(5000,()=>{
    console.log('CDN Running at port 5000');
})
