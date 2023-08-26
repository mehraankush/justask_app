import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY // This is also the default, can be omitted
});

export async function POST(req:Request){

    try{
        // const { user Id } = req;//  just to check if user is logedin or not
        const body = await req.json();
        const { prompt,amount=1,resolution = "512x512" } = body;
      
        if(!openai.apiKey){
            return new NextResponse("OpenAi key Not configured",{status:500})
        }

        if(!prompt){
            return new NextResponse("Prompt is Required",{status:500})
        }
        if(!amount){
            return new NextResponse("amount are Required",{status:500})
        }
        if(!resolution){
            return new NextResponse("resolution are Required",{status:500})
        }

        const response = await openai.images.generate({
            prompt:prompt,
            n:parseInt(amount,10),
            size:resolution
          });

          console.log(response.data);

          return NextResponse.json(response.data)

    }catch(err){
        console.log("IMAGE_ERROR ",err);
        return new NextResponse("Internal error",{status:500});
    }
}