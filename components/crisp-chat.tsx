"use client"

import { useEffect } from "react"
import { Crisp } from 'crisp-sdk-web'


export const CrispChat = () =>{
    useEffect(() => {
      
      Crisp.configure("3c93d663-bee9-41d9-8bb5-b0d2b276a68e");
    }, [])
    return null;
}