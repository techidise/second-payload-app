import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '../../../_actions/getUser'
import { Participation } from '@/payload-types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowBigLeftIcon } from 'lucide-react'

const ParticipationPage = async ({ params }: { parmas: { participationId: string } }) => {
  const payload = await getPayload({ config: configPromise })

  const { participationId } = await params

  const user = await getUser()

  let participation: Participation | null

  try {
    const res: Participation = await payload.findByID({
      collection: 'participation',
      id: participationId,
      overrideAccess: false,
      user: user,
    })

    participation = res
  } catch (err) {
    console.log(err)
    return notFound()
  }

  if (!participation) {
    return notFound()
  }

  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-white text-sm hover:cursor-pointer hover:text-red-50 hover:bg transition"
      >
        <ArrowBigLeftIcon />
        Back to Dashboard
      </Link>

      {/* {participation.course.title} */}
    </div>
  )
}

export default ParticipationPage
