"use client"

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useProModel } from "@/hooks/use-pro-model"
import { 
Dialog ,
DialogContent, 
DialogDescription, 
DialogFooter, 
DialogHeader,
DialogTitle
} from "./ui/dialog"
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


const tools = [
    {
      lable:"Conversations",
      icon:MessageSquare,
      color:"text-violet-500",
      bgColor:"bg-violet-500/10",
    },
    {
        lable:"Image Generation",
        icon:ImageIcon,
        color:"text-pink-700",
        bgColor:"bg-pink-700/10",
      },
      {
          lable:"Video Generation",
          icon:VideoIcon,
          color:"text-orange-700",
          bgColor:"bg-orenge-700/10",
      },
      {
        lable:"Music Generation",
        icon:Music,
        color:"text-emerald-500",
        bgColor:"bg-emerald-500/10",
      },
      {
        lable:"Code Generation",
        icon:Code,
        color:"text-green-700",
        bgColor:"bg-green-700/10",
      }
  ]

const ProModal = () => {

    const [loading, setloading] = useState(false);
    const proModal = useProModel();

    const onSubscribe = async()=>{
     try{
      setloading(true)
      const respone =await  axios.get('/api/stripe');
      console.log(respone);
   
      window.location.href = respone.data.url

     }catch(err:any){
      
        toast.error("Something Went Wrong");
      console.log('Error in Redirection',err);
     }finally{
      setloading(false)
     }
    }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>

        <DialogContent>
            <DialogHeader>
                 <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center">
                        Upgrade To Genious 
                        <Badge className="uppercase text-sm py-1" variant='premium'>
                            Pro
                        </Badge>
                    </div>
                 </DialogTitle>
                 <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                       {tools.map((tool)=>(
                        <Card
                         key={tool.lable}
                         className="p-3 border-black/5 flex items-center justify-between"
                        >
                             <div className="felx items-center gap-x-4 ">
                               <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                   <tool.icon className={cn("w-6 h-6 ",tool.color)}/>
                               </div>
                               <div className="font-semibold text-sm">
                                 {tool.lable}
                               </div>
                             </div>
                             <Check className="text-primary w-5 h-5"/>
                        </Card>
                       ))}
                 </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                 <Button
                   disabled={loading}
                  size="lg"
                  variant="premium"
                  className="w-full"
                  onClick={onSubscribe}
                 >
                    Upgrade 
                    <Zap className="w-4 h-4 ml-2 fill-white"/>
                 </Button>
            </DialogFooter>
        </DialogContent>

    </Dialog>
  )
}

export default ProModal