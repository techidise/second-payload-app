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
import { Signup, SignupResponse } from '../actions/signup'
import SubmitButton from '@/components/misc/SubmitButton'

const SignupForm = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Card className="w-full max-w-sm bg-rose-50">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your email and create a password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Enter your email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Enter your password</Label>
                </div>
                <Input id="password" type="password" required />
                <div className="flex items-center">
                  <Label htmlFor="password">Re-enter your password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" variant="outline" className="w-full">
                Sign Up
              </Button>
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
                  className="ml-auto inline-block underline-offset-4 font-medium hover:underline"
                >
                  Sign In
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
