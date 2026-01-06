import React, { useEffect, useState } from "react";
import Api_Service from "../../Service/Api_Service";

export default function HeroSection() {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);

  useEffect(() => {
    Api_Service.GetData("movie/popular").then((data) => {
      setRow1(data.results.slice(0, 14));
    });

    Api_Service.GetData("movie/top_rated").then((data) => {
      setRow2(data.results.slice(0, 14));
    });

    Api_Service.GetData("movie/upcoming").then((data) => {
      setRow3(data.results.slice(0, 14));
    });
  }, []);

  const movies1 = [...row1, ...row1];
  const movies2 = [...row2, ...row2];
  const movies3 = [...row3, ...row3];

  const posterUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w300${path}` : "/Image/no-poster.png";

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden flex flex-col justify-center gap-8 py-12">
      {/* MOVIE ROW 1 */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="flex gap-6 animate-[scrollLeft_50s_linear_infinite] w-fit">
          {movies1.map((movie, index) => (
            <div
              key={index}
              className="flex-none w-[150px] h-[225px] 
              md:w-[180px] md:h-[270px] 
              rounded-xl overflow-hidden shadow-xl"
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
      <div className="relative z-10 w-full overflow-hidden">
        <div className="flex gap-6 animate-[scrollLeft_45s_linear_infinite] w-fit">
          {movies2.map((movie, index) => (
            <div
              key={index}
              className="flex-none w-[150px] h-[225px] 
              md:w-[180px] md:h-[270px] 
              rounded-xl overflow-hidden shadow-xl"
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
      <div className="relative z-10 w-full overflow-hidden">
        <div className="flex gap-6 animate-[scrollLeft_60s_linear_infinite] w-fit">
          {movies3.map((movie, index) => (
            <div
              key={index}
              className="flex-none w-[150px] h-[225px] 
              md:w-[180px] md:h-[270px] 
              rounded-xl overflow-hidden shadow-xl"
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
        className="absolute inset-0 z-20 flex items-center justify-center text-center px-8 
      bg-gradient-to-r from-black/85 via-black/70 to-black/85"
      >
        <div className="max-w-4xl">
          <div className="mb-[50px] flex justify-center ">
            <img
              src="/public/Image/Abstract Design.png"
              alt="Logo"
              className="h-14 md:h-75"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-40 tracking-tight text-white">
            The Best Streaming Experience
          </h1>
        </div>
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
