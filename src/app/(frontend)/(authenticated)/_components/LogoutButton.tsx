'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import logout from '../_actions/logout'
import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogout = async () => {
    setIsPending(true)
    setError(null)

    const result = await logout()

    setIsPending(false)

    if (result.success) {
      // Redirect to home page after successful logout
      router.push('/')
    } else {
      // Display error message
      setError(result.error || 'Logout Failed')
    }
  }

  return (
    <>
      {error && <p className="test-red-500">{error}</p>}
      <Button
        onClick={handleLogout}
        disabled={isPending}
        className="text-white rounded-full hover:cursor-pointer"
      >
        {isPending ? 'Logging Out....' : <LogOutIcon className="size-5 hover:cursor-pointer" />}
      </Button>
    </>
  )
}

export default LogoutButton
