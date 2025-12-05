'use client'

import { useState, MouseEvent } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Ban, Play } from 'lucide-react'
import { Participation } from '@/payload-types'
import { participate } from '@/app/(frontend)/(authenticated)/_actions/participate'
import { useRouter } from 'next/navigation'

const StartCourseButton = ({ courseId }: { courseId: string }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleStartCourse = async (event: MouseEvent<HTMLButtonElement>) => {
    setStatus('loading')
    setError(null)
    event.preventDefault()

    try {
      const participation: Participation = await participate({ courseId })

      if (!participation) {
        throw new Error('Failed to create participation')
      }

      router.push(`/dashboard/participation/${participation.id}`)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Failed to start course. Please try again')
    }
  }

  const isLoading = status === 'loading'
  const isError = status === 'error'

  return (
    <div className="mt-6">
      <Button
        onClick={handleStartCourse}
        disabled={isLoading}
        className={`relative inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full hover:cursor-pointer transition duration-300 ease-in-out"
        ${isError ? 'bg-red-600 text-white' : 'bg-teal-500 text-white hover:bg-teal-600'} 
        disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <LoaderCircle className="animate-spin text-xl" />
          ) : isError ? (
            <Ban className="text-xl" />
          ) : (
            <Play className="text-xl " />
          )}
        </div>

        <span className="pl-6">Start Course</span>
      </Button>

      {isError && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
          <LoaderCircle className="animate-spin text-xl" />
          {error}
        </p>
      )}
    </div>
  )
}

export default StartCourseButton
