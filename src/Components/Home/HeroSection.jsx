import React, { useEffect, useState } from "react";
import Api_Service from "../../Service/Api_Service";

export default function HeroSection() {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      Api_Service.GetData("movie/popular"),
      Api_Service.GetData("movie/top_rated"),
      Api_Service.GetData("movie/upcoming"),
    ]).then(([data1, data2, data3]) => {
      setRow1(data1.results.slice(0, 14));
      setRow2(data2.results.slice(0, 14));
      setRow3(data3.results.slice(0, 14));
      setLoading(false);
    });
  }, []);

  const movies1 = [...row1, ...row1];
  const movies2 = [...row2, ...row2];
  const movies3 = [...row3, ...row3];

  const posterUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w300${path}` : "/Image/no-poster.png";

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-12">
      {/* MOVIE ROW 1 */}
      <div className="relative z-10 w-full overflow-hidden px-2 sm:px-4">
        <div className="flex gap-3 sm:gap-4 md:gap-6 animate-[scrollLeft_50s_linear_infinite] w-fit">
          {movies1.map((movie, index) => (
            <div
              key={index}
              className="flex-none 
               w-32.5 h-48.75         
              sm:w-37.5 sm:h-56.25
              md:w-45 md:h-67.5
              lg:w-55 lg:h-82.5

              rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={posterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MOVIE ROW 2 */}
      <div className="relative z-10 w-full overflow-hidden px-2 sm:px-4">
        <div className="flex gap-3 sm:gap-4 md:gap-6 animate-[scrollLeft_45s_linear_infinite] w-fit">
          {movies2.map((movie, index) => (
            <div
              key={index}
              className="flex-none 
            w-32.5 h-48.75         
            sm:w-37.5 sm:h-56.25
            md:w-45 md:h-67.5
            lg:w-55 lg:h-82.5

              rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={posterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MOVIE ROW 3 */}
      <div className="relative z-10 w-full overflow-hidden px-2 sm:px-4">
        <div className="flex gap-3 sm:gap-4 md:gap-6 animate-[scrollLeft_60s_linear_infinite] w-fit">
          {movies3.map((movie, index) => (
            <div
              key={index}
              className="flex-none 
                  w-32.5 h-48.75         
            sm:w-37.5 sm:h-56.25
            md:w-45 md:h-67.5
            lg:w-55 lg:h-82.5
              rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={posterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CENTER OVERLAY */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 sm:px-6 md:px-8 
      bg-linear-to-r from-black/85 via-black/70 to-black/85"
      >
        <div className="max-w-4xl w-full">
          {/* Logo */}
          <div className="mb-16 sm:mb-10 md:mb-16 lg:mb-20 flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD0Aq7WzGMovaRbhXkAI6bZNi8xfgkXzNEAQ&s"
              alt="Logo"
              className="h-50 sm:h-16 md:h-24 lg:h-72 object-contain"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 lg:mb-40 tracking-tight text-white leading-tight">
            The Best Streaming Experience
          </h1>
        </div>
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .animate-\[scrollLeft_50s_linear_infinite\] {
            animation: scrollLeft 35s linear infinite;
          }
          .animate-\[scrollLeft_45s_linear_infinite\] {
            animation: scrollLeft 30s linear infinite;
          }
          .animate-\[scrollLeft_60s_linear_infinite\] {
            animation: scrollLeft 40s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
