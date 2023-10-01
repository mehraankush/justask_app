"use client"

import Link from 'next/link';
import  TypeWriterComponent from 'typewriter-effect'
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const LandingHero = () => {
    const {data:session} = useSession();

  return (
    <div className='text-white font-bold py-36 text-center space-y-5 '>
       <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold ">
            <h1>Your In Hand Friend For</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                   <TypeWriterComponent
                     options={{
                        strings:[
                            "Chatbot.",
                            "Photo Generation.",
                            "Music  Generation",
                            "Code Generation",
                            "Video Generation",
                        ],
                        autoStart:true,
                        loop:true
                     }}
                   />
            </div>
       </div>

       <div className='text-sm md:text-xl font-light text-zinc-400'>
          Create Content using AI 69x faster.
       </div>

       <div>
        <Link href={session ? '/dashboard':'/'}>
            <Button variant='premium' className='md:text-lg  p-4 md:p-6 rounded-full font-semibold'>
                  Start Generating 
            </Button>
        </Link>
       </div>

       <div className='text-zinc-400 text-xs md:text-sm font-normal'>
         No Credit Card required.
       </div>
        
    </div>
  )
}
