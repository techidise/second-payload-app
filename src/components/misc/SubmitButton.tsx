import { ReactElement } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type LoadingProp = {
  loading: boolean
  text: string
}

const SubmitButton = ({ loading, text }: LoadingProp): ReactElement => {
  return (
    <Button
      type="submit"
      size="lg"
      variant="outline"
      disabled={loading}
      className="w-full hover:cursor-pointer mt-5"
    >
      <Spinner className={`${loading ? 'block' : 'hidden'}`} /> {text}
    </Button>
  )
}

export default SubmitButton
