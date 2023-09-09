import { Menu } from 'lucide-react'

import { Button } from './ui/button'
import {Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideBar from './SideBar'

interface MobileSideBarProps {
  getCount:number;
  isPro:boolean;
}

const MobileSidebar = ({getCount=0,isPro=false}:MobileSideBarProps) => {
  return (
    <Sheet>
        <SheetTrigger>
            <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0'>
          <SideBar isPro={isPro} getCount={getCount}/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar