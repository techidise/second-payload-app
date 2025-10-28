import React from 'react'
import './styles.css'
import NavBarMenu from '@/components/misc/NavBar'
import Footer from '@/components/misc/Footer'

export const metadata = {
  description: 'Premium Hardcore Interracial BDSM Fetish Porn',
  title: 'LIVE THICK | BBC + BDSM',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="">
        <main>
          <NavBarMenu />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
