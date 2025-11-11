// AllAboutPayload Tutorial: [Video #9 | "Data Structures" - <11:04> ]

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ReactElement } from 'react'

import NavBarNotLoggedIn from '@/components/misc/NavBarNotLoggedIn'
import FooterNotLoggedIn from '@/components/misc/FooterNotLoggedIn'

const Home = (): ReactElement => {
  return (
    <main className="flex flex-col min-h-screen min-w-screen">
      <NavBarNotLoggedIn />
      <header className="py-16 border-b border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Learn Payload CMS</h1>
          <p className="text-lg mb-6 text-gray-400">
            Build modern applications with our Payload CMS course.
          </p>
          <Button asChild>
            <Link
              href={'/signup'}
              className="px-6 py-2 border border-white hover:bg-white hover:text-black transition"
            >
              Get Started
            </Link>
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-950 border border-gray-700 rounded hover:bg-gray-800 transition">
              <h3 className="text-xl font-bold mb-2">Practical Learning</h3>
              <p className="text-gray-400">
                Work on real-world projects and build hands-on experience.
              </p>
            </div>
            <div className="p-6 bg-gray-950 border border-gray-700 rounded hover:bg-gray-800 transition">
              <h3 className="text-xl font-bold mb-2">Modern Techniques</h3>
              <p className="text-gray-400">
                Stay ahead with up-to-date content and best practices.
              </p>
            </div>
            <div className="p-6 bg-gray-950 border border-gray-700 rounded hover:bg-gray-800 transition">
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-400">
                Join a network of developers sharing tips and resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
          <p className="text-gray-400 mb-6">
            Take the first step towards mastering Payload CMS today.
          </p>
          <Button asChild>
            <Link
              href={'/signup'}
              className="px-6 py-2 border border-white hover:bg-white hover:text-black transition"
            >
              Enroll Now
            </Link>
          </Button>
        </div>
      </section>
      <FooterNotLoggedIn />
    </main>
  )
}

export default Home
