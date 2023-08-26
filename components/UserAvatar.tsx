import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
    const {user} = useState(); 
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.image}/>
       <AvatarFallback>
        {user?.image.charAt(0)}
        {user?.image.charAt(0)}
       </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar