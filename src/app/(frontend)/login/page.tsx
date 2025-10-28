import React, { ReactElement } from 'react'
import LoginForm from './_components/LoginForm'

const Login = async (): Promise<ReactElement> => {
  return (
    // min-h-screen]
    <div className="h-[calc(100vh-3rem)">
      <LoginForm />
    </div>
  )
}

export default Login
