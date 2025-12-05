import Link from 'next/link'
import { ArrowBigLeftDashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-2xl font-bold">Uh-oh! Page not found...🕵️‍♂️</h1>
      <p className="text-gray-400 font-semibold mb-6">
        Looks like you took a wrong turn. But no worries - you can head back to safer ground!
      </p>

      <Button asChild>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 hover:cursor-pointer transition"
        >
          <ArrowBigLeftDashIcon />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  )
}

export default NotFound
