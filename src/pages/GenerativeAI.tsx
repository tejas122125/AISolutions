import React from 'react'
import { Button } from '@/components/ui/button'


const GenerativeAI = () => {
    return (

        // image generation 
        <div className='w-full h-full flex flex-col gap-2 p-2 md:px-40 px-10 bg-monu dark:text-white text-black '>
            <h1 className='md:text-5xl text-center mt-14 font-bold'> Generative Ai</h1>
            <h3 className='md:text-2xl text-center mt-8'> Our platform provides access to best state of the art model</h3>
            <div className='mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center  p-1 ' >
                <img className='w-1/2 h-fit' src="../../public/Generative.png" alt=" Image Generation " />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Image Generation</h3>
                    <p className='text-center'> Text-to-Image generation involves the use of computational techniques to create new images automatically, without the need for human intervention. This can be achieved using machine learning, computer graphics, or other algorithms that are trained on large datasets of images. Image Generation is an advanced feature that generates compelling images based on a given text prompt. It can easily produce high-quality and original images in a matter of seconds, without the need for specialized design skills or software.</p>
                </div>

            </div>
            <button type="button" className="dark:text-white text-black text-base w-fit bg-gradient-to-r ml-4 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2">Get Started</button>

            <div className='mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center  p-1 ' >

                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Image Captioning</h3>
                    <p className='text-center'> Any web developer will agree that optimizing images for search engine visibility and ensuring accessibility for all users is paramount. However, they’ll agree that manually adding image descriptions or alt tags can be time-consuming and error-prone. Enter Cloudinary’s AI-Powered Image Captioning add-on — an AI-powered tool that automates image caption generation, significantly reducing developers’ time on repetitive but critically important tasks surrounding accessibility and SEO.
                        <br />
                        Try out Image Captioning and other cutting-edge features at our new Generative AI Playground.</p>
                </div>
                <img className='w-1/2 h-fit' src="../../public/Captioning.png" alt=" Image Generation " />

            </div>
            <div className='w-full flex flex-row justify-end items-center'>
            <button type="button" className="dark:text-white  text-black text-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"> Get Started</button>
            </div>


        </div>
    )
}

export default GenerativeAI