'use client'

// ReactJS and NextJS imports
import { useState, FormEvent, ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Shadcn UI imports
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Custom Imports
import { Signup, SignupResponse } from '../_actions/signup'
import SubmitButton from '@/components/misc/SubmitButton'

const SignupForm = (): ReactElement => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsPending(true)
    setError(null) // Reset error state

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsPending(false)
      return
    }

    const result: SignupResponse = await Signup({ email, password })
    setIsPending(false)

    console.log(result)

    if (result.success) {
      // Redirect manually after successful login
      router.push('/dashboard')
    } else {
      // Display the error message
      setError(result.error || 'Login Failed')
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Card className="w-full max-w-sm bg-rose-50">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your email and create a password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="enter@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" name="confirmPassword" type="password" required />
              </div>

              {error && <div className="text-red-500">{error}</div>}

              <SubmitButton loading={isPending} text="Sign Up" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="grid gap-6">
          <CardAction>
            <div className="flex items-center">
              <p className="font-semibold text-gray-800">Already have an account?</p>
              <Button asChild variant="link" className="hover:cursor-pointer">
                <Link
                  href="/login"
                  className="inline-block underline-offset-4 font-semibold hover:underline"
                >
                  Login
                </Link>
              </Button>
            </div>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignupForm
