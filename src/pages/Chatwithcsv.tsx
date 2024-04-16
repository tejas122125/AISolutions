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
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguMywgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy/H5lhTAAAACXBIWXMAAA9hAAAPYQGoP6dpAAA1lklEQVR4nO3deVyVZf7/8fdBVkVAUUEShBTFZbSiJNospcjMcaG+ufQVHdvRVPQ76XcmzWrCydFscWmqgZo0yyktW3QMlTY1Qx0tRzNTUVlcSjYFEe7fH/08305g4wKc5Xo9H4/7Eee6r3Odz31J8va6F2yWZVkCAACAMbycXQAAAAAaFwEQAADAMARAAAAAwxAAAQAADEMABAAAMAwBEAAAwDAEQAAAAMMQAAEAAAxDAAQAADAMARAAAMAwBEAAAADDEAABAAAMQwAEAAAwDAEQAADAMARAAAAAwxAAAQAADEMABAAAMAwBEAAAwDAEQAAAAMMQAAEAAAxDAAQAADAMARAAAMAwBEAAAADDEAABAAAMQwAEAAAwDAEQAADAMARAAAAAwxAAAQAADEMABAAAMAwBEAAAwDAEQAAAAMMQAAEAAAxDAAQAADAMARAAAMAwBEDAcOvWrZPNZtO6deucXUqDeuyxx2Sz2ep93H379slmsykrK6vexwaAhkIABDxUVlaWbDabffP391enTp00duxYFRUVObu8enEmvP7jH/+otzFHjRqlwMDAs+632WwaO3bsRX/O/PnzCY0AnMbb2QUAaFiPP/64YmJiVFFRoc8++0wLFizQhx9+qK+//lpNmzZ1dnlur3379jp58qR8fHzO633z589Xq1atNGrUqIYpDAB+BQEQ8HD9+vXTlVdeKUm65557FBoaqjlz5ujdd9/VsGHDnFzdf1ZeXq5mzZo5u4yzOrO66m5OnDjBPwAAg3EKGDBMnz59JEl79+49a59PP/1Ud955p6KiouTn56fIyEhNnDhRJ0+etPfJzMyUzWbTli1bar3/qaeeUpMmTXTo0CF728aNG3XrrbcqODhYTZs2Ve/evfX55587vO/MdXo7duzQ8OHD1aJFC1133XXnfYyfffaZrrrqKvn7+6tDhw568cUXz3uMc1XXNYCFhYUaPXq02rVrJz8/P7Vt21YDBw7Uvn37JEnR0dH65ptvlJOTYz9Ff+ONN9rf//333+vOO+9Uy5Yt1bRpU1199dX64IMPan32/v379dvf/lbNmjVTmzZtNHHiRK1atarWNZ033nijunfvrtzcXN1www1q2rSp/vd//1eS9O6776p///6KiIiQn5+fOnTooCeeeELV1dUOn3VmjG3btql3795q2rSpOnbsaD/9npOTo4SEBAUEBKhz5876+OOP62eCATQIVgABw+zZs0eSFBoaetY+S5cu1YkTJ/Tggw8qNDRUX375pZ5//nkdPHhQS5culSTdcccdSktL06JFi3T55Zc7vH/RokW68cYbdckll0iS1qxZo379+ik+Pl7Tp0+Xl5eXMjMz1adPH3366afq1auXw/vvvPNOxcbG6qmnnpJlWed1fNu3b9ctt9yi1q1b67HHHtPp06c1ffp0hYWFndc4R48ePa/+P5eSkqJvvvlG48aNU3R0tA4fPqzVq1crLy9P0dHRmjt3rsaNG6fAwED94Q9/kCR7fUVFRbrmmmt04sQJPfzwwwoNDdWrr76q3/72t/rHP/6hwYMHS/ppZbRPnz4qKCjQ+PHjFR4ersWLF2vt2rV11nTs2DH169dPQ4cO1d13323/vKysLAUGBio9PV2BgYFas2aNpk2bppKSEs2aNcthjB9//FG33367hg4dqjvvvFMLFizQ0KFDtWjRIk2YMEEPPPCAhg8frlmzZumOO+7QgQMH1Lx58wueRwANyALgkTIzMy1J1scff2wdOXLEOnDggLVkyRIrNDTUCggIsA4ePGhZlmWtXbvWkmStXbvW/t4TJ07UGi8jI8Oy2WzW/v377W3Dhg2zIiIirOrqanvb5s2bLUlWZmamZVmWVVNTY8XGxlrJyclWTU2Nw2fExMRYN998s71t+vTpliRr2LBh53SMZ2pfunSpvW3QoEGWv7+/Q507duywmjRpYp3LX3mpqamWpF/d0tLS7P337t3rcLw//vijJcmaNWvWr35Ot27drN69e9dqnzBhgiXJ+vTTT+1tpaWlVkxMjBUdHW2f69mzZ1uSrOXLl9v7nTx50oqLi6v159m7d29LkrVw4cJan1fXn/X9999vNW3a1KqoqKg1xuLFi+1tO3futCRZXl5e1oYNG+ztq1atcpgTAK6HU8CAh0tKSlLr1q0VGRmpoUOHKjAwUMuWLbOvztUlICDA/nV5ebmOHj2qa665RpZlOZzyHTlypPLz8x1WnRYtWqSAgAClpKRIkrZu3ardu3dr+PDhOnbsmI4ePaqjR4+qvLxcffv21SeffKKamhqHz3/ggQcu6Firq6u1atUqDRo0SFFRUfb2Ll26KDk5+ZzH8ff31+rVq+vc/pOAgAD5+vpq3bp1+vHHH8/7GD788EP16tXL4dR3YGCg7rvvPu3bt087duyQJK1cuVKXXHKJfvvb3zrUfe+999Y5rp+fn0aPHl1nvWeUlpbq6NGjuv7663XixAnt3LnToW9gYKCGDh1qf925c2eFhISoS5cuSkhIsLef+fr7778/n0MH0Ig4BQx4uHnz5qlTp07y9vZWWFiYOnfuLC+vX/+3X15enqZNm6b33nuvVogpLi62f33zzTerbdu2WrRokfr27auamhq98cYbGjhwoP3U3+7duyVJqampZ/284uJitWjRwv46JibmvI9Tko4cOaKTJ08qNja21r7OnTvrww8/PKdxmjRpoqSkpAuqwc/PT3/+8581adIkhYWF6eqrr9btt9+ukSNHKjw8/D++f//+/Q5h6owuXbrY93fv3l379+9Xhw4daj3bsGPHjnWOe8kll8jX17dW+zfffKM//vGPWrNmjUpKShz2/fzPWpLatWtX6/OCg4MVGRlZq03SBQVgAI2DAAh4uF69etnvAj4X1dXVuvnmm/XDDz/okUceUVxcnJo1a6ZDhw5p1KhRDqt1TZo00fDhw/XSSy9p/vz5+vzzz5Wfn6+7777b3udM/1mzZumyyy6r8zN/+dy9n69KuaMJEyZowIABWr58uVatWqVHH31UGRkZWrNmTa3rJRtLXXN6/Phx9e7dW0FBQXr88cfVoUMH+fv7a/PmzXrkkUdqrcw2adKkzrHP1m6d5/WbABoPARCAg+3bt+vbb7/Vq6++qpEjR9rbz3b6c+TIkZo9e7ZWrFihjz76SK1bt3Y43dqhQwdJUlBQ0AWvqp2r1q1bKyAgwL7q+HO7du1q0M/+pQ4dOmjSpEmaNGmSdu/ercsuu0yzZ8/W66+/Lkln/a0k7du3r7PWM6dj27dvb//vjh07ZFmWw1jffffdOde4bt06HTt2TO+8845uuOEGe/uv3SEOwDNwDSAAB2dWc36+emNZlp599tk6+/fo0UM9evTQyy+/rLfffltDhw6Vt/f//dsyPj5eHTp00F/+8heVlZXVev+RI0fqtfbk5GQtX75ceXl59vZ///vfWrVqVb19zq85ceKEKioqHNo6dOig5s2bq7Ky0t7WrFkzHT9+vNb7b7vtNn355Zdav369va28vFx//etfFR0dra5du0qSkpOTdejQIb333nv2fhUVFXrppZfOuda6/qxPnTql+fPnn/MYANwTK4AAHMTFxalDhw6aPHmyDh06pKCgIL399tu/ej3XyJEjNXnyZElyOP0rSV5eXnr55ZfVr18/devWTaNHj9Yll1yiQ4cOae3atQoKCtKKFSvqrf4ZM2Zo5cqVuv766/XQQw/p9OnTev7559WtWzdt27at3j7nbL799lv17dtX//Vf/6WuXbvK29tby5YtU1FRkcMNFPHx8VqwYIGefPJJdezYUW3atFGfPn00ZcoUvfHGG+rXr58efvhhtWzZUq+++qr27t2rt99+23795v33368XXnhBw4YN0/jx4+3XYp55KPW5/N7ja665Ri1atFBqaqoefvhh2Ww2/f3vf+fULWAAAiAABz4+PlqxYoUefvhhZWRkyN/fX4MHD9bYsWPVs2fPOt8zYsQIPfLII+rQoUOtZ/pJPz1EeP369XriiSf0wgsvqKysTOHh4UpISND9999fr/X36NFDq1atUnp6uqZNm6Z27dppxowZKigoaJQAGBkZqWHDhik7O1t///vf5e3trbi4OL311lv2O6Mladq0adq/f7+efvpplZaWqnfv3urTp4/CwsL0xRdf6JFHHtHzzz+viooK9ejRQytWrFD//v3t7z/zzL5x48bp2WefVWBgoEaOHKlrrrlGKSkp5/TbSUJDQ/X+++9r0qRJ+uMf/6gWLVro7rvvVt++fc/rrmkA7sdm8U89ABfp6NGjatu2raZNm6ZHH33U2eUYbe7cuZo4caIOHjz4q4/6AWA2rgEEcNGysrJUXV2t//7v/3Z2KUb5+a/mk366BvDFF19UbGws4Q/Ar+IUMIALtmbNGu3YsUN/+tOfNGjQIEVHRzu7JKMMGTJEUVFRuuyyy1RcXKzXX39dO3fu1KJFi5xdGgAXxylgABfsxhtv1BdffKFrr71Wr7/+OqtOjWzu3Ll6+eWXtW/fPlVXV6tr1676/e9/r7vuusvZpQFwcQRAAAAAw3ANIAAAgGEIgAAAAIYhAAIAABiGu4AvQk1NjfLz89W8efNzeuo+AABwPsuyVFpaqoiICPtv1zENAfAi5Ofn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" alt="not an image" />
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