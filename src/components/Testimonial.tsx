import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import { Card, CardContent } from "@/components/ui/card"
const Testimonial = () => {

    const testimonials = [
        {
            companyName: "Synthia AI Solutions",
            testimonial: "Synthia's AI solutions helped us streamline our operations and improve efficiency. Their team provided excellent support throughout the implementation process."
        },
        {
            companyName: "NeuroNex Tech",
            testimonial: "We are extremely impressed with NeuroNex's AI platform. It has revolutionized the way we analyze data and make business decisions. Highly recommended!"
        },
        {
            companyName: "CogniTech Innovations",
            testimonial: "CogniTech's AI solutions have been instrumental in driving our business growth. Their predictive analytics tools have helped us identify new opportunities and mitigate risks."
        },
        {
            companyName: "DeepMind Dynamics",
            testimonial: "DeepMind's cutting-edge AI algorithms have surpassed our expectations. Their technology has enabled us to achieve breakthroughs in areas we never thought possible."
        }
        // Add more objects as needed
    ];

    return (
        <div className='w-full h-fit  flex flex-col justify-center items-center gap-4 px-40'>
            <div className='w-full bg-blue-400 flex-col flex items-center justify-center gap-4'>
<div className='bg-pink-300 z-10 w-28 h-28 relative blur-3xl top-64 -left-32  rounded-full'></div>

                <h3 className='text-xl md:text-4xl py-6 md:py-10'> Listen From Our Customers</h3>
                <div>
                    <Carousel className=" w-96 ">
                        <CarouselContent>
                            {
                                testimonials.map((value, index) => {

                                    return <CarouselItem key={index}>
                                        <div className=" relative  shadow-md rounded-md p-6 w-96">
                                            {/* Glassy overlay */}
                                            <div className="glass ">

                                                {/* Content */}
                                                <div className=' flex flex-col justify-center items-center'>
                                                    <h2 className="text-xl font-bold mb-4">{value.companyName}</h2>
                                                    <p className="text-gray-600">{value.testimonial}</p>
                                                    {/* Add more content as needed */}
                                                </div>
                                            </div>
                                        </div>

                                    </CarouselItem>

                                    return index
                                })
                            }

                        </CarouselContent>
                        <CarouselPrevious className='dark:bg-white'/>
                        <CarouselNext className='dark:bg-white' />
                    </Carousel>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Testimonial