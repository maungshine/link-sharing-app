import IconArrowRight from '@/components/svg/IconArrowRight'
import IconFrontendMentor from '@/components/svg/IconFrontendMentor'
import IconGithub from '@/components/svg/IconGithub'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProfilePage() {
  return (
    <section className='flex flex-col gap-4 justify-center items-center mt-12 sm:rounded-2xl sm:top-40 sm:left-[50%] sm:right-[50%] sm:-translate-x-[50%] sm:w-fit sm:z-50 sm:bg-white sm:absolute sm:px-12 sm:py-12' >
        <Image width={104} height={104} className='h-[104px] w-[104px] object-cover rounded-full border-4 border-primary' alt='profile photo' src={'/assets/images/pexels-olly-3785079.jpg'} />
        <h1 className='heading-m text-darkgrey'>Ben Wright</h1>
        <p className='text-grey'>ben@expample.com</p>
        <div className='flex flex-col mt-8 gap-4'>
        <Link href={'https://github.com'} target='_blank' className='bg-[#1a1a1a] flex items-center gap-2 min-w-[240px] text-white rounded-md px-4 py-4' ><IconGithub color='fill-white' /> <span>Github</span><IconArrowRight color='fill-white ml-auto' /></Link>
        <Link href={'https://frontendmentor.io'} target='_blank' className='bg-[#6abecd] flex items-center gap-2 min-w-[240px] text-white rounded-md px-4 py-4' ><IconFrontendMentor color='fill-white' /> <span>Frontend mentor</span><IconArrowRight color='fill-white ml-auto' /></Link>
        </div>
    </section>
  )
}

export default ProfilePage
