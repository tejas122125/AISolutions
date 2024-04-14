import React from 'react'
import * as XLSX from 'xlsx';
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

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


const Chatwithcsv = () => {
    const form = useForm()
    const [viewdata, setViewData] = useState<boolean>(false)

    const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [newchat, setNewChat] = useState<boolean>(true)

    // submit state
    const [excelData, setExcelData] = useState<unknown[] | null>(null);

    // onchange event
    const handleFile = (e: any) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
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

    // submit event
    const handleFileSubmit = (e: any) => {
        setNewChat(false)

        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data)
            setViewData(true)
            setExcelData(data.slice(0, 10));
        }
    }

    return (
        <div className="wrapper">

            <h3>Upload & View Excel Sheets</h3>

            {/* form */}
            {/* <form className="form-group custom-form" onSubmit={handleFileSubmit}>
      <input type="file" className="form-control" required onChange={handleFile} />
      <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
      {typeError&&(
        <div className="alert alert-danger" role="alert">{typeError}</div>
      )}
    </form> */}

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

            {viewdata && <div className='w-screen h-screen backdrop-blur-md bg-white/10 backdrop-brightness-50 absolute z-10 top-0 left-0 flex flex-col items-center justify-center '>
         
                    <div className='bg-purple-400 w-3/4
                    h-3/4 overflow-scroll p-2'>
                
                        {excelData ? (
                            <div className='w-full p-2 bg-green-300' >
                                <table className='p-2 bg-blue-400 w-full rounded-md'>

                                    <thead className=' rounded-md '>
                                        <tr>
                                            {Object.keys(excelData[0]).map((key,index)=>{
                                                if(index %2 == 0 ){
                                                    return  <th className='bg-slate-200 p-2  ' key={key}>{key}</th>
                                                }
                                                else{
                                                    return  <th  className='bg-slate-400 p-2 ' key={key}>{key}</th>
                                                }

                                            })}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {excelData.map((individualExcelData, index) => (
                                            <tr key={index}>
                                                {Object.keys(individualExcelData).map((key,index) => {
                                                    if
return  <td key={key}>{individualExcelData[key]}</td>
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


            {/* view data */}
            <div className="viewer">
                {excelData ? (
                    <div className="table-responsive">
                        <table className="table">

                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {excelData.map((individualExcelData, index) => (
                                    <tr key={index}>
                                        {Object.keys(individualExcelData).map((key) => (
                                            <td key={key}>{individualExcelData[key]}</td>
                                        ))}
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
    )
}

export default Chatwithcsv