import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
function Favorite() {
  return dummyShowsData.length > 0 ?( 
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44
    overflow-hidden min-h-[80vh]'>
      <BlurCircle top="150px" right="0px" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className='text-lg font-medium my-4'>All My Favorite</h1>
      <div className='flex flex-wrap gap-8 max-sm:justify-center'>
        {dummyShowsData.map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
    </div>
  ):
  (
    <div className='flex items-center justify-center h-[80vh]'>no movies found</div>
  )
}

export default Favorite