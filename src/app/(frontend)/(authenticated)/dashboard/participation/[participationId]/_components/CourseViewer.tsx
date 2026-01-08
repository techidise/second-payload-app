'use client'

import { useState } from 'react'
import { Course, Participation } from '@/payload-types'
import Curriculum from './Curriculum'
import CourseModule from './CourseModule'

const CourseViewer = ({ participation }: { participation: Participation }) => {
  const [currentProgress, setCurrentProgress] = useState(participation.progress ?? 0)

  const course: Course = participation.course as Course

  const handleComplete = async (nextIndex: number) => {
    setCurrentProgress(nextIndex)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <CourseModule
        onCompleted={handleComplete}
        module={course.curriculum[currentProgress]}
        participation={participation}
      />
      <Curriculum course={course} currentProgress={currentProgress} />
    </div>
  )
}

export default CourseViewer
