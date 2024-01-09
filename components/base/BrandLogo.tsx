import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BrandLogo() {
  return (
    <Link href="/">
      <Image
            src="/images/logo.png"
            width={120}
            height={120}
            alt='logo' 
            className='hidden lg:block'
        />
        <Image
            src="/images/logo-sm.png"
            width={90}
            height={90}
            alt='logo' 
            className='lg:hidden'
        />
    </Link>
  )
}
