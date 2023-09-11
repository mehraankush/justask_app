"use client"

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";

import { cn } from '../lib/utils'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import FreeCounter from "./FreeCounter";

const montserrat = Montserrat({weight:'600',subsets:['latin']}) 
const routes = [
  {
  lable:"Dashboard",
  icon:LayoutDashboard,
  href:"/dashboard",
  color:"text-sky-500"
  },
  {
  lable:"Conversation",
  icon:MessageSquare,
  href:"/conversation",
  color:"text-violet-500"
  },
  {
  lable:"Image Generation",
  icon:ImageIcon,
  href:"/image",
  color:"text-pink-700"
  },
  {
  lable:"Video Generation",
  icon:VideoIcon,
  href:"/video",
  color:"text-orange-700"
  },
  {
  lable:"Music Generation",
  icon:Music,
  href:"/music",
  color:"text-emerald-500"
  },
  {
  lable:"Code Generation",
  icon:Code,
  href:"/code",
  color:"text-green-700"
  },
  {
  lable:"Settings",
  icon:Settings,
  href:"/settings",
  }
];

interface SideBarProps{
 getCount:number;
 isPro:boolean;
}

const SideBar = async({getCount= 0,isPro = false}:SideBarProps) => {


  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full text-white bg-[#111827]"> 
       <div className="px-3 py-2 flex-1">
          <Link href='/dashboard' className="flex items-center pl-3 mb-14">
              <div className="relative w-8 h-8 mr-4">
                  <Image src='/logoai.png' alt="Logo" height={20} width={20}/>
              </div>
              <h1 className={cn("text-2xl font-bold",montserrat.className)}>JustAsk</h1>
          </Link>
          <div className="space-y-1">
             {
              routes.map((item)=>(
                <Link
                  href={item.href}
                  key={item.href}
                  className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === item.href?'text-white bg-white/10':'text-zinc-400'
                  )}
                >
                 <div className="flex items-center flex-1">
                     <item.icon className={cn("h-5 w-5 mr-5",item.color)}/>
                     {item.lable}
                 </div>
                </Link>
              ))
             }
             <button  onClick={()=>signOut()} className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                   SignOut
             </button>
          </div>
       </div>
       <FreeCounter getCount={getCount} isPro={isPro}/>
    </div>
  )
}
 
export default SideBar;