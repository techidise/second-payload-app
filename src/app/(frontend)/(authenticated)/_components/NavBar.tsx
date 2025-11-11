'use client'

import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

// import { useIsMobile } from '@/hooks/use-mobile'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const NavBar: React.FC = () => {
  return (
    // <NavigationMenu viewport={isMobile}>
    <nav className="flex bg-black border-b border-b-slate-900 text-red-50 items-center justify-between sticky mx-auto min-w-screen p-4 px-10 top-0 z-50">
      <section>
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <Link className="bg-none" href="/dashboard">
                <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      <section>
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <LogoutButton />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </nav>
  )
}

export default NavBar
