import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import OpenAI from 'openai';

import { increaseApiLimit,CheckApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY // This is also the default, can be omitted
});

export async function POST(req:Request){

    try{
        // const { userId } = req;//  just to check if user is logedin or not
        const cookieStore = cookies();
        const userId = cookieStore.get('userid')?.value;
        const body = await req.json();
        const { messages} = body;
        // console.log(messages);
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
      
        if(!openai.apiKey){
            return new NextResponse("OpenAi key Not configured",{status:500})
        }

        if(!messages){
            return new NextResponse("Messages are Required",{status:500})
        }
        
        const freeTrial = await CheckApiLimit(userId);
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro){
            return new NextResponse("Free Trial Has Expried",{status:403});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
          });
        //   console.log(response.choices[0].message);
        if(!isPro){
            await increaseApiLimit(userId);
        }
       

          return NextResponse.json(response.choices[0].message)

    }catch(err){
        console.log("CONVERSATION_ERROR ",err);
        return new NextResponse("Internal error",{status:500});
    }
}