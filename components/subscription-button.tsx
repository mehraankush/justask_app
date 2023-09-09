"use client"

import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "./ui/button";

interface subscriptionButtonProps{
    isPro:boolean;
}

export const SubscriptionButton = ({isPro = false}:subscriptionButtonProps) => {
  

    const [loading, setloading] = useState(false);

    const onClick = async() =>{
      try{
        setloading(true)
         const response = await axios.get("/api/stripe");
         window.location.href = response.data.url;
      }catch(err){
        toast.error("Something Went Wrong");
        console.log("BILLING_ERROR",err);
      }finally{
        setloading(false)
      }
    }

  return (
    <div>
       <Button disabled={loading} variant={isPro?"default":"premium"} onClick={onClick}>
           {isPro?"Managae Subscription":"Upgrade"}
           {!isPro && <Zap className="w-4 h-4 ml-2 fill-white "/>}
       </Button>
    </div>
  )
}

export default SubscriptionButton