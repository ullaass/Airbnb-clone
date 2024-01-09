import React from 'react'
import BrandLogo from './BrandLogo'
import { MenuIcon, Search } from 'lucide-react'
import NavMenu from './NavMenu'
import MobileNav from './MobileNav'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link'
import SearchSheet from '../common/SearchSheet'

export default async function Navbar() {

  const supabase = createServerComponentClient({cookies})
  const {data,error} = await supabase.auth.getSession();

  //console.log("the session is",data)
  return (
    <div className='flex items-center justify-between px-4 border-b-[1px]'>
        <div className='hidden md:block'>
          <BrandLogo />
        </div>
        <div className='md:w-auto'>
          <SearchSheet session={data?.session?.user} />
        </div>
        
       
        <div className='hidden sm:flex items-center space-x-4'>
            <Link href='/addhome'><span>Add you home</span></Link>
            <NavMenu session={data?.session?.user} />
            
        </div>
    </div>
  )
}

