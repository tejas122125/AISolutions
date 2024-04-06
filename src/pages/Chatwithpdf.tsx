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
import { useForm } from "react-hook-form"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const chatwithpdf = () => {
    const token = "monu"
    const test = [
        "apple",
        "banana",
        "orange",
        "kiwi",
        "grape",
        "pear",
        "pineapple",
        "strawberry",
        "blueberry",
        "watermelon",
        "mango",
        "peach",
        "cherry",
        "lemon",
        "lime",
        "coconut",
        "raspberry",
        "blackberry",
        "plum",
        "apricot"
      ]
    let human = []
    let ai = []
    const [newchat, setNewChat] = useState<boolean>(false)
    
    const [pdffiles, sePdftFiles] = useState<File[]>([])
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
        console.log("second")
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
        console.log("fourth")
        // upload and get the array of file ids
        const token = "monu"
        console.log(files)
        const fileids = await uploadPdf(files)
        console.log(fileids)
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
        console.log("first")
        getting(token)
        if (previousSession) {
            console.log("thitrd")
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

    const handlefiles = async (e: any) => {
        e.preventDefault()


    }
    let msgname = ""
    let pdffile: any = []
    const onSubmit = async (values: any) => {
        newChatHandle(pdffile, values.chatname)
        // console.log("first")
        // console.log(values)
        // console.log(pdffile)

        // uploading to appwrite

        // for (let i = 0; i < files.length; i++) {
        //     try {
        //         const res = await uploadPdf(files)
        //         console.log(res)

        //     } catch (error) {
        //         console.log(error)
        //     }

        // }
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
    const form = useForm()
    return (
        <>

            <div className='w-full h-screen flex flex-row gap-2 md:px-40 px-3 bg-monu dark:text-white text-black '>
                {newchat && <div className='w-screen h-screen backdrop-blur-md bg-white/10 backdrop-brightness-50 absolute z-10 top-0 left-0 flex flex-col items-center justify-center'>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle className='text-xl text-center text'> Create New Chat</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="chatname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Chatname</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter the name of chat" {...field} required />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pdffiles"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pdf-Files</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Select one or more pdfs" {...field} type='file' required multiple onChange={(e: any) => {
                                                        pdffile = e.target.files
                                                    }} />
                                                </FormControl>
                                                <FormDescription>
                                                    Select one or more pdf documents
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={() => {
                                            setNewChat(false)
                                        }}>Cancel</Button>
                                        <Button type='submit'  >Submit</Button>

                                    </CardFooter>
                                </form>
                            </Form>
                        </CardContent>

                    </Card>
                </div>
                }

                <div className='bg-blue-800 hidden px-1 md:w-1/3 md:flex md:flex-col gap-8 items-center  '>
                    <div className='bg-white mt-12 flex flex-row gap-3 p-2 w-full rounded-md backdrop-blur-md bg-white/30 text-xl justify-between items-center hover:bg-blue-300 hover:cursor-pointer' onClick={() => { setNewChat(true) }} >
                        <p>New Chat</p>
                        <div><SquarePlus /></div>
                    </div>
                    <h3 className='text-2xl bg-slate-500 w-full text-center p-2 rounded-md mt-11' id='previous-session'>Previous Sesions</h3>
 
                    <div className='0 w-full flex flex-col items-center md:gap-4 gap-2 h-full  overflow-y-scroll  overflow-x-hidden'>
                        {messageNames.map((value,index)=>{
                            return <button id='previous-session-list' key={index} className=' w-full md:mt-4 mt-4 transition-transform duration-300 transform  hover:scale-110  backdrop-blur-md bg-slate-200/60 rounded-xl p-2 hover:font-semibold text-center hover:bg-green-500/50' onClick={async()=>{
                                const name =  value;
                                const id = messageids[messageNames.indexOf(name)]
                                const ids = await getFileIds(token,id)
                                handleCurrentSessionMessages(ids)
                            }} >{value}</button>
                        })}
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