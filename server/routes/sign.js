import express from 'express'
import connection from '../configurations/sql.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { transporter } from '../configurations/mailer.js'
import randomNum from '../functions/rand_num.js'
import { reverse } from '../functions/reverse.js'


const signRoute = express.Router()
const saltRounds = 10

signRoute.route('/signup').post((req, res) => {
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let emailid = req.body.emailid
    let password = req.body.password
    let cookie = `${crypto.randomUUID()}-${Date.now()}`
    let expiry = Date.now() + 24 * 60 * 60 * 1000
    let userid = `${crypto.randomUUID()}${Date.now()}${crypto.randomUUID()}`

    connection.query('select * from userinfo where emailid = ?', [emailid], (err, validation_result) => {
        console.log('signup request');
        if (err) {
            res.json({
                'server_message': {
                    status: 'Something went wrong please try again later'
                }
            })
        } else {
            if (validation_result.length) {
                res.json({
                    'server_message': {
                        status: 'This Email Id already exists'
                    }
                })
            } else {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        connection.query('insert into userinfo values(?,?,?,?,?)', [firstname, lastname, emailid, hash, userid], (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        console.log('username_insertion_complete');
                        connection.query('insert into cookieinfo values(?,?,?)', [cookie, expiry, emailid], () => {
                            res.cookie('cookie', cookie, {
                                maxAge: 24 * 60 * 60 * 1000,
                                sameSite: 'lax'
                            })
                            res.json({
                                'server_message': {
                                    status: 'success'
                                }
                            })
                        })
                    }
                })
            }
        }
    })
})

signRoute.route('/signin').post((req, res) => {
    console.log('signin request');
    let emailid = req.body.emailid
    let password = req.body.password
    let cookie = `${crypto.randomUUID()}-${Date.now()}`
    let expiry = Date.now() + 24 * 60 * 60 * 1000

    connection.query('select * from userinfo where emailid = ?', [emailid], (err, validation_result) => {
        if (err) {
            res.json({
                'server_message': {
                    status: 'Something went wrong please try again later'
                }
            })
        } else {
            if (validation_result.length) {
                let encrypted_password = validation_result[0].password
                bcrypt.compare(password, encrypted_password, (err, comparison) => {
                    if (comparison) {
                        console.log('compared');
                        connection.query('insert into cookieinfo values (?,?,?)', [cookie, expiry, emailid])
                        res.cookie('cookie', cookie, {
                            maxAge: 24 * 60 * 60 * 1000,
                            sameSite: 'lax'
                        })
                        connection.query('select * from userinfo where emailid = ?', [emailid], (err, result) => {
                            const fullname = `${result[0].firstname} ${result[0].lastname}`
                            const userid = result[0].userid
                            connection.query('select * from mediainfo where userid = ?', [userid], (err, file_result) => {
                                if (err) {
                                    res.json({
                                        server_message: {
                                            status: 'Something went wrong, please try again later'
                                        }
                                    })
                                } else {
                                    if (err) {
                                        res.json({
                                            'server_message': {
                                                status: 'Something went wrong please try again later'
                                            }
                                        })
                                    } else {
                                        res.json({
                                            'server_message': {
                                                status: 'success',
                                                data: {
                                                    username : fullname,
                                                    file_data : reverse(file_result)
                                                }
                                            }

                                        })
                                    }
                                }
                            })
                        })

                    } else {
                        res.json({
                            'server_message': {
                                status: 'Incorrect Password'
                            }
                        })
                    }
                })
            } else {
                res.json({
                    'server_message': {
                        status: 'Emaid Id doesnot exists'
                    }
                })
            }
        }
    })
})

signRoute.route('/logChecker').get((req, res) => {
    console.log('request from logchecker');
    let cookie = req.cookies.cookie
    if (!cookie) {
        res.json({
            'server_message': {
                status: 'Cookie expired'
            }
        })
    } else {
        connection.query('select * from cookieinfo where cookie = ?', [cookie], (err, result) => {
            if (result.length) {
                const expiry = result[0].expiry
                const user = result[0].user
                console.log(user);
                if (expiry >= Date.now()) {
                    connection.query('select * from userinfo where emailid = ?', [user], (err, result_data) => {
                        let fullname = `${result_data[0].firstname} ${result_data[0].lastname}`
                        let userid = result_data[0].userid
                        connection.query('select * from mediainfo where userid = ?', [userid], (err, file_result) => {
                            if (err) {
                                console.log(err);
                                res.json({
                                    server_message: {
                                        status: 'Something went wrong, please try again later'
                                    }
                                })
                            } else {
                                res.json({
                                    server_message: {
                                        status: 'success',
                                        data: {
                                            username: fullname,
                                            file_data: reverse(file_result)
                                        }
                                    }
                                })
                            }
                        })
                    })
                } else {
                    res.json({
                        'server_message': {
                            status: 'Cookie expired'
                        }
                    })
                }
            }
        })
    }
})


