import React, { FormEventHandler, useEffect, useState } from 'react'
import { SquarePlus } from 'lucide-react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { getDownloadLink, uploadPdf } from '@/utils/appwrite/functions';
import { type Models } from 'appwrite';
import { useQueryClient } from '@tanstack/react-query';
import { getAllChatWithPdf, getChatWithPdfMessages, getFileIds, uploadChatWithPdf } from '@/utils/appwrite/functions';
import { generateRandomString } from '@/utils/general';
import { Divide } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const chatwithpdf = () => {
    let human = []
    let ai = []
    const [newchat, setNewChat] = useState<boolean>(false)
    const [pdffiles,sePdftFiles] = useState<File[]> ([])
    const [currentMessages, setCurrentMessages] = useState<boolean>(false)
    const [msgid, setMsgId] = useState<string>("")
    const [previousSession, setPreviousSession] = useState<boolean>(false)
    const [messageids, setMessageIds] = useState<string[]>([])
    const [messageNames, setMessageNames] = useState<string[]>([])
    const [currentSessionId, setCurrentSessionId] = useState<string>("")
    const [downloaded, setDOwnloaded] = useState<boolean>(false)

    const [files, setFile] = useState<any>([])
    const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([{ text: "dfvhdvfvfhgv", fromUser: false }]);
    const [inputText, setInputText] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [airesponse, setAiResponse] = useState<boolean>(false)

    const getting = async (token: string) => {
        try {
            const temp = await getAllChatWithPdf(token)

            setMessageIds(temp[0])
            setMessageNames(temp[1])
            setPreviousSession(true)

        } catch (error) {
            console.log(error)
        }
    }

    const newChatHandle = async (files: File[], messagename: string) => {
        // upload and get the array of file ids
        const token = "monu"
        const fileids = await uploadPdf(files)
        // handle and give file ids to downloading the files
        if (fileids) {
            setSubmitted(true)

            const msgid = generateRandomString(6)
            setMessageNames((prev) => { return [...prev, messagename] })
            setMessageIds((prev) => { return [...prev, msgid] })
            setCurrentSessionId(msgid)
            const uploadres = await uploadChatWithPdf(token, msgid, messagename, fileids)
            if (uploadres) {
                handleCurrentSessionMessages(fileids)
            }



        }



    }


    const handleCurrentSessionMessages = async (fileids: string[]) => {
        // call the backend to download the files and be ready
        let reslink = []
        for (let i = 0; i < fileids.length; i++) {
            const link = getDownloadLink(fileids[i])
            reslink.push(link.href)
        }
        const data = {
            "pdfid": currentSessionId,
            "downloadlink": reslink
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/uploadpdffiles", data)
            console.log(response)
            if (response.data) {
                //uploaded and downloaded file in backend
                setDOwnloaded(true)
            }

        } catch (error) {
            console.log(error)
        }


        try {
            const token = "monu"
            const msg = await getChatWithPdfMessages(token, currentSessionId)
            human = msg[0]
            ai = msg[1]
            //change in ui how to set ai and human messages
            setCurrentMessages(true)
        } catch (error) {
            console.log(error)
        }

    }

    const getids = async (token: string, currentSessionId: string) => {
        const fileids = await getFileIds(token, currentSessionId)
        handleCurrentSessionMessages(fileids)

    }
    useEffect(() => {
        const token = "monu"
        getting(token)
        if (previousSession) {
            setCurrentSessionId(messageids[-1])
            // get all file ids from thje tokenn and messageids
            getids(token, currentSessionId)
        }



    }, [setPreviousSession, setMessageIds, setMessageNames])

    const displayChat = () => {

        const user = []
        const ai = []



    }
    const handleSendMessage = async () => {

        console.log(inputText)
        if (inputText.trim() === '') return;
        setMessages((prevMessages => [...prevMessages, { "text": inputText, "fromUser": true }]));
        const post = {
            "length": 2,
            "question": inputText

        }
        console.log(messages)

        const response = await axios.post("http://127.0.0.1:5000/chatpdffiles", post)
        if (response.data.AI) {
            const res = response.data.AI
            setAiResponse(true)
            setMessages((prevMessages => [...prevMessages, { "text": inputText, "fromUser": false }]));
            console.log(`response from ai is ${res}`)

            // setMessages([...messages, { text: response.data, fromUser: false }]);
            setMessages((prv) => {
                return [...prv, { text: res, fromUser: false }]
            })

            // setMessages([...messages, { text: "AIIII", fromUser: false }]);

        }

        console.log(messages)

        // Simulate AI response (replace this with actual AI response logic)

    };

    const handlefiles = async(e:any) =>{
        e.preventDefault()
        

    }

    const onsubmit = async (files:File[]) => {

        console.log(files)

        // uploading to appwrite

        for (let i = 0; i < files.length; i++) {
            try {
                const res = await uploadPdf(files)
                console.log(res)

            } catch (error) {
                console.log(error)
            }

        }
        // sending the ndownloaD links to flask api
        // for (let i = 0; i < resid.length; i++) {
        //     const link = getDownloadLink(resid[i])
        //     reslink.push(link.href)
        // }

        // try {
        //     const response = await axios.post("http://127.0.0.1:5000/uploadpdffiles", reslink)
        //     console.log(response)
        //     if (response.data) {
        //         setSubmitted(true)

        //     }

        // } catch (error) {
        //     console.log(error)
        // }


    }


    return (
        <>

            <div className='w-full h-screen flex flex-row gap-2 md:px-40 px-3 bg-monu dark:text-white text-black '>
                {newchat && <div className='w-screen h-screen backdrop-blur-md bg-white/10 backdrop-brightness-50 absolute z-10 top-0 left-0 flex flex-col items-center justify-center'>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Create New Chat</CardTitle>
                            <CardDescription>Select one or more pdf</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlefiles} id='newchat'>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Enter name of chat" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">Pdf</Label>
                                        <Input id="pdf" placeholder='choose one or more pdf' multiple type='file' onChange={(e)=>{
                                            const files = e.target.files
                                            onsubmit(files)
                                        }} />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={()=>{
                                setNewChat(false)
                            }}>Cancel</Button>
                            <Button onClick={handlefiles} type='submit' >Submit</Button>
                        </CardFooter>
                    </Card>
                </div>
                }

                <div className='bg-blue-800 hidden p-4 md:w-1/3 md:flex md:flex-col gap-8 items-center  '>
<div className='bg-white mt-12 flex flex-row gap-3 p-2 w-full rounded-md backdrop-blur-md bg-white/30 text-xl justify-between items-center hover:bg-blue-300 hover:cursor-pointer' onClick={()=>{setNewChat(true)}} >
    <p>New Chat</p>
    <div><SquarePlus /></div>
</div>
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

                                return <div key={index} className=' flex w-full p-3 rounded-md justify-end items-center dark:text-white text-black text-base md:text-xl  '>AI :  {value.text}</div>
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

        </>
    )
}

export default chatwithpdf