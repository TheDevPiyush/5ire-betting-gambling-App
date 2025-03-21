"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/games");
  }, [])

  return (
    <div className='w-full flex justify-center items-center h-full'>
      page
    </div>
  )
}
