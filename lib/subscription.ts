import { Select } from '@/components/ui/select';
import { cookies } from "next/headers";
import prismadb from "./prismadb";


const DAY_IN_Ms= 86_400_000;
// check  if user is subscribed 
export const checkSubscription = async() =>{

        const cookieStore = cookies();
        const userId = cookieStore.get('userid')?.value
     
        if(!userId)return false;
     
       const userSubscription = await prisma?.userSubscription.findUnique({
                where:{userId:userId},
                select:{
                        stripeSubscriptionId:true,
                        stripeCurrentPeriodEnd:true,
                        stripeCustomerId:true,
                        stripePriceId:true,
                }
       })

       if(!userSubscription){
           return false;
       }
       // one day of grace period
       const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()!+DAY_IN_Ms > Date.now();

       return !!isValid;

}
