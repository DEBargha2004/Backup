import  { useEffect } from 'react'

function Timer({ setOtpExpired,setTime,time }) {
  useEffect(() => {
    var timer = setInterval(() => {
      setTime(prev => {
        if (prev > 0) {
          return prev - 1
        } else {
          setOtpExpired(true)
        }
      })

    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    'Your OTP expires in ' + String(Math.floor(time / 60)) + ':' + (String(time % 60).length >= 2 ? '' : '0') + String(time % 60)
  )
}

export default Timer;