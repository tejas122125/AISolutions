import React from 'react'
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



const Chatwithcsv = () => {
    const form = useForm()
    const [viewdata, setViewData] = useState<boolean>(false)

    const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [newchat, setNewChat] = useState<boolean>(false)
    // submit state
    const [excelData, setExcelData] = useState<unknown[] | null>(null);

    const docs = [
        {
            uri: "https://cloud.appwrite.io/v1/storage/buckets/660e8aa1521417614a44/files/661d72c884fc3d119c93/view?project=660e8a4baeaf25149b31&mode=admin"

        },
    ]


    // onchange event

const dnld  =  async ()=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}


    const handleFile = async (e: any) => {
        let blob;
        try {
            const res = await fetch("https://cloud.appwrite.io/v1/storage/buckets/660e8aa1521417614a44/files/661d72c884fc3d119c93/view?project=660e8a4baeaf25149b31&mode=admin")
            blob = await res.blob()
            console.log(blob)

        } catch (error) {
            console.log(error)
        }
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        // let selectedFile = e.target.files[0];
        let selectedFile = blob;
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

    const handleFileSubmit = (e: any) => {
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

    return (
        <div>
           
            <DownloadFile/>
           
            <h3>Upload & View Excel Sheets</h3>



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
            {/* view data */}
            {viewdata && <div className='w-screen h-screen backdrop-blur-md bg-white/10 backdrop-brightness-50 absolute z-10 top-0 left-0 flex flex-col items-center justify-center '>

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
                                                console.log(individualExcelData[key])
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