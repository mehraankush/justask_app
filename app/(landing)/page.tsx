import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <p className='text-9xl'>Hello Nextjs</p>
      <div>
        <Link href='/sign-in'>
            <Button variant='outline'>
              Login
            </Button>
        </Link>
        <Link href='/sign-up'>
            <Button variant='outline'>
              Register
            </Button>
        </Link>
        <Link href='/dashboard'>
            <Button variant='outline'>
              Dashboard
            </Button>
        </Link>
      </div>
    </div>
  )
}

