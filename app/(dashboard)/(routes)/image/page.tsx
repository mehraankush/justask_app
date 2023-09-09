"use client"
import axios from 'axios'
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { amountOptions, formSchema, resolutionOptions} from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { Select ,SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { useProModel } from '@/hooks/use-pro-model'


const page = () => {
  const proModel = useProModel();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      prompt:"",
      amount:"1",
      resolution:"512x512"
    }
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async(val:z.infer<typeof formSchema>)=>{
     try{
      
      setImages([]);
      const response = await axios.post("/api/image",val)

      const urls = response.data.map((image:{url:string})=>(
        image.url
      ))

      setImages(urls);

      // console.log(val)
     form.reset();

     }catch(err:any){

      if(err?.response?.status === 403){
        proModel.onOpen();
      }
      else{
        toast.error("Something Went Wrong");
      }
      console.log("Image_Prompt_Request_Error",err);
     }finally{
       router.refresh();
     }
  }
   

  return (
    <div>
      <Heading 
        title='Image Generation'
        description='Turn Your Word Into an Image.'
        Icon={ImageIcon}
        IconColor='text-pink-700'
        bgColor='bg-pink-700/10'
      />

      <div className='px-4 lg:px-8 '>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
              grid grid-cols-12 gap-2'
            >
              <FormField 
                name="prompt"
                render={({ field}) =>(
                  <FormItem className='col-span-12 lg:col-span-6'>
                      <FormControl className='m-0 p-0'>
                            <Input
                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent '
                                // disabled={isLoading}
                                placeholder='A piture of sky with full of stars '
                                {...field}
                            />
                      </FormControl>
                  </FormItem>

                )}
              />
             
              <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                    
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> 
              <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                    
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> 

                  
              <Button type='submit' className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>
            </form>
          </Form>
         
         <div className='space-y-4 mt-4'>
          {
            isLoading &&(
              <div className='p-20'>
                 <Loader/>
              </div>
            )
          }
          {images.length===0 && !isLoading && (
            <div>
              <Empty lable='No Images Generated..'/>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
            {
              images.map((src)=>(
                 <Card
                  key={src}
                  className='rounded-lg overflow-hidden '
                 >
                    <div className='relative aspect-square'>
                      <Image src={src} alt='Generated Image' fill />
                    </div>
                    <CardFooter className='p-2'>
                      <Button 
                        onClick={()=>window.open(src)}
                        variant='secondary' 
                        className='w-full'
                      > 
                        <Download className='h-4 w-4 mr-2'/>
                        Download
                      </Button>
                    </CardFooter>
                 </Card>
              ))
            }
          </div>

         </div>

      </div>
    </div>
  )
}

export default page