import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '../../../_actions/getUser'
import { Participation } from '@/payload-types'
import { notFound } from 'next/navigation'

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

  return <div>{participation.course.title}</div>
}

export default ParticipationPage
