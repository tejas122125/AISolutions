import React from 'react'

const Text = () => {
    return (
        <div className='w-full h-full flex flex-col gap-2 p-2 md:px-40 px-10 bg-monu dark:text-white text-black '><h1 className='md:text-5xl text-center mt-14 font-bold '>Text</h1>
            <h3 className='md:text-2xl text-center mt-8'> Our platform provides access to best state of the art model</h3>


            <div className=' mt-4 md:mt-14  w-full flex flex-col md:flex-row gap-4 justify-center items-center bg-pink-300 p-4 hover:shadow-2xl  rounded-xl ' >
                <img className=' w-full md:w-1/2 h-fit' src="../../public/Generative.png" alt=" Image Generation " />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl '>Chat With Multiple PDF's</h3>
                    <p className='text-pretty text-sm md:text-base'> RAG has two main parts, retrieval and generation. In the first part, retrieval is used to fetch (chunks of) documents related to the query of interest. Generation uses those fetched chunks as added input, called context, to the answer generation model in the second part. This added context is intended to give the generator more up-to-date, hopefully better, information to base its generated answer on than just its base training data.</p>
                </div>

            </div>
            <button type="button" className="dark:text-white text-black text-base w-fit bg-gradient-to-r ml-4 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2">Get Started</button>

            <div className='mt-14 content w-full flex flex-col md:flex-row gap-4 justify-center items-center rounded-xl bg-green-200 p-4' >

                <div className='flex flex-col justify-center items-center gap-4 py-3'>
                    <h3 className='text-3xl '>Chat With Any Website</h3>
                    <p className=' text-pretty text-sm md:text-base  '> Techniques like information retrieval systems would be used to efficiently find the most appropriate information on the website based on the conversation. This could involve searching through text, images, or even videos hosted on the website.
                        </p>
                </div>
                <img className='w-full  md:w-1/2 h-fit rounded-tr-md rounded-bl-md ' src="chatwithwebsite.png" alt=" Image Generation " />

            </div>
            <div className='w-full flex flex-row justify-end items-center'>
                <button type="button" className="dark:text-white  text-black text-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"> Get Started</button>
            </div>


        </div>
    )
}

export default Text