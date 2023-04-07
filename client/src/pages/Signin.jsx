import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { signFormSchema } from '../schema/signinSchema'
import { Link } from 'react-router-dom'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import propContext from '../hooks/Context'
import handleSigninSubmit from '../functions/handleSigninSubmit'
import DialogBox from '../components/Dialog'
import FormWrapper1 from '../components/FormWrapper1'
import AppIcon from '../components/AppIcon'

function Signin() {
  const [Visible, setVisible] = useState(false)
  const [Open, setOpen] = useState({
    status: false,
    value: ''
  })
  const { setLoggedin, setAppData } = useContext(propContext)
  const signin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signFormSchema,
    onSubmit: values => {
      handleSigninSubmit(values, setLoggedin, setAppData, setOpen)
    }
  })
  return (
    <FormWrapper1>
      <AppIcon />
      <TextField
        label='Email'
        className='m-2 w-[40%] min-w-[300px]'
        type='email'
        error={signin.errors.email && signin.touched.email ? true : false}
        {...signin.getFieldProps('email')}
      />
      <TextField
        label='Password'
        className='m-2 w-[40%] min-w-[300px]'
        type={Visible ? 'text' : 'password'}
        error={signin.errors.password && signin.touched.password ? true : false}
        {...signin.getFieldProps('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setVisible(!Visible)}>
                {Visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Link to='forgot-pass' className='text-right w-[40%] min-w-[300px] text-slate-400'>Forgot Password</Link>
      <Button variant='contained' className='m-2 w-[40%] min-w-[300px] bg-blue-500' onClick={signin.handleSubmit}
      >Signin</Button>
      <Link to='signup' className='text-slate-400 mt-5'>Donot have an account</Link>
      <DialogBox Open={Open.status} setOpen={setOpen}>
        {Open.value}
      </DialogBox>
    </FormWrapper1>
  )
}

export default Signin