import React, { FC, ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { getUser } from './actions/getUser'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
    return null
  }
  return <>{children}</>
}

export default Layout
