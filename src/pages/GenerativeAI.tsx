import React from 'react'
import { Button } from '@/components/ui/button'


const GenerativeAI = () => {
    return (

        // image generation
        <div className='w-full h-full flex flex-col gap-2  md:px-40 px-10 '>
        <div className='mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center ' >
            <img className='w-2/3 h-fit' src="../../public/Generative.png" alt=" Image Generation " />
            <div className='flex flex-col justify-center items-center gap-4'>
                <h3 className='text-3xl '>GENERATIVE AI</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                <Button className='bg-green-600 dark:text-white text-blue-900  hover:bg-green-300'> Learb More</Button>

            </div>
        </div>
        </div>
    )
}

export default GenerativeAI