import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const Section3 = () => {

const [section,setsection] = useState<string>("GeneartiveAi")

const setContent = (e:any)=>{
    const text = e.target.textContent
    console.log(text)
    setsection(text)
    console.log(section)
}
useEffect(()=>{
console.log("first")
},[])


    return (
        <div className=' mt-28  w-screen h-fit flex flex-col justify-center items-center px-2 md:px-40 dark:text-white text-black'>
            <div className=' w-full p-3 '>
                <h3 className='text-5xl text-center'> Pick The Right AI Technology </h3>  </div>
            <ul className=' mt-10 flex flex-row items-center justify-evenly w-full  py-4  text-xl'>
                <li className='inline-block  border-b-2 border-transparent hover:border-white transition duration-300  hover:scale-110  hover:cursor-pointer' onClick={setContent}>GeneartiveAi</li>
                <li className='inline-block  border-b-2 border-transparent hover:border-white transition duration-300  hover:scale-110  hover:cursor-pointer' onClick={setContent} >Audio</li>
                <li className='inline-block  border-b-2 border-transparent hover:border-white transition duration-300  hover:scale-110  hover:cursor-pointer' onClick={setContent} >Text</li>
                <li className='inline-block  border-b-2 border-transparent hover:border-white transition duration-300  hover:scale-110  hover:cursor-pointer' onClick={setContent} >Image</li>
                <li className='inline-block  border-b-2 border-transparent hover:border-white transition duration-300  hover:scale-110  hover:cursor-pointer' onClick={setContent} >DocumentAnalysis</li>
                <li className='inline-block  border-b-2 border-transparent hover:border-white transition duration-300  hover:scale-110 hover:cursor-pointer' onClick={setContent} >NSFW</li>
            </ul>
            {section === 'GeneartiveAi'  &&  <div className='mt-14 content w-full flex flex-col md:flex-row   gap-4 justify-center items-center ' >
                <img className='w-2/3 h-fit' src="../../public/Generative.png" alt="" />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>GENERATIVE AI</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                    <a href="/GenerativeAI">
                    <Button className='bg-green-600 dark:text-white text-blue-900  hover:bg-green-300'> Learb More</Button>
                    </a>

                </div>
            </div>}

            {section === 'Audio'  &&  <div className=' mt-14 content w-full flex flex-col md:flex-row  gap-4 justify-center items-center ' >
                <img className='w-2/3 h-fit' src="../../public/Audio.png" alt="" />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Audio</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                    <Button className='bg-green-600 dark:text-white text-blue-900  hover:bg-green-300'> Learb More</Button>

                </div>
            </div>}


            {section === 'Image'  &&  <div className=' mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center ' >
                <img className='w-2/3 h-fit' src="../../public/image.png" alt="" />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Image</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                    <Button className='bg-green-600 dark:text-white text-blue-900  hover:bg-green-300'> Learb More</Button>

                </div>
            </div>}

            {section === 'DocumentAnalysis'  &&  <div className=' mt-14 content w-full flex flex-col md:flex-row   gap-4 justify-center items-center ' >
                <img className='w-2/3 h-fit' src="../../public/Document.png" alt="" />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Document Analysis</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                    <Button className='bg-green-600 dark:text-white text-blue-900  hover:bg-green-300'> Learb More</Button>

                </div>
            </div>}
            {section === 'Text'  &&  <div className=' mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center ' >
                <img className='w-2/3 h-fit' src="../../public/Text.png" alt="" />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Text</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                    <Button className='bg-green-600 dark:text-white text-blue-900  hover:bg-green-300'> Learb More</Button>

                </div>
            </div>}
            {section === 'NSFW'  &&  <div className=' mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center ' >
                <img className='w-2/3 h-fit' src="../../public/Document.png" alt="" />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Not Safe For Work</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt magnam laborum et, velit quas odit, nemo possimus inventore aperiam distinctio.</p>
                    <Button className='bg-green-600 dark:text-white text-blue-900 hover:bg-green-300'> Learb More</Button>

                </div>
            </div>}
        </div>
    )
}

export default Section3