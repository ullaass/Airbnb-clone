
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify';


export default function SocialBtns() {

    const supabase = createClientComponentClient()
    const githubLogin= async()=>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: `${location.origin}/auth/callback`,
            },
          });
        if(error){
            toast.error(error.message, {theme: "colored"})
        }
    }

    const googleLogin= async()=>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${location.origin}/auth/callback`,
            },
          });
        if(error){
            toast.error(error.message, {theme: "colored"})
        }
    }
  return (
    <div>
         <Button variant='outline' className='w-full' onClick={googleLogin}>
            <Image src='/images/google.png' height={25} width={25} alt='google_logo' className='mr-5'/>Continue with Google
        </Button>
        <Button variant='outline' className='w-full mt-5' onClick={githubLogin}>
            <Image 
                src='/images/github.png' 
                height={25}     
                width={25} 
                alt='google_logo' 
                className='mr-5'/>
            Continue with Github
        </Button>
    </div>
  )
}
