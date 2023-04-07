import React from 'react'
import assets from '../assets/constants';

function AppIcon() {
  return (
    <div className='app-logo flex items-center justify-center flex-col'>
      <img src={assets.logo} alt="" className='mb-6 h-[100px]' />
      <p className='mb-8 text-5xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>{assets.App_Name}</p>
    </div>
  )
}

export default AppIcon;