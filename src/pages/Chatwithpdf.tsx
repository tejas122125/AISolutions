import React, { FormEventHandler, useState } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { uploadPdf } from '@/utils/appwrite/funtions';
import { type Models } from 'appwrite';



const chatwithpdf = () => {
    const [files, setFile] = useState<any>([])
    const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([{ text: "dfvhdvfvfhgv", fromUser: false }]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        const input: HTMLElement = document.getElementById('textinput')!
        input.innerText = ''

        if (inputText.trim() === '') return;
        setMessages([...messages, { text: inputText, fromUser: true }]);

        // Simulate AI response (replace this with actual AI response logic)

    };

    const onsubmit = async (e: any) => {
        let resid = []
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("file", files)
        console.log(files)
        // uploading to appwrite
        for (let i = 0; i < files.length; i++) {
            try {
                const res: Models.File | undefined = await uploadPdf(files[i])
                resid.push(res!.$id)
                console.log(resid)

            } catch (error) {
                console.log(error)
            }

        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/getpdffile")
        } catch (error) {
            
        }


    }


    return (
        <div className='w-full h-screen flex flex-row gap-2 md:px-40 px-3 bg-monu dark:text-white text-black '>
            <div className='bg-blue-800 hidden p-4 md:w-1/3 md:flex md:flex-col gap-8 items-center '>
                <form onSubmit={onsubmit}>
                    <label className="block mb-2 mt-12 font-medium text-gray-900 dark:text-white text-2xl text-center" htmlFor="multiple_files">Upload multiple PDF files</label>
                    <input className="block w-full text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={(e) => { setFile(e.target.files) }} id="multiple_files" type="file" multiple />
                    <button type="submit" className="mt-4 mx-auto dark:text-white bg-green-700 hover:bg-green-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                </form>
                <div className='0 w-full flex flex-col items-center gap-4'><h3 className='text-2xl font-semibold mt-11' id='previous-session'>previous sesions</h3>
                    <div id='previous-session-list' className=' w-full bg-green-500 rounded-xl p-2'>tejaswee kumar singh</div>
                </div>


            </div>
            <div className='bg-purple-800 w-full h-full p-2 relative'>

                <div className="flex flex-col  h-full w-full relative overflow-y-scroll">
                    {messages.map((value, index) => {
                        if (value.fromUser === true) {
                            return <div key={index} className=' mt-2 md:mt-7 flex w-full p-3 rounded-md justify-start items-center bg-white dark:text-white text-black text-base md:text-xl  '>User :  {value.text}</div>
                        }
                        else {

                            return <div className=' flex w-full p-3 rounded-md justify-end items-center dark:text-white text-black text-base md:text-xl  '>AI :  {value.text}</div>
                        }

                    })

                    }
                </div>
                <div className="flex items-center p-4 border-t w-full absolute bottom-0 left-0 bg-slate-400">
                    <input id='textinput'
                        type="text"
                        className="flex-1 p-2 mr-2 border rounded-lg"
                        placeholder="Type your message..."
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>

            </div>


        </div>
    )
}

export default chatwithpdf