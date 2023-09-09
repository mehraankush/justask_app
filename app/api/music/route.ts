import { NextResponse } from "next/server";
import Replicate from 'replicate'
import { increaseApiLimit,CheckApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth:process.env.REPLICATE_AI_API_TOKEN || ""
});

export async function POST(req:Request){

    try{
        // const { userId } = req;//  just to check if user is logedin or not
        const body = await req.json();
        const { prompt,userId } = body;
        // console.log(prompt);
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
      
        if(!prompt){
            return new NextResponse("prompt are Required",{status:500})
        }
        const freeTrial = await CheckApiLimit(userId);
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro){
            return new NextResponse("Free Trial Has Expried",{status:403});
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: prompt
              }
            }
          );
           
          // console.log(response);
          if(!isPro){
              await increaseApiLimit(userId);
          }
          return NextResponse.json(response)

    }catch(err){
        console.log("MUSIC_ERROR ",err);
        return new NextResponse("Internal error",{status:500});
    }
}