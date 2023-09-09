"use client"
import { useState , useEffect } from "react";
import { Zap } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNT } from "@/constents";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useProModel } from "@/hooks/use-pro-model";

interface FreeCounterProps{
  getCount:number;
  isPro:boolean;
}

const FreeCounter = ({getCount,isPro}:FreeCounterProps) => {

    const proModel = useProModel();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
       setMounted(true);
    }, [])
    
    if(!mounted){
        return null;
    }

    if(isPro) {
      return null;
    }

  return (
    <div className="px-3">
        <Card className="bg-white/10 border-0">
           <CardContent className="py-6">
             <div className="text-center text-sm text-white mb-4 space-y-2">
                <p>{getCount}/{MAX_FREE_COUNT} Free Generation</p>
             </div>
             <Progress
               className="h-3"
               value={(getCount/MAX_FREE_COUNT*100)}
             />
             <Button onClick={proModel.onOpen} className="w-full mt-2 " variant="premium"> 
                Upgrade 
                <Zap className="w-4 h-4 ml-2 fill-white"/>
            </Button>
           </CardContent>
        </Card>
    </div>
  )
}

export default FreeCounter