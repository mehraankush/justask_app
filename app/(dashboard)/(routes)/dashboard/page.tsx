"use client"
import { signOut, useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import {  ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react"

import { useRouter } from "next/navigation"

import { cn } from '../../../../lib/utils'
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect } from "react"

const tools = [
  {
    lable:"Conversations",
    icon:MessageSquare,
    color:"text-violet-500",
    bgColor:"bg-violet-500/10",
    href:"/conversation"
  },
  {
      lable:"Image Generation",
      icon:ImageIcon,
      href:"/image",
      color:"text-pink-700",
      bgColor:"bg-pink-700/10",
    },
    {
        lable:"Video Generation",
        icon:VideoIcon,
        href:"/video",
        color:"text-orange-700",
        bgColor:"bg-orenge-700/10",
    },
    {
      lable:"Music Generation",
      icon:Music,
      href:"/music",
      color:"text-emerald-500",
      bgColor:"bg-emerald-500/10",
    },
    {
      lable:"Code Generation",
      icon:Code,
      href:"/code",
      color:"text-green-700",
      bgColor:"bg-green-700/10",
    }
]

const Page = () => {
  const router = useRouter();
  const {data:session} = useSession();
  // console.log(session?.user?.email)

  const StoreCookies = async() =>{
    try{

      await axios.post('/api/cookies',{
        userid:session?.user?.email
      })
   
    }catch(err:any){
      console.log("Error In Sending The Cookies",err);
    }
  }

  useEffect(() => {
    StoreCookies();
  }, [])
  

  return (
    <div>
      <div className='mb-8 space-y-4'>  
        <h2 className='text-2xl md:text-4xl font-bold text-center'> 
          Explore The Power of Al Slaves
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
            Chat With The Smartest AI - Experience the power of AI
          </p>
          {/* <div className="flex justify-end absolute mt-2 mr-1">
            <Image src={`${session?.user?.image}`} height={20} width={20} alt="user" className="mr-1"/>
            <Button onClick={()=>signOut()}> Sign Out</Button>
          </div> */}
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'> 
           {
            tools.map((tool)=>(
                <Card
                onClick={()=>router.push(tool.href)}
                  key={tool.href}
                  className="p-4 border-black/5 items-center
                   justify-between hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center gap-x-4 ">
                     <div className={cn('p-2 w-fit rounded-md ',tool.bgColor)}>
                        <tool.icon
                           className={cn("w-8 h-8",tool.color)}
                        />
                     </div>
                      <div className="font-semibold">
                        {tool.lable}
                      </div>
                     <ArrowRight className=" w-5 h-5"/>
                  </div>
                </Card>
            ))}
      </div>
    </div>
  )
}

export default Page