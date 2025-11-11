'use server'

import { cookies } from 'next/headers'

interface LogoutResponse {
  success: boolean
  error?: string
}

const logout = async (): Promise<LogoutResponse> => {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token') // Deletes the HTTP-only cookie

    return { success: true } // Indicates success
  } catch (error) {
    console.error('Logout Error:', error)

    return { success: false, error: 'An error occured during logout.' }
  }
}

export default logout
