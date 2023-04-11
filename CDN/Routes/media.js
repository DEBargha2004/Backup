import express from 'express'
import connection from '../configurations/sql.js'
import fs from 'fs'
import path from 'path'
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
        const absoluteLocation = path.join('bucket', userid, location)
        const fileSize = fs.statSync(absoluteLocation).size
        if (req.headers.range) {
            const range = req.headers.range
            console.log(range);
            const chunkSize = 1024 * 1024
            const start = Number(range.replace(/\D/g, ''))
            const end = Math.min(start + chunkSize, fileSize - 1)
            console.log(start, end);
            const content_length = end - start + 1
            res.writeHead(206, {
                'Content-Type': mimetype,
                'Content-Length': content_length,
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes'
            })

            const stream = fs.createReadStream(absoluteLocation, { start, end })
            stream.pipe(res)
        }
        else {
            console.log(req.headers.range);
            const content = fs.createReadStream(absoluteLocation)
            res.writeHead(200, {
                'Content-Type': mimetype,
                'Content-Length': fileSize,
                'Cache-Control': `public,max-age=${30 * 24 * 60 * 60 * 1000}`
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

MediaRoute.route('/downloadMedia').get(async (req, res) => {
    const cookie = req.cookies.cookie
    console.log(cookie);
    const userid = req.query.userid
    const location = req.query.location
    console.log(userid, location);
    let response = await axios.post(`http://localhost:4000/cookieChecker?authorized_id=${process.env.authorized_code}`, {
        cookie

    })
    if (response.data.server_message.status === 'success') {
        connection.query('select * from mediainfo where userid = ? and media_code = ?', [userid, location], (err, file_result) => {
            if (err) {
                res.json({
                    server_message: {
                        status: 'Something went wrong please try again later'
                    }
                })
            } else {
                if (!file_result.length) {
                    res.json({
                        server_message: {
                            status: 'No files matched'
                        }
                    })
                } else {
                    const { mimetype } = file_result[0]
                    const file_path = path.join('bucket', userid, location)
                    const readstream = fs.createReadStream(file_path)
                    res.setHeader('Content-Type', mimetype)
                    readstream.pipe(res)
                }
            }
        })
    } else {
        res.json(response.data)
    }
})

MediaRoute.route('/deleteMedia').get(async (req, res) => {
    const userid = req.query.userid
    const media_code = req.query.location
    const cookie = req.cookies.cookie
    let response = await axios.post(`http://localhost:4000/cookieChecker?authorized_id=${process.env.authorized_code}`, {
        cookie
    })
    response = response.data.server_message.status
    if (response = 'success') {
        connection.query('delete from mediainfo where media_code = ? and userid = ?', [media_code, userid], (err, deletion_result) => {
            if (err) {
                res.json({
                    server_message: {
                        status: 'Something went wrong please try again later'
                    }
                })
            } else {
                fs.unlinkSync(`bucket/${userid}/${media_code}`)
                res.json({
                    server_message: {
                        status: 'success'
                    }
                })
            }
        })
    } else {
        res.json({
            server_message: {
                status: response
            }
        })
    }
})

export default MediaRoute;





