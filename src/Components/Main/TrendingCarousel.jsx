import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api_Service from "../../Service/Api_Service";
import {
  FaStar,
  FaRegEye,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function TrendingCarousel({ title, url }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  const CARD_WIDTH = 224;
  const GAP = 20;
  const STEP = CARD_WIDTH + GAP;

  const GetApi = async () => {
    const response = await Api_Service.GetData(url);
    setMovies(response.results || []);
  };

  useEffect(() => {
    GetApi();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setCurrentIndex(Math.round(el.scrollLeft / STEP));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [STEP]);

  const scrollToIndex = (index) => {
    if (!movies.length) return;
    const clamped = Math.max(0, Math.min(index, movies.length - 1));
    setCurrentIndex(clamped);
    scrollRef.current.scrollTo({
      left: STEP * clamped,
      behavior: "smooth",
    });
  };

  const handlePrev = () =>
    scrollToIndex(currentIndex > 0 ? currentIndex - 1 : movies.length - 1);

  const handleNext = () =>
    scrollToIndex(currentIndex < movies.length - 1 ? currentIndex + 1 : 0);

  return (
    <div className="bg-black px-4 sm:px-8 py-16 pt-24 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {title}
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-red-600 to-red-500" />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="bg-gray-900 hover:bg-red-700 text-white rounded-full p-2 sm:p-3 transition cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-900 hover:bg-red-700 text-white rounded-full p-2 sm:p-3 transition cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 overflow-x-auto px-1 sm:px-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[180px] sm:min-w-[270px] w-[180px] sm:w-[260px] h-[260px] sm:h-[390px] cursor-pointer flex-shrink-0"
            onClick={() =>
              navigate(`/movies/${movie.id}`, { state: { movie } })
            }
          >
            {/* CARD */}
            <div
              className="
              relative h-full rounded-xl overflow-hidden group
              border-2 border-gray-600
              shadow-lg shadow-black/80
              hover:border-gray-400
              hover:shadow-2xl hover:shadow-black
              transition-all duration-300
            "
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder-poster.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* INFO */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-2 sm:p-3">
                <h2 className="text-white font-semibold text-xs sm:text-sm truncate mb-1">
                  {movie.title}
                </h2>

                <div className="flex justify-between text-gray-300 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-[10px] sm:text-xs" />
                    {movie.runtime
                      ? `${Math.floor(movie.runtime / 60)}h`
                      : "N/A"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegEye className="text-[10px] sm:text-xs" />
                    {movie.popularity?.toFixed(1) || "N/A"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
                    {movie.vote_average?.toFixed(1) || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
