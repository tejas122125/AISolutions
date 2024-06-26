import { Separator } from "@/components/ui/separator"
import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js';
import { Button } from "./ui/button"





const Hero = () => {
    const typing = useRef(null)

    useEffect(() => {
        const typed = new Typed(typing.current, {
            strings: ["DEVELOPERS", "ENTERPRISE", "STUDENTS"],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, [])
    return (
        <div className='w-screen h-fit  md:pt-10 pb-16 flex flex-col gap-8 justify-center items-center px-10 '>
            <div className='w-full h-full p-2  flex flex-col md:flex-row md:gap-8 md:px-40 md:pt-40  justify-between'>
                <div className=" flex flex-col gap-4 pt-20 dark:text-white text-black">
                    <div className="w-full p-2 ">
                        <p className=" text-xl md:text-4xl font-mono font-semibold ">AI MADE EASY FOR </p>

                        <span className=" text-xl  md:text-4xl w-full font-mono font-semibold dark:text-purple-900 text-amber-500" ref={typing}></span>
                    </div>
                    <p className="text-lg p-2"> AI Solution provides a unique and fast API connected to the best AI endpoint servers </p>
                    <div className="flex flex-row gap-3 pt-8"> <Button className="bg-blue-400 dark:text-white text-black hover:bg-blue-300 hover:dark:bg-blue-700 ">GET START</Button>
                        <Button className="bg-orange-400 dark:text-white text-black hover:bg-orange-300 hover:dark:bg-orange-700 ">PRICING</Button>
                    </div>
                    <p className=" pt-10">Stop juggling tasks. Let AI be your all-in-one solution.</p>
                </div>


                <Separator orientation="vertical" />
                <div className="w-1/2 h-3/4 rounded-md mx-auto mt-2 md:mt-10"><img src="../../public/AILogo.jpeg" alt="" /></div>
            </div>
        </div>
    )
}

export default Hero