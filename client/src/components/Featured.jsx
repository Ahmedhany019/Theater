import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

function Featured() {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 lg:px-36 xl:px-44 overflow-hidden">
      <div className="flex items-center justify-between mb-10 pt-20 relative">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => {navigate('/movies');scrollTo(0,0)}}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          View All{" "}
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
        </button>
      </div>
      <div className="flex flex-wrap max-sm:justify-center justify-between gap-8 mt-8">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
      <div className="mt-20 flex justify-center">
        <button
          onClick={() => {
            scrollTo(0, 0);
            navigate("/movies");
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull 
            transition rounded-md font-medium cursor-pointer"
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default Featured;
