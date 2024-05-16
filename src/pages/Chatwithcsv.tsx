import React, { useEffect } from 'react'
import { MessageCircleX } from 'lucide-react';
import * as XLSX from 'xlsx';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import fs from 'fs';
import { CSVReader } from 'react-papaparse';
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
import DownloadFile from '@/components/downloadfile';
import { SquarePlus } from 'lucide-react';
import axios from 'axios';
import { getAllChatWithCsv, getChatWithCsvMessages, getCsvDownloadLink, getCsvFileId, uploadChatWithCsv, uploadCsv } from '@/utils/appwrite/functions';
import { generateRandomString } from '@/utils/general';



const Chatwithcsv = () => {
    const [csvFile,setCsvFile] =  useState<File|null>(null)

    const form = useForm()
    const token = "monu"
    const addurl ="&mode=admin"
    const [filelength, setFileLength] = useState<Number>(0)
    const [newchat, setNewChat] = useState<boolean>(false)
    const [ai, setai] = useState<string[]>([])
    const [human, sethuman] = useState<string[]>([])
    const [downloaded, setDownloaded] = useState<boolean>(false)
    const [currentMessages, setCurrentMessages] = useState<boolean>(false)
    const [previousSession, setPreviousSession] = useState<boolean>(false)
    const [messageids, setMessageIds] = useState<string[]>([])
    const [messageNames, setMessageNames] = useState<string[]>([])
    const [currentSessionId, setCurrentSessionId] = useState<string>("")
const [count , setcount] =useState(0)

    const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([{ text: "dfvhdvfvfhgv", fromUser: false }]);
    const [inputText, setInputText] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [airesponse, setAiResponse] = useState<boolean>(false)
    const [viewdata, setViewData] = useState<boolean>(false)
    const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
  
    // submit state
    const [excelData, setExcelData] = useState<unknown[] | null>(null);



    // onchange event



    const handleFile = async (e: any) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        setCsvFile(selectedFile)
        console.log(selectedFile)
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    const handleFileSubmit = (data: any) => {

console.log("tesdting zod",data)

        setNewChat(false)
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setViewData(true)
            setExcelData(data);
        }
    }

// refine from herre

const getting = async (token: string) => {
    console.log("second")
    try {

        const temp = await getAllChatWithCsv(token)
        if (temp[0].length > 0){
        setPreviousSession(true)
        setMessageIds(temp[0])
        setMessageNames(temp[1])
        }
       
        // const  curr = temp[0][temp[0].length - 1]
        console.log("session ids",currentSessionId)
        // getids(token, currentSessionId)
    } catch (error) {
        console.log(error)
    }
}


const newChatHandle = async (file: File, messagename: string) => {
    console.log("fourth")
    // upload and get the array of file ids
    console.log(file)
    const fileids = await uploadCsv(file)
    console.log("uploaded",fileids)
    // handle and give file ids to downloading the files

        setSubmitted(true)
        const msgid = generateRandomString(6)
        setMessageNames((prev) => { return [...prev, messagename] })
        setMessageIds((prev) => { return [...prev, msgid] })
        // setCurrentSessionId(msgid)
        const uploadres = await uploadChatWithCsv(token, msgid, messagename, fileids!)
      
            handleCurrentSessionMessages(fileids!, msgid)
}

const handleCurrentSessionMessages = async (fileid: string, currid: string) => {
    // call the backend to download the files and be ready
    // setFileLength(fileids.length)
    let reslink = ""

        const link = getCsvDownloadLink(fileid)
        reslink = `${link.href}${addurl}`
    
    const data = {
        "fileid": currid,
        "downloadlink": reslink
    }
    console.log("download data to downloadcsv is",data)

    try {
        const response = await axios.post("http://127.0.0.1:6000/downloadcsv", data)
        console.log("tejasweebackend",response)
        if (response.data) {
            setDownloaded(true)
        }

    } catch (error) {
        console.log(error)
    }


    try {
        const msg = await getChatWithCsvMessages(token, currid)
        console.log(msg)
        sethuman(msg[0])
        setai(msg[1])

        setCurrentMessages(true)
    } catch (error) {
        console.log(error)
    }

}


const getids = async (token: string, currssid: string) => {
    const fileid = await getCsvFileId(token, currssid)
    console.log("tejas", currssid)
    console.log(fileid)
    handleCurrentSessionMessages(fileid[0], currssid)

}

