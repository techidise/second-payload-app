import React, { FC, ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { getUser } from './_actions/getUser'
import NavBar from './_components/NavBar'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
    return null
  }
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
