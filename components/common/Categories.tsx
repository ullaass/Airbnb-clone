"use client"
import { categories } from '@/config/categories'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Categories() {

  const router= useRouter()
  const params= useSearchParams()
  const [cat,setCat] = useState("")

  useEffect(()=>{
    if(params?.get("category")){
      setCat(params?.get("category")!)
    }
  },[params])

  const handleClick=(name:string)=>{
    const fullUrl = new URL(window.location.href)
    fullUrl.searchParams.set("category",name)
    router.replace(`/${fullUrl.search}`)
  }
  return (
    <div className='flex items-center space-x-6 px-8 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4'>
      {categories.map((item)=>(
        <div className='flex justify-center flex-col items-center cursor-pointer' onClick={()=> handleClick(item.name)}>
          <Image src={item.icon} width={25} height={25} alt={item.name} />
          <span className={`${item.name == cat ? "inline-block border-b-4 border-brand" : "" }`}>{item.name}</span>
        </div>
      ))}
    </div>
  )
}
