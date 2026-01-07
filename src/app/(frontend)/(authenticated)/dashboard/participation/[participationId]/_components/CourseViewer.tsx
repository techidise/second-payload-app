'use client'

import { useState } from 'react'
import { Course, Participation } from '@/payload-types'

const CourseViewer = ({ participation }: { participation: Participation }) => {
  const [currentProgress, setCurrentProgress] = useState(participation.progress ?? 0)

  const course: Course = participation.course as Course

  const handleComplete = async (nextIndex: number) => {
    setCurrentProgress(nextIndex)
  }

  return <div className="w-full flex flex-col gap-6"></div>
}

export default CourseViewer
