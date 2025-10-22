import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Premium Hardcore Interracial BDSM Fetish Porn',
  title: 'LIVE THICK | BBC + BDSM',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  )
}
