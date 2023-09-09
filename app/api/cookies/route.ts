import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{  
        const body = await req.json();
        const {userid} = body;

        const cookieStore = cookies();
        cookieStore.set('userid',userid);
        // console.log("SuccesFully Stored Cookies");
        return new  NextResponse("Cookies Stored",{status:200})

    }catch(err:any){
        console.log("Error In Storing The Cookies",err);
        return new  NextResponse("INTERNAL_ERROR",{status:500})
    }

}