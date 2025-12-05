import { Course, Participation } from '@/payload-types'
import Link from 'next/link'

const ResumeButton = ({ participation }: { participation: Participation }) => {
  const course: Course = participation.course as Course
  const courseLength = course.curriculum?.length
  const progress = participation.progress ?? 0
  const progressPercentage = Math.round((progress / courseLength) * 100)

  return (
    <Link
      href={`/dashboard/participation/${participation.id}`}
      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded overflow-hidden transition ease-in-out duration-100"
    ></Link>
  )
}

export default ResumeButton
