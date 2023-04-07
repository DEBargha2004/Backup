import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import logChecker from './functions/logChecker'
import Home from './pages/Home'
import PropContext from './hooks/Context';
import ForgotPass from './pages/ForgotPass';

function App() {

  const [Loggedin, setLoggedin] = useState(false)
  const [AppData, setAppData] = useState({
    username: null,
    file_data:[]
  })
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    logChecker(setLoggedin, setAppData)
    if(shouldRefresh){
      setShouldRefresh(false)
    }
  }, [Loggedin,shouldRefresh])

  return (
    <>
      <PropContext.Provider value={{ Loggedin, setLoggedin, AppData, setAppData, setShouldRefresh }}>
        <Routes>
          {Loggedin ?
            <Route path='/' element={<Home />} /> :
            <>
              <Route path='/' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-pass' element={<ForgotPass />} />
            </>
          }
        </Routes>
      </PropContext.Provider>
    </>
  )
}

export default App;
