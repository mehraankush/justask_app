import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>Loader
        <div className='w-10 h-10 relative animate-spin'>
          <Image fill  src="/logo.png" alt="Logo"/>
        </div>
        <p className='text-sm text-muted-foreground'>Genius is Thinking ..</p>
    </div>
  )
}

export default Loader