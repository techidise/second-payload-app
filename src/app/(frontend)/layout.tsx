import React from 'react'
import './styles.css'
// import './globals.css'

export const metadata = {
  description: 'We build awesome website for awesome businesses',
  title: "TechiDISE - Let's build",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