const handleSendMessage = async () => {


    if (inputText.trim() === '') return;
    
    const post = {
        "length": filelength,
        "question": inputText,
        "fileid": currentSessionId

    }
console.log("sending meshv ",post)
    const response = await axios.post("http://127.0.0.1:5000/chatpdffiles", post)
    if (response.data.AI) {
        const res = response.data.AI
        setAiResponse(true)
        setai((prevMessages => [...prevMessages, res]));
        sethuman((prevMessages => [...prevMessages, inputText]));

        console.log(`response from ai is ${res}`)

        // setMessages([...messages, { text: response.data, fromUser: false }]);
        // setMessages((prv) => {
        //     return [...prv, { text: res, fromUser: false }]
        // })

        // setMessages([...messages, { text: "AIIII", fromUser: false }]);

    }

    console.log(messages)

    // Simulate AI response (replace this with actual AI response logic)

};

// const onSubmit = async (values: any) => {
//     setNewChat(false)
//     newChatHandle(pdffile, values.chatname)
// }



    useEffect(() => {
    
          
        if (previousSession && messageids.length >0){
            setCurrentSessionId(messageids[messageids.length - 1])
            console.log("sid",currentSessionId)
            if (count<2){
            getids(token,currentSessionId)

            }

            setcount(prev => prev+1)

        }


        if (count == 0){
            getting(token)
        }
        
    }, [messageids])

    return (
        <div className='w-full h-screen flex flex-row gap-2 md:px-40 px-3 bg-monu dark:text-white text-black'>

            {newchat && <div className='w-screen h-screen backdrop-blur-md bg-white/10 backdrop-brightness-50 absolute z-10 top-0 left-0 flex flex-col items-center justify-center'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className='text-xl text-center text'> Create New Chat</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleFileSubmit)} className="space-y-8">
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
                                    name="csvfile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pdf-Files</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Select Only CSV file" {...field} type='file' required onChange={handleFile} />
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

                {previousSession && <div className='0 w-full flex flex-col items-center md:gap-4 gap-2 h-full  overflow-y-scroll  overflow-x-hidden'>
                    {[...messageNames].reverse().map((value, index) => {
                        return <button id='previous-session-list' key={index} className=' w-full md:mt-4 mt-4 transition-transform duration-300 transform  hover:scale-110  backdrop-blur-md bg-slate-200/60 rounded-xl p-2 hover:font-semibold text-center hover:bg-green-500/50' onClick={async () => {
                            const name = value;
                            const id = messageids[[...messageNames].reverse().indexOf(name)]
                            console.log("clicked", id)
                            const ids = await getCsvFileId(token, id)
                            handleCurrentSessionMessages(ids, id)
                        }} >{value}{messageids[index]}</button>
                    })}
                </div>}

            </div>

            <div className='bg-purple-800 w-full h-full p-2 relative'>

                    <div className="flex flex-col  h-full w-full relative overflow-y-scroll">
                        {human.map((value, index) => {
                            return <div className='w-full h-fit flex-col flex bg-blue-400'> <div key={index} className=' mt-2 md:mt-7 flex w-full p-3 rounded-md justify-start items-center bg-white dark:text-white text-black text-base md:text-xl  '>User :  {value}</div>

                                <div key={index + 1} className=' flex w-full p-3 rounded-md justify-end items-center dark:text-white text-black text-base md:text-xl  '>AI :  {ai[index]}</div>
                            </div>

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

            {/* view data */}
            {viewdata && <div className='w-screen h-screen backdrop-blur-md bg-white/10 backdrop-brightness-50 absolute z-10 top-0 left-0 flex flex-col items-center justify-center '>
<div className='absolute top-10 right-56    ' onClick={()=>{
    setViewData(false)
}}   >
   <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></div>
                <div className=' w-3/4
                    h-3/4  p-2  '>

                    {excelData ? (
                        <div className=' h-full overflow-y-scroll rounded-md border-4 border-blue-500'>
                            <table className='p-2 w-full rounded-md  h-full '>

                                <thead className=' sticky top-0 rounded-md z-10'>
                                    <tr>
                                        {Object.keys(excelData[0]).map((key, index) => {
                                            if (index % 2 == 0) {
                                                return <th className='bg-slate-200 p-2  ' key={key}>{key}</th>
                                            }
                                            else {
                                                return <th className='bg-slate-50 p-2 ' key={key}>{key}</th>
                                            }

                                        })}
                                    </tr>
                                </thead>

                                <tbody className=' '>
                                    {excelData.map((individualExcelData, index) => (
                                        <tr key={index}>
                                            {Object.keys(individualExcelData).map((key, index) => {
                                                // console.log(individualExcelData[key])
                                                if (index % 2 == 0) {
                                                    return <td className='p-1 text-center bg-blue-200' key={key}>{individualExcelData[key]}</td>
                                                }
                                                else {
                                                    return <td className='p-1 text-center bg-blue-300' key={key}>{individualExcelData[key]}</td>
                                                }

                                            }

                                            )}
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                    ) : (
                        <div>No File is uploaded yet!</div>
                    )}




                </div>

            </div>

            }





        </div>
    )
}

export default Chatwithcsv