signRoute.route('/forgotpass').post((req, res) => {
    let emailid = req.body.emailid
    connection.query('select * from userinfo where emailid = ?', [emailid], (err, existance_result) => {
        if (err) {
            res.json({
                server_message: {
                    status: 'Something went wrong please try again later'
                }
            })
        } else {
            if (!existance_result.length) {
                res.json({
                    server_message: {
                        status: 'This email ID doesn\'t exists'
                    }
                })
            } else {
                const OTP = randomNum()
                connection.query('delete from otp where username = ?', [emailid])
                connection.query('insert into otp values(?,?,?)', [emailid, OTP, Date.now() + 5 * 60 * 1000])
                const options = {
                    from: 'teamdrawer1225@gmail.com',
                    to: emailid,
                    subject: 'OTP for your Drawer App',
                    html: `<p>Your OTP for password changing request is <b>${OTP}</b></p><p>Donot share this with anyone.This is valid for next 5 minutes.</p>`
                }
                transporter.sendMail(options).then(() => {
                    res.json({
                        server_message: {
                            status: 'success'
                        }
                    })
                }).catch(e => {
                    console.log('mail not sent');
                    res.json({
                        server_message: {
                            status: 'Something went wrong please try again later'
                        }
                    })
                })
            }
        }
    })
})

signRoute.route('/otpchannel').post((req, res) => {
    let userOTP = req.body.otp;
    let emailID = req.body.emailID
    let otpCookie = crypto.randomUUID()
    connection.query('select * from otp where (username = ? and expiry > ? and otp=?)', [emailID, Date.now(), userOTP], (err, existance_result) => {
        if (err) {
            res.json({
                server_message: {
                    status: 'Something went wrong, please try again later'
                }
            })
        } else {
            if (!existance_result.length) {
                res.json({
                    server_message: {
                        status: 'Please re-enter your creadentials and then click on send OTP'
                    }
                })
            } else {
                connection.query('delete from otp where (username = ?  and otp = ?)', [emailID, userOTP])
                connection.query('insert into otpcookie values(?,?,?)', [emailID, otpCookie, 10 * 60 * 1000])
                res.cookie('OTP_Cookie', otpCookie, {
                    maxAge: 10 * 60 * 1000,
                    sameSite: 'lax'
                })
                res.json({
                    server_message: {
                        status: 'success'
                    }
                })
            }
        }
    })
})

signRoute.route('/changePassword').post((req, res) => {
    let otpCookie = req.cookies.OTP_Cookie
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    let emailID;
    if (!otpCookie) {
        console.log('cookie not found');
        res.json({
            server_message: {
                status: 'Session Expired, please re-enter your credentials'
            }
        })
    } else {
        if (password && confirmPassword && password === confirmPassword) {
            connection.query('select * from otpcookie where (cookie = ? and expiry > ?)', [otpCookie, Date.now()], (err, existance_result) => {
                if (err) {
                    res.json({
                        server_message: {
                            status: 'Something went wrong, please try again later'
                        }
                    })
                } else {
                    if (!existance_result.length) {
                        console.log('cookie doenot exists');
                        res.json({
                            server_message: {
                                status: 'Invalid Cookie'
                            }
                        })
                    } else {
                        emailID = existance_result[0].username
                        bcrypt.hash(password, saltRounds, (err, updated_hashed_password) => {
                            if (err) {
                                res.json({
                                    server_message: {
                                        status: 'Something went wrong please try again later'
                                    }
                                })
                            } else {
                                connection.query('update userinfo set password = ? where emailid = ?', [updated_hashed_password, emailID], (err) => {
                                    if (err) {
                                        res.json({
                                            server_message: {
                                                status: 'Something went wrong, please try again later'
                                            }
                                        })
                                    } else {
                                        console.log('success password changed');
                                        connection.query('delete from otpcookie where username = ?', [emailID])
                                        res.clearCookie('OTP_Cookie')
                                        res.json({
                                            server_message: {
                                                status: 'success'
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        } else {
            res.json({
                server_message: {
                    status: 'Passwords either not matched or empty'
                }
            })
        }
    }
})

signRoute.route('/logout').post((req, res) => {
    const userCookie = req.cookies.cookie
    console.log('logout requested');
    connection.query('delete from cookieinfo where cookie = ?', [userCookie], () => {
        res.clearCookie('cookie')
        res.json({
            server_message: {
                status: 'success'
            }
        })
    })

})

signRoute.route('/cookieChecker').post((req, res) => {
    console.log('accepted in cookieChecker');
    let userCookie = req.body.cookie
    let authorized_id = req.query.authorized_id
    if (authorized_id === process.env.authorized_code) {
        if (!userCookie) {
            res.json({
                server_message: {
                    status: 'Cookie Expired'
                }
            })
        } else {
            connection.query('select * from cookieinfo where cookie = ?', [userCookie], (err, cookie_result) => {
                if (!cookie_result.length) {
                    res.json({
                        server_message: {
                            status: 'Invalid cookie'
                        }
                    })
                } else {
                    const { expiry, user } = cookie_result[0]
                    if (expiry > Date.now()) {
                        res.json({
                            server_message: {
                                status: 'success',
                                user
                            }
                        })
                    } else {
                        res.json({
                            server_message: {
                                status: 'Cookie Expired'
                            }
                        })
                    }
                }
            })
        }
    } else {
        res.json({
            server_message: {
                status: 'You are not authorized'
            }
        })
    }
})


export default signRoute;