"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


const testimonilas = [
   
    {
        name:"Manas Dey",
        avatar:"MD",
        title:"Game Devloper",
        description:"I palyed it,  hard 😂 "
    },
    {
      name:"Ankush Menra",
      avatar:"AM",
      title:"Full Stack Devloper",
      description:"This is the best application ,Don't believe, use it 🙏"
   },
    {
        name:"Keshav goel",
        avatar:"KG",
        title:"Software Devloper",
        description:"This is the best application ,i've ever used. 🌟"
    },
    {
        name:"Atul Kumar",
        avatar:"AK",
        title:"App Devloper",
        description:"It helped me like a bro Ankush did.👋 "
    },
]

export const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
    <h2 className='text-center text-4xl text-white font-extrabold'>
         Testimonials
    </h2>

   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-5'>
       {
          testimonilas.map((item)=>(
            <Card key={item.description} className="bg-[#192339] border-none text-white ">
               <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                       <div>
                         <p className="text-lg ">{item.name}</p>
                         <p className="text-zinc-400 text-sm">{item.title}</p>
                       </div>
                  </CardTitle>
                  <CardContent className="pt-4 px-0">
                    {item.description}
                  </CardContent>
               </CardHeader>
            </Card>
          ))
       }
   </div>

    </div>
  )
}
