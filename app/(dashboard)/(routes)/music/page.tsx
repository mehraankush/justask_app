"use client"
import axios from 'axios'
import { Music } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { OpenAI } from 'openai'
import { toast } from 'react-hot-toast'

import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { useProModel } from '@/hooks/use-pro-model'


const Page = () => {
  const [music, setMusic] = useState<string>();
  const proModel = useProModel();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      prompt:""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async(val:z.infer<typeof formSchema>)=>{
     try{
        
       setMusic(undefined);

      const response = await axios.post("/api/music",val)
      
      setMusic(response.data.audio);
      form.reset();

     }catch(err:any){

    if(err?.response?.status === 403){
        proModel.onOpen();
      }
      else{
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
        title='Music Generation'
        description='Turn your precious words into melody!'
        Icon={Music}
        IconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
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
                                placeholder='Piano Solo'
                                {...field}
                            />
                      </FormControl>
                  </FormItem>

                )}
              />

             <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>
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
          {music && !isLoading && (
            <div>
              <Empty lable='No Music Generated..'/>
            </div>
          )}
         {
          music && (
            <audio controls className='w-full mt-8 '>
              <source src={music}/>
            </audio>
          )
         }
         </div>

      </div>
    </div>
  )
}

export default Page