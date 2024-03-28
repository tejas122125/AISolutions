import { Separator } from "@/components/ui/separator"
import React from 'react'
import { Button } from "./ui/button"

const Hero = () => {
    return (
        <div className='w-full h-fit mt-6 pt-10 pb-16 flex flex-col gap-8 justify-center items-center px-10  bg-pink-400'>
            <div className='w-full h-full p-4 flex flex-col md:flex-row md:gap-8 md:px-40 md: pt-40 bg-purple-500 justify-between'>
                <div className=" flex flex-col gap-4">
                    <div className='text-4xl mx-auto'>AI MADE EASY FOR
                        <br />
                        <br />
                        <p className="text-4xl">DEVELOPERS</p>
                    </div>
                    <p className="text-lg">Eden AI provides a unique API connected to the best AI en</p>
                <div className="flex flex-row gap-3"> <Button className="bg-blue-400 dark:text-white text-black hover:bg-blue-300 hover:dark:bg-blue-700 ">GET START</Button>
                <Button className="bg-orange-400 dark:text-white text-black hover:bg-orange-300 hover:dark:bg-orange-700 ">PRICING</Button>
                 </div>
                </div>


                <Separator orientation="vertical" />
                <div><img src="../../public/image.png" alt="" /></div>
            </div>
        </div>
    )
}

export default Hero