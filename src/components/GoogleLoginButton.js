"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import '@/styles/google-login.css'
import Loading from './common/Loading'

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = (type) => {
    try {
      signIn(type)
      setLoading(true)
    } catch (error) {
      console.log('error when process login');
      setLoading(false)
    }
  }

  return (
    <>
      {
        loading
          ? <Loading/>
          : <div className='login-button_google'>
            <img src="./google-icon.png" alt="Google Icon" />
            <button onClick={() => handleGoogleLogin('google')}>Google Login</button>
          </div>
      }
    </>
  )
}

export default GoogleLoginButton