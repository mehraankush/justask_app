import { Settings } from "lucide-react"

import Heading from "@/components/Heading"
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";


const page = async() => {

    // TODO utils to check for subs
   const isPro = await checkSubscription();
  return (
    <div>
        <Heading
           title="Settings"
           description="Manage Account Settings"
           Icon={Settings}
           IconColor="text-gray-700 "
           bgColor="bg-gray-700/10"
        />
     <div className="px-4 lg:px-8 space-y-4">
         <div className="text-muted-foreground text-sm">
             {isPro ?"You are currently on a pro plan. ": "You are currently on a free paln."}
         </div>
         <SubscriptionButton isPro={isPro}/>
     </div>
      
    </div>
  )
}

export default page