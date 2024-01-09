import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import Navbar from '@/components/base/Navbar'
import Image from 'next/image'
import { capitializeFirstLetter, getS3ImageUrl } from '@/lib/utils'

export default async function FindHome({params}:{params:{id:number}}) {

    const supabase = createServerComponentClient({cookies})

    const {data, error}= await supabase.from("homes").select("*, users(metadata->name)").eq("id",params?.id)


    console.log("The data is ",data)
    const home:HomeType | null=data?.[0]

  return (
    <div className='mb-10'>
        <Navbar />
        <div className='container mt-5'>
            <h1 className='text-2xl font-bold'>{home?.title}</h1>
            <p>{home?.city}, {home?.state}, {home?.country}</p>
            <Image 
                src={getS3ImageUrl(home?.image)} 
                width={100} 
                height={100} 
                alt='home_img' 
                className='w-full h-[500px] rounded-lg object-cover object-center my-3' 
                unoptimized 
            />
            <h1 className='mt-5 text-brand font-bold text-2xl'>Hosted By {capitializeFirstLetter(home?.users?.name!)}</h1>
            <h1 className="text-xl font-semibold">
                {home?.title} in {home?.city} , {home?.state} ,{home?.country}
            </h1>
            <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                    __html: home?.description,
                }}
                >
            </div>
        </div>
    </div>
  )
}
