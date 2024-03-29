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
  return (
    <div className='w-full h-fit bg-pink-500 flex flex-col justify-center items-center gap-4 px-40'>
        <div className='w-full bg-green-400 flex-col flex items-center justify-center gap-4'>
            <h3 className='text-xl md:text-4xl py-6 md:py-10'> Listen From Our Customers</h3>
            <div>
            <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
            </div>
        </div>
    </div>
  )
}

export default Testimonial