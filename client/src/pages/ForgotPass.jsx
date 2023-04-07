import { useState, useRef } from 'react';
import FormWrapper1 from '../components/FormWrapper1';
import AppIcon from '../components/AppIcon';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { forgotPassSchema } from '../schema/forgotPassSchema';
import { handleForgotPass } from '../functions/handleForgotPass';
import { otpSchema } from '../schema/otpSchema';
import { handleOtpVerification } from '../functions/handleOtpVerification';
import { passwordChangeSchema } from '../schema/passwordChangeSchema'
import { useNavigate } from 'react-router-dom'
import { handlePasswordChange } from '../functions/handlePasswordChange';
import Timer from '../components/Timer';
import { Dialog } from '@mui/material';

function ForgotPass() {
    const [change, setChange] = useState(true)
    const [allowPass, setAllowPass] = useState(false)
    const [otpExpired, setOtpExpired] = useState(true)
    const [dialog, setDialog] = useState({
        value: '',
        state: false
    })
    const [time, setTime] = useState(300)
    const [emailID, setEmailID] = useState('')
    const navigate = useNavigate()
    const forgotPass = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: forgotPassSchema,
        onSubmit: values => {
            setEmailID(values.email)
            handleForgotPass(values, setChange, setOtpExpired, setTime,setDialog)
        }
    })
    const otpVerification = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: otpSchema,
        onSubmit: values => {
            handleOtpVerification(values, setAllowPass, emailID,setDialog)
        }
    })
    const passwordChange = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: passwordChangeSchema,
        onSubmit: values => {
            handlePasswordChange(values, navigate,setDialog)
        }
    })
    return (
        <>
            <FormWrapper1>
                <AppIcon />
                {
                    change && !otpExpired ?
                        <>
                            {
                                allowPass ?
                                    <>
                                        <TextField
                                            label='Password'
                                            id='password'
                                            className='m-2 w-[40%] min-w-[300px]'
                                            {...passwordChange.getFieldProps('password')}
                                            error={passwordChange.errors.password && passwordChange.touched.password ? true : false}
                                        />
                                        <TextField
                                            label='Confirm Password'
                                            id='confirmPassword'
                                            className='m-2 w-[40%] min-w-[300px]'
                                            {...passwordChange.getFieldProps('confirmPassword')}
                                            error={passwordChange.errors.confirmPassword && passwordChange.touched.confirmPassword ? true : false}
                                        />
                                        <Button variant='contained' className='m-2 w-[40%] min-w-[300px] bg-blue-500' onClick={passwordChange.handleSubmit}>Save password</Button>
                                    </>
                                    :
                                    <>
                                        <TextField
                                            label='OTP'
                                            className='m-2 w-[40%] min-w-[300px]'
                                            error={otpVerification.errors.otp && otpVerification.touched.otp ? true : false}
                                            {...otpVerification.getFieldProps('otp')}
                                        />
                                        <p className='text-slate-500'>{otpExpired ? 'Your OTP has expired' : <Timer setOtpExpired={setOtpExpired} setTime={setTime} time={time} />}</p>
                                        <Button variant='contained' className='m-2 w-[40%] min-w-[300px] bg-blue-500' onClick={forgotPass.handleSubmit}>Resend Otp</Button>
                                        <Button variant='contained' className='m-2 w-[40%] min-w-[300px] bg-blue-500' onClick={otpVerification.handleSubmit}>Verify</Button>
                                    </>
                            }
                        </> :
                        <>
                            <TextField
                                label='email'
                                error={forgotPass.errors.email && forgotPass.touched.email ? true : false}
                                {...forgotPass.getFieldProps('email')}
                                className='m-2 w-[40%] min-w-[300px]'
                            />
                            <Button variant='contained' className='m-2 w-[40%] min-w-[300px] bg-blue-500' onClick={forgotPass.handleSubmit}>Submit</Button>
                        </>
                }

            </FormWrapper1>
            <Dialog open={dialog.state} onClose={() => setDialog(prev => ({ ...prev, state: false }))}>
                <p className='text-lg p-10'>{dialog.value}</p>
            </Dialog>
        </>
    )
}

export default ForgotPass;