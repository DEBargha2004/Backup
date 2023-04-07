import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import { signupFormSchema } from '../schema/signupSchema'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import handleSignupSubmit from '../functions/handleSignupSubmit'
import propContext from '../hooks/Context'
import DialogBox from '../components/Dialog'
import FormWrapper1 from '../components/FormWrapper1'
import AppIcon from '../components/AppIcon'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [Visible1, setVisible1] = useState(false)
  const [Visible2, setVisible2] = useState(false)
  const [Open, setOpen] = useState({
    status: false,
    value: ''
  })
  const { setLoggedin } = useContext(propContext)
  const navigate = useNavigate()
  const signup = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupFormSchema,
    onSubmit: values => {
      handleSignupSubmit(values, setLoggedin, setOpen,navigate)
    }
  })
  return (
    <FormWrapper1>
      <AppIcon />
      <TextField
        label='First Name'
        id='firstname'
        error={signup.errors.firstname && signup.touched.firstname ? true : false}
        className='m-2 w-[40%] min-w-[300px]'
        {...signup.getFieldProps('firstname')}
      />
      <TextField
        label='Last Name'
        id='lastname'
        error={signup.errors.lastname && signup.touched.lastname ? true : false}
        className='m-2 w-[40%] min-w-[300px]'
        {...signup.getFieldProps('lastname')}
      />
      <TextField
        label='Email'
        id='email'
        error={signup.errors.email && signup.touched.email ? true : false}
        className='m-2 w-[40%] min-w-[300px]'
        {...signup.getFieldProps('email')}
      />
      <TextField
        label='Password'
        id='password'
        error={signup.errors.password && signup.touched.password ? true : false}
        className='m-2 w-[40%] min-w-[300px]'
        type={Visible1 ? 'text' : 'password'}
        {...signup.getFieldProps('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => setVisible1(!Visible1)}>
                {Visible1 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        label='Confirm Password'
        id='confirmPassword'
        type={Visible2 ? 'text' : 'password'}
        error={signup.errors.confirmPassword && signup.touched.confirmPassword ? true : false}
        className='m-2 w-[40%] min-w-[300px]'
        {...signup.getFieldProps('confirmPassword')}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => setVisible2(!Visible2)}>
                {Visible2 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button variant='contained' className='m-2 w-[40%] min-w-[300px] bg-blue-500' onClick={signup.handleSubmit}>Signup</Button>
      <Link to='/' className='mt-5  text-slate-400'>Already have an account</Link>

      <DialogBox Open={Open.status} setOpen={setOpen}>
        {Open.value}
      </DialogBox>
    </FormWrapper1>
  )
}

export default Signup