/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import Toast from 'react-hot-toast'

function SeatLayout() {

  const navigate = useNavigate()

  const {id, date} = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  console.log(selectedSeats)
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id)
    if (show) {
      setShow({ movie: show, dateTime: dummyDateTimeData })
    }
  }
  
  const handleSeatSelect = (seatId) => {
    if(!selectedTime){
      return Toast("Please select time first")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 5){
      return Toast("You can select maximum 5 seats")
    }
    selectedSeats.includes(seatId) ? setSelectedSeats(prev => prev.filter((seat) => seat !== seatId))
    : setSelectedSeats(prev => [...prev,seatId])
    }

  const renderSeats = (row,count = 9) =>(
    <div key={row} className='flex flex-wrap items-center justify-center gap-2'>
      {Array.from({length:count},(_,i)=>{
        const seatId = `${row}${i + 1}`
        return(
          <button key={seatId} onClick={()=>handleSeatSelect(seatId)} 
          className={`w-8 h-8
            border border-primary/60 transition rounded cursor-pointer 
           ${selectedSeats.includes(seatId) && 'bg-primary text-white'}`}>
            {seatId}
          </button>
          
        )
      })}
    </div>
  )

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timing */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10
      h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className='flex flex-col gap-2 px-6'>
          {show.dateTime[date].map((dateTime,i) => (
            <div key={i} onClick={() => setSelectedTime(dateTime)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md 
            cursor-pointer transition ${selectedTime?.time === dateTime.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
              <ClockIcon className='w-5 h-5'/>
              <p className='text-sm'>{isoTimeFormat(dateTime.time)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Seat Layout */}
        <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
          <BlurCircle top="-100px" right="-100px"/>
          <BlurCircle bottom="0" right="0"/>
          <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
          <img src={assets.screenImage} alt="screen" />
          <p className="text-gray-200 text-sm mb-6">Screen Side</p>
          <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
            <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
              {groupRows[0].map((row)=>renderSeats(row))}
            </div>

            <div className='grid grid-cols-2 gap-11'>
              {groupRows.slice(1).map((group,i)=>(
                <div key={i}>
                  {group.map((row)=>renderSeats(row))}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => navigate("/my-bookings")} className='flex items-center 
          gap-1 px-10 py-3 rounded-full bg-primary mt-20 text-sm hover:bg-primary-dull transition cursor-pointer
          active:scale-95 font-medium'>
            Proceed to Checkout
            <ArrowRightIcon className='w-5 h-5'/>
          </button>
        </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout