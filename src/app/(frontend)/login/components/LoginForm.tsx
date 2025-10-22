'use client'

import { useRouter } from 'next/navigation'
import React, { FormEvent, ReactElement, useState } from 'react'

import Link from 'next/link'

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
import { Button } from '@/components/ui/button'

import SubmitButton from '@/components/misc/SubmitButton'
import { login, LoginResponse } from '../actions/login'

const LoginForm = (): ReactElement => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsPending(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occured')
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Card className="w-full max-w-sm bg-rose-50">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction>
            <Button variant="link" className="cursor-pointer">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
            </div>
            {/* {error && <div className="text-red-500">{error}</div>} */}
            <SubmitButton loading={isPending} text="Login" />
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {error && <div className="text-red-500">{error}</div>}
          {/* <SubmitButton loading={isPending} text="Login" /> */}
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginForm
