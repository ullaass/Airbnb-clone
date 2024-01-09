"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function DeleteHomeBtn({id}:{id:number}) {

    const supabase= createClientComponentClient()

    const router = useRouter();
    const deleteHome = async () => {
        // * Delete the post
        const {error} = await supabase.from("homes").delete().eq("id", id);
        if(error){
            toast.error(error?.message, {theme: "colored"})
            return
        }
       
        router.refresh();
      };
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button size="icon" variant="destructive">
        <Trash />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          added home and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-brand' onClick={deleteHome}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
