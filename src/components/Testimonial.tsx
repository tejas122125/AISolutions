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
        <div className='w-full h-fit  dark:text-white flex flex-col justify-center items-start gap-4 md:px-40  px-10'>
            <div className='w-full  flex-col flex items-center justify-center gap-2'>
<div className='bg-pink-300 z-10 w-28 h-28 relative blur-3xl top-64 -left-32  rounded-full'></div>

                <h3 className='text-xl  py-3  md:text-5xl font-bold  md:py-10  w-full text-center'> Listen From Our Customers</h3>
                <div>
                    <Carousel className="flex w-64 md:w-full ">
                        <CarouselContent>
                            {
                                testimonials.map((value, index) => {

                                    return <CarouselItem key={index}>
                                        <div className="shadow-md rounded-md md:p-6 w-64 md:w-full ">
                                            {/* Glassy overlay */}
                                            <div className="glass flex flex-col gap-2 justify-center items-center p-1 md:p-6 text-center  ">

                                                {/* Content */}
                                                <div className=' flex flex-col  justify-center items-center'>
                                                    <h2 className="text-xl font-bold mb-4 md:text-2xl">{value.companyName}</h2>
                                                    <p className=" md:text-xl">{value.testimonial}</p>
                                                  
                                                </div>
                                            </div>
                                        </div>

                                    </CarouselItem>

                                    return index
                                })
                            }

                        </CarouselContent>
                        <CarouselPrevious className='dark:bg-monu '/>
                        <CarouselNext className='dark:bg-monu' />
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