import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { cookies } from "next/headers";


const settingsUrl = absoluteUrl("/settings");

export async function GET(){
 try{
    const cookieStore = cookies();
    const userId = cookieStore.get('userid')?.value;
    if(!userId){
        return new NextResponse("Unauthorized",{status:401});
    }
    
    const userSubscription = await prismadb.userSubscription.findUnique({
        where:{userId:userId}
    })
     // if subscription Already Exist redirect to cancel billing page
    if(userSubscription && userSubscription.stripeCustomerId){

        const stripeSession = await stripe.billingPortal.sessions.create({
            customer:userSubscription.stripeCustomerId,
            return_url:settingsUrl
        })
        return new NextResponse(JSON.stringify({url:stripeSession.url}));
    }
   // if not exist create one
    const stripeSessions = await stripe.checkout.sessions.create({
        success_url:settingsUrl,
        cancel_url:settingsUrl,
       payment_method_types:["card"],
       mode:"subscription",
       billing_address_collection:"auto",
       customer_email:userId,
     line_items:[{
        price_data:{
            currency:"INR",
            product_data:{
                name:"Genious Pro",
                description:"Unlimited Ai Generations",
            },
            unit_amount:200000,
            recurring:{
                interval:"month"
            }
        },
        quantity:1
     }],
     metadata:{
        userId,
     }
    });

    return new NextResponse(JSON.stringify({url:stripeSessions.url}))

 }catch(err:any){
    console.log("STRIPE_ERROR",err);
    return new NextResponse("Internal_error",{ status:500})
 }
}