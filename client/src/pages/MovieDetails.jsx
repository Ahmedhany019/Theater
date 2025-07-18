/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

function MovieDetails() {

  const {id} = useParams()
  const [show, setShow] = useState(null)

  const navigate = useNavigate()

  const getShow = async ()=>{
    const movie = dummyShowsData.find((movie) => movie._id === id)
    if(movie){
      setShow({movie, dateTime: dummyDateTimeData})
    }
  }

  useEffect(() => {
    getShow()
  }, [id])


  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50 overflow-hidden'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

        <img src={show.movie.poster_path} alt={show.movie.title} className='max-md:mx-auto
        rounded-xl h-104 max-w-70 object-cover' />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left="-100px"/>
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-200'>
            <StarIcon className='w-5 h-5 text-primary fill-primary'/>
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
          <p>{timeFormat(show.movie.runtime)} • {show.movie.genres.map((genre) => genre.name).join(", ")} • {show.movie.release_date.split("-")[0]}</p>
          <div className='flex items-center gap-4 flex-wrap mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5'/>
              Watch Trailer
              </button>
            <a href="#dataSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
            <button className='bg-gray-700 p-2.5 rounded-full font-medium cursor-pointer active:scale-95'>
              <Heart className='w-5 h-5'/>
            </button>
          </div>
        </div>
      </div>
      <p className='mt-20 text-lg font-medium'>Your Favorite Cast</p>
      <div className='no-scrollbar overflow-x-scroll mt-8 pb-4'>
       <div className='flex items-center gap-4 w-max px-4'>
        {show.movie.casts.slice(0, 12).map((cast,i) => (
            <div key={i} className='flex flex-col items-center text-center'>
              <img src={cast.profile_path} alt={cast.name} className=' h-20 rounded-full object-cover aspect-square'/>
              <p className='text-xs font-medium mt-3'>{cast.name}</p>
            </div>
          ))}
       </div>
      </div>
      <DateSelect dateTime={show.dateTime} id={id}/>
      <p className='mt-20 text-lg font-medium mb-8'>You may Also Like</p>
      <div className='flex flex-wrap gap-8 max-sm:justify-center'>
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
      <div className='mt-20 flex justify-center'>
      <button onClick={()=>{navigate('/movies');scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull
      transition rounded-md font-medium cursor-pointer active:scale-95'>Show more</button>

      </div>
    </div>
  ) : (
    <Loading/>
  )
}

export default MovieDetails