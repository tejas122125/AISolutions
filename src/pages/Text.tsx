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

        </div>
    )
}

export default Text