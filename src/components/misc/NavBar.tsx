'use client'

import Image from 'next/image'
import Link from 'next/link'

// import { useIsMobile } from '@/hooks/use-mobile'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const NavBarMenu = () => {
  //   const isMobile = useIsMobile()

  return (
    // <NavigationMenu viewport={isMobile}>
    <nav className="flex items-center justify-between mx-auto min-w-screen p-4 px-10">
      <section>
        <Link href={'/'}>
          <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
        </Link>
      </section>

      <section>
        <NavigationMenu className="flex items-center justify-between py-4">
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <Link className="bg-none" href="/login">
                Login
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </nav>
  )
}

export default NavBarMenu
