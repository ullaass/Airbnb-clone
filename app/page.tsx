import Categories from '@/components/common/Categories'
import Navbar from '@/components/base/Navbar'
import Image from 'next/image'
import Toast from '@/components/common/Toast'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import HomeCard from '@/components/common/HomeCard'

export default async function Home({searchParams}:{searchParams?:{[key:string]:string | undefined}}) {

  const supabase= createServerComponentClient({cookies});

  const query = supabase
                .from("homes")
                .select("id, title,city, image, country, price, users (metadata->name)")
                
                if(searchParams?.country){
                  query.ilike("country", `%${searchParams?.country}%`)
                }
                
                if(searchParams?.category){
                  query.contains("categories", [searchParams?.category])
                }
  
  const {data:homes, error}=  await query
  //console.log("the homes",homes)
  return (
    <div>
      <Toast />
      <Navbar />
      <Categories />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-10'>
        {homes && homes.length>0 && homes.map((item)=><HomeCard home={item} key={item.id} />)}
      </div>
      {homes && homes?.length <= 0 && (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">No Airbnb found!</h1>
        </div>
      )}
      
    </div>
  )
}
