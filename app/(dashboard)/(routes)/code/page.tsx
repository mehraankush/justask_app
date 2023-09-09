"use client"
import axios from 'axios'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { OpenAI } from 'openai'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { useProModel } from '@/hooks/use-pro-model'


const page = () => {
  const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])
  const proModel = useProModel();
  const router = useRouter();
  const {data:session} = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      prompt:""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async(val:z.infer<typeof formSchema>)=>{
     try{
        
      const userMessage:OpenAI.Chat.ChatCompletionMessage = {
         role:"user",
         content:val.prompt,
      }

      const newMessages = [...messages,userMessage];
      const response = await axios.post("/api/code",{
        messages:newMessages,
        userId:session?.user?.email
      })
      
      setMessages((curr)=>[...curr,userMessage,response.data]);
      form.reset();

     }catch(err:any){
      if(err?.response?.status === 403){
        proModel.onOpen();
      }else{
        toast.error("Something Went Wrong");
      }
      console.log("Prompt_Request_Error",err);
     }finally{
       router.refresh();
     }
  }
   

  return (
    <div>
      <Heading 
        title='Code Generation'
        description='Generate code using descriptive text'
        Icon={Code}
        IconColor='text-green-700'
        bgColor='bg-green-700/10'
      />

      <div className='px-4 lg:px-8 '>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
              grid grid-cols-12 gap-2'
            >
              <FormField 
                name="prompt"
                render={({ field}) =>(
                  <FormItem className='col-span-12 lg:col-span-10'>
                      <FormControl className='m-0 p-0'>
                            <Input
                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent '
                                disabled={isLoading}
                                placeholder='Simple Toggle Button Using React Hook'
                                {...field}
                            />
                      </FormControl>
                  </FormItem>

                )}
              />

             <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}> Ask</Button>
            </form>
          </Form>
        </div>
         
         <div className='space-y-4 mt-4'>
          {
            isLoading &&(
              <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                 <Loader/>
              </div>
            )
          }
          {messages.length===0 && !isLoading && (
            <div>
              <Empty lable='No Conversation Started..'/>
            </div>
          )}
           <div className='flex flex-col-reverse gap-y-4 '>
               {messages?.map((message)=>(
                <div key={message.content}
                 className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role ==='user'?'bg-white border border-black/10':'bg-muted'
                 )}
                >
                  {/* {message.role === 'user'? <UserAvatar/>:<BotAvatar/>} */}
                  <ReactMarkdown
                    components={{
                      pre:({node,...props})=>(
                        <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                          <pre {...props}/>
                        </div>
                      ),
                      code:({node,...props})=>(
                          <code {...props} className='bg-black/10 rounded-lg p-1'/>
                      )
                    }}

                    className='text-sm overflow-hidden leading-7'
                  >
                      {message.content || ""}
                  </ReactMarkdown>
                </div>
               ))}
           </div>
         </div>

      </div>
    </div>
  )
}

export default page