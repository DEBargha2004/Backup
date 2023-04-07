import React, { useContext } from 'react'
import assets from '../assets/constants';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import propContext from '../hooks/Context';
import { handleLogout } from '../functions/handleLogout'

function Navbar() {
  const { logo } = assets
  const { setLoggedin, setAppData, AppData } = useContext(propContext)
  const { username } = AppData
  return (
    <div className='w-full flex justify-around mb-4'>
      <img src={logo} alt="app-logo" className='h-12' />
      <div className='w-[95%] flex justify-end items-center'>
        <div className='mr-7 flex items-center'>
          <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="" className='h-10 mr-7' />
          <h1 className='text-lg'>{username}</h1>
        </div>
        <Button variant='contained' className='bg-blue-400 p-2 mx-5'
          onClick={() => handleLogout(setLoggedin, setAppData)}
          endIcon={<LogoutIcon />}
        >Logout</Button>
      </div>
    </div>
  )
}

export default Navbar;