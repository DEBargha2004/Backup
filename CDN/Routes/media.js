import express, { response } from 'express'
import connection from '../configurations/sql.js'
import fs from 'fs'
import * as dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const MediaRoute = express.Router()


MediaRoute.route('/media').get((req, res) => {
    console.log('requested');
    try {
        const userid = req.query.userid
        const location = req.query.location
        const mimetype = req.query.mimetype
        const absoluteLocation = `bucket/${userid}/${location}`
        const fileSize = fs.statSync(absoluteLocation).size
        if (req.headers.range) {
            const range = req.headers.range
            console.log(range);
            const chunkSize = 1024 * 1024
            const start = Number(range.replace(/\D/g, ''))
            const end = Math.min(start + chunkSize, fileSize)
            console.log(start, end);
            const content_length = end - start + 1
            res.writeHead(206, {
                'Content-Type': 'video/mp4',
                'Content-Length': content_length,
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes'
            })

            const stream = fs.createReadStream('')
            stream.pipe(res)
        } else {
            const content = fs.createReadStream(absoluteLocation)
            res.writeHead(200, {
                'Content-Type': mimetype,
                'Content-Length': fileSize,
                'Cache-Control' : `public, max-age=${300*24*60*60*1000}`
            })
            content.pipe(res)
        }
    } catch (error) {
        console.log(error)
    }
})

MediaRoute.route('/saveMedia').post(async (req, res) => {
    let cookie = req.cookies.cookie
    let file = req.files.user_media
    let filename = file.name
    let file_code = file.md5
    let mimetype = file.mimetype
    try {
        let response = await axios.post(`http://localhost:4000/cookieChecker?authorized_id=${process.env.authorized_code}`, {
            cookie
        })
        if (response.data.server_message.status === 'success') {
            const user = response.data.server_message.user
            connection.query('select * from userinfo where emailid = ?', [user], (err, user_result) => {
                const userid = user_result[0].userid
                if (fs.existsSync(`bucket/${userid}`)) {
                    file.mv(`bucket/${userid}/${file_code}`)
                    connection.query('insert into mediainfo values(?,?,?,?)', [file_code, userid, mimetype, filename])
                } else {
                    fs.mkdirSync(`bucket/${userid}`)
                    file.mv(`bucket/${userid}/${file_code}`)
                    connection.query('insert into mediainfo values(?,?,?,?)', [file_code, userid, mimetype, filename])
                }
                res.json({
                    server_message: {
                        status: 'success'
                    }
                })
            })
        } else {
            res.json({
                server_message: {
                    status: response.data.server_message.status
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
})


export default MediaRoute;





