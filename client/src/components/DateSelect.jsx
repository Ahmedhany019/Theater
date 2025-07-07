/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function DateSelect({dateTime,id}) {

    const [selectedDate, setSelectedDate] = useState(null)

    const navigate = useNavigate()

    const onBookHandler = ()=>{
        if(!selectedDate){
            Toast("Please select a date")
        }else{
            navigate(`/movies/${id}/${selectedDate}`)
        }
    }

    return (
    <div id='dataSelect' className='pt-30'>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 
        relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
            <BlurCircle top="-100px" left="-100px"/>
            <BlurCircle top="100px" left="0px"/>
            <div>
                <p className='text-lg font-semibold'>Choose Date</p>
                <div className='flex items-center gap-6 text-sm mt-5'>
                    <ChevronLeftIcon width={28}/>
                    <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                        {Object.keys(dateTime).map((date)=>(
                            <button key={date} className={`flex flex-col items-center 
                            justify-center h-14 w-14 aspect-square rounded cursor-pointer
                            ${selectedDate === date ? "bg-primary text-white" : "border border-primary"}`}
                            onClick={()=>setSelectedDate(date)}>
                                <span>{new Date(date).getDate()}</span>
                                <span>{new Date(date).toLocaleDateString("en-US",{month:"long"})}</span>
                            </button>
                        ))}
                    </span>
                    <ChevronRightIcon width={28}/>
                </div>
            </div>
            <button onClick={()=>{onBookHandler();scrollTo(0,0)}} className='px-10 py-3 text-sm
             bg-primary hover:bg-primary-dull transition rounded-md 
             font-medium cursor-pointer active:scale-95'>Book Now</button>
        </div>
    </div>
  )
}

export default DateSelect