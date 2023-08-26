import { NextResponse } from "next/server";
import Replicate from 'replicate'


const replicate = new Replicate({
    auth:process.env.REPLICATE_AI_API_TOKEN || ""
});

export async function POST(req:Request){

    try{
        // const { userId } = req;//  just to check if user is logedin or not
        const body = await req.json();
        const { prompt } = body;
        console.log(prompt);
        // if(!userId){
        //     return new NextResponse("Unauthorized",{status:401});
        // }
      
        if(!prompt){
            return new NextResponse("prompt are Required",{status:500})
        }

        const response = await replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
              prompt: prompt
            }
          }
        );
           
          console.log(response);

          return NextResponse.json(response)

    }catch(err){
        console.log("VIDEO_ERROR ",err);
        return new NextResponse("Internal error",{status:500});
    }
}