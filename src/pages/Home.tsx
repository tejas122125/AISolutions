import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Partners from '@/components/Partners'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full bg-blend-hue overflow-x-hidden'>
            <Navbar/>
            <Hero/>
            <Partners/>

        
    </div>
  )
}

export default Home