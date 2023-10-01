"use client"

import { Montserrat } from "next/font/google";
import Image from 'next/image';
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const font = Montserrat({
  weight:"600",
  subsets:["latin"]
})


export const LandingNavbar = () => {
  const isLoggedIn = true;
  const {data:session} = useSession();

  console.log(session)
  return (
    <div>
      <nav className="p-4 bg-transparent flex items-center justify-between">
          <Link href='/' className="flex items-center">
              <div className="relative h-8 w-8 mr-4">
                  <Image fill src="/logoai.png" alt="Logo"/>
              </div>
              <h1 className={cn("text-2xl font-bold text-white",font.className)} >JustAsk</h1>
          </Link>
          <div className="flex items-center gap-x-2 ">
           {/* <Link href={isLoggedIn ? '/dashboard':'/sign-up'}> */}
           {
            (session)?(<div className="rounded-full border border-white p-1"><Image className="rounded-full" src={session?.user?.image||''} width={30} height={20} alt="user"/></div>):( <Button variant="outline" onClick={()=>signIn('google')} className="rounded-full">
            Get Started
           </Button>)
           }
             
           {/* </Link> */}
          </div>
      </nav>
    </div>
  )
}

export default LandingNavbar