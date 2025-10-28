import { ReactElement } from 'react'
import SignupForm from './_components/SignupForm'

const SignUp = async (): Promise<ReactElement> => {
  return (
    <div className="h-[calc(100vh-3rem)">
      <SignupForm />
    </div>
  )
}

export default SignUp
