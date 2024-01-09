"use client"
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import MobileNav from '../base/MobileNav'
import SearchSheetNav from '../base/SearchSheetNav'
import DatePicker from './DatePicker'
import { Button } from '../ui/button'
import {addDays, format, differenceInDays, parse} from "date-fns"
import { useRouter, useSearchParams } from 'next/navigation'
  

export default function SearchSheet({session}:{session:any}) {

    const [open, setOpen]= useState(false);
    const router = useRouter()
    const params= useSearchParams();
    const [dateState, setDateState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key:"selection",

        }
    ]);

    const [search, setSearch]= useState<string>("")

    const [searchedParams, setSearchedParams]= useState({
        country:"",
        days:"",
    })

    const handleDataChange = (data:any) =>{
        setDateState([data?.selection])
    }

    // useEffect(()=>{
    //     const difference = differenceInDays(
    //         parse(params?.get("endDate")!, "dd-MM-y", new Date()),
    //         parse(params?.get("startDate")!, "dd-MM-y", new Date())
    //       );
    //     if(difference){
    //          setSearchedParams({
    //              ...searchedParams,
    //              country: params.get("country") ? params.get("country")! : "",
    //              days:`${difference}days`
    //          });
    //      } 
    // },[params])

    const handleSubmit = ()=>{
        // console.log("the search value is ", search)
        // console.log("the dates are", dateState[0].startDate)
        //alert("asd")
        const startDate = format(dateState[0].startDate, "dd-MM-y")
        const endDate = format(dateState[0].endDate, "dd-MM-y")
        router.replace(`/?country=${search}&startDate=${startDate}&endDate=${endDate}`)
        setOpen(()=>false);
    }
  return (
    <div>
        <Sheet open={open}>
            <SheetTrigger asChild>
            <div className='w-full md:w-auto cursor-pointer' onClick={()=>setOpen(true)}>
                <div className='hidden md:flex items-center space-x-2 border rounded-3xl p-2'>
                    <span className='text-sm pl-2'>{searchedParams.country != ""? searchedParams.country : "Anywhere"} </span>
                    <span>|</span>
                    <span className='text-sm'>{searchedParams.days != "" ? searchedParams.days : "Any week"} </span>
                    <span>|</span>
                    <span className='text-sm text-gray-400'>Add guest</span>
                    <span className='bg-brand text-white p-2 rounded-full'>
                        <Search 
                            height={16}
                            width={16}/>
                    </span>
                </div>
                <div className=''>
                    <MobileNav />
                </div>
           
            </div>
            </SheetTrigger>
            <SheetContent side="top">
                <SheetHeader>
                <SheetTitle>
                    <SearchSheetNav session={session} searchInputCallback={setSearch}/>
                </SheetTitle>
                <SheetDescription>
                    <div className='text-center'>
                        <DatePicker state={dateState} dateChangeCallback={handleDataChange}/>
                        <div className='flex justify-center space-x-4 items-center my-2'>
                            <Button className='bg-brand' onClick={handleSubmit}>Search</Button>
                            <Button variant="outline" onClick={()=>setOpen(false)}>Close</Button>
                        </div>

                    </div>
                    
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    </div>
  )
}
