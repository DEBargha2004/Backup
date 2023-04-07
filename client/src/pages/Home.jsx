import React, { useContext } from 'react'
import propContext from '../hooks/Context';
import Navbar from '../components/Navbar'
import HomeBody from '../components/HomeBody'

function Home() {
  return (
    <div className='p-2'>
      <Navbar />
      <HomeBody />
    </div>
  )
}

export default Home;