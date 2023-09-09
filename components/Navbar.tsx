import React from 'react'
import MobileSidebar from './MobileSidebar'
import { getCurrentCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const Navbar = async() => {
  const getCount =await  getCurrentCount();
  const isPro = await checkSubscription();
  return (
    <div className='flex items-center p-4'>
        <MobileSidebar isPro={isPro} getCount={getCount}/>
    </div>
  )
}

export default Navbar