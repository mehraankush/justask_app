"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import { LandingNavbar } from '@/components/LandingNavbar'
import { LandingHero } from '@/components/LandingHero'
import { LandingContent } from '@/components/LandingContent'


const LandingPage = () =>{

  const {data:session} = useSession();

  if(session){
    redirect('/dashboard')
  }
  return (
     <div className='h-full'>
       <LandingNavbar/>
       <LandingHero/>
       <LandingContent/>
      </div>
  )
}

export  default LandingPage;