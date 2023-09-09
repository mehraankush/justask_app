
import prismadb from "./prismadb";
import { MAX_FREE_COUNT } from "@/constents";


var UserID:any ;
export const increaseApiLimit = async(userId:string)=>{
    UserID = userId;
    if(!userId){
      return;
    }
    const userApilimit = await prismadb.userApiLimit.findUnique({
        where:{
            userId:userId
        }
    });
   
    if(userApilimit){
        await prismadb.userApiLimit.update({
            where:{ userId:userId},
            data:{count:userApilimit.count+1},
        })
    }
    else{
        await prismadb.userApiLimit.create({
            data:{userId:userId,count:1}
        })
    }
}

export const CheckApiLimit = async(userId:string) =>{
    
// const {data:session} = useSession();
 UserID = userId;
    if(!userId){
        return false;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{userId:userId}
    });

    if(!userApiLimit || userApiLimit.count< MAX_FREE_COUNT){
        return true;
    }else{
        return false;
    }
}

export const getCurrentCount = async() =>{
     console.log(UserID);
    if(!UserID){
        return 0;
    }
    
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{userId:UserID}
    })

    if(!userApiLimit){
        return 0 ;
    }

  return userApiLimit.count;
}