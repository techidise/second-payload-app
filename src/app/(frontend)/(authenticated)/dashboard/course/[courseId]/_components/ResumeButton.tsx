import { Course, Participation } from '@/payload-types'
import Link from 'next/link'
import { Play } from 'lucide-react'

const ResumeButton = ({ participation }: { participation: Participation }) => {
  const course: Course = participation.course as Course
  const courseLength = course.curriculum?.length
  const progress = participation.progress ?? 0
  const progressPercentage = Math.round((progress / courseLength) * 100)

  return (
    <Link
      href={`/dashboard/participation/${participation.id}`}
      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded overflow-hidden transition ease-in-out duration-300"
    >
      <div className="flex flex-row items-center justify-between pl-2">
        <p className="text-sm font-semibold">{course.title}</p>
        <div className="flex items-center justify-center bg-teal-600 size-12">
          <Play className="size-6" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
        <div className="h-full bg-white" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </Link>
  )
}

export default ResumeButton
