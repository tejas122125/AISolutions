import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Partners from '@/components/Partners'
import Scroller from '@/components/Scroller'
import Section3 from '@/components/Section3'
import Testimonial from '@/components/Testimonial'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full overflow-x-hidden  dark:bg-monu bg-light'>
            <Navbar/>
            <Hero/>
            <Partners/>
            <Scroller/>
            <Section3/>
            <Testimonial/>
            <Footer/>
    </div>
  )
}

export default Home