'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Customer } from '@/payload-types'
import { cookies } from 'next/headers'

interface SignupParams {
  email: string
  password: string
}

export interface SignupResponse {
  success: boolean
  error?: string
}

type Result = {
  exp?: number
  token?: string
  user?: Customer
}

export const Signup = async ({ email, password }: SignupParams): Promise<SignupResponse> => {
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'customers',
      data: {
        email,
        password,
      },
    })

    const result: Result = await payload.login({
      collection: 'customers',
      data: {
        email,
        password,
      },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set({
        name: 'payload-token',
        value: result.token,
        httpOnly: true,
        path: '/',
      })
      return { success: true }
    } else {
      console.log('Login failed: No token received')
      return { success: false, error: 'Login Failed' }
    }
  } catch (error) {
    console.log(error)
    return { success: false, error: 'Signup Failed' }
  }
}
