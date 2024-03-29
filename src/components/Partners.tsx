import React from 'react'

const Partners = () => {
    return (
        <div className='w-full flex flex-col gap-3  px-10  dark:text-white text-black'  >
            <div className='font-semibold text-2xl md:text-xl mx-auto pt-4'>TRUSTED BY THE BEST TEAMS IN THE WORLD</div>
            <div className='mx-auto md:flex-row  flex flex-col'>
                <div className='flex flex-row '>
                    <img src="https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/656ddaa8d122ee7d2e2aaad9_intelcenter.svg" loading="lazy" alt="Intelcenter logo" className="max-w-16 md:max-w-32 inline-block mx-4 mb-3"></img>
                    <img src="https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/656dd9c3f8f4611b7e351b0b_littlebigcode.svg" loading="lazy" alt="webedia logo" className="max-w-16 md:max-w-32  inline-block mx-4 mb-3"></img>
                    <img src="https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/656dd9c31bab66563b4b0417_council%20of%20e.svg" loading="lazy" alt="siemens logo" className="max-w-16 md:max-w-32 inline-block mx-4 mb-3"></img>
                </div>
                <div className='flex flex-row flex-1'>
                    <img src="https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/656dd9c448ea64581f279831_synergize.svg" loading="lazy" alt="littlebigcode logo " className="max-w-16 md:max-w-32 inline-block mx-4 mb-3"></img>
                    <img src="https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/656dd9c44be6e861c56f9572_webstaurant.svg" loading="lazy" alt="Swiss life logo" className="max-w-16 md:max-w-32 inline-block mx-4 mb-3"></img>
                    <img src="https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/656dd9c447dae519df5688eb_sigfig.svg" loading="lazy" alt="Booking logo" className="max-w-16 md:max-w-32  inline-block mx-4 mb-3"></img>
                </div>
            </div>
        </div>
    )
}

export default Partners