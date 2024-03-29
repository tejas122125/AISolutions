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


    const text = ["1", "2", "3", "4", "5"]
    return (
        <div className='w-full h-fit bg-pink-500 flex flex-col justify-center items-center gap-4 px-40'>
            <div className='w-full bg-green-400 flex-col flex items-center justify-center gap-4'>
                <h3 className='text-xl md:text-4xl py-6 md:py-10'> Listen From Our Customers</h3>
                <div>
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {
                                text.map((value, index) => {

                                    return <CarouselItem key={index}>
                                        <div className='p-1 bg-blue-400 flex flex-col items-center justify-center h-60  '>{value}</div>
                                    </CarouselItem>

                                    return index
                                })
                            }

                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
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