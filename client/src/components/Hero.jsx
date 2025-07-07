import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Hero() {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center h-[100vh] bg-[url(/backgroundImage.png)] bg-cover bg-center gap-4 px-6 md:px-16 lg:px-36'>
      <img src={assets.marvelLogo} alt="marvelLogo" className='max-h-11 lg:h-11 mt-20' />
      <h1 className='text-5xl leading-18 font-semibold max-w-110'>Guardians <br />of the Galaxy</h1>
      <div className='flex items-center text-gray-300 gap-4'>
        <span className='text-[20px]'>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
          <p className='flex items-center gap-2'><Calendar /> 2024</p>
        </div>
        <div className='flex items-center gap-1'>
          <p className='flex items-center gap-2'> <Clock /> 4.5</p>
        </div>
      </div>
      <p className='max-w-md text-gray-400'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
      <button onClick={() => {navigate('/movies');scrollTo(0,0)}} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Explore Now <ArrowRight /></button>
    </div>
  )
}

export default Hero