import React, { useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ---------------- FETCH MOVIES ---------------- */
  useEffect(() => {
    Api_Service.GetData(url).then((res) => {
      setMovies(res?.results || []);
    });
  }, [url]);

  /* ---------------- SCROLL TRACK ---------------- */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      setCurrentIndex(Math.round(el.scrollLeft / 180));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (amount) => {
    scrollRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-black px-4 sm:px-8 py-16 pt-24">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            {title}
          </h1>
          <div className="h-1 w-16 bg-red-600" />
        </div>

        {/* ARROWS (hidden on mobile) */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={() => scrollBy(-400)}
            className="bg-gray-900 hover:bg-red-700 text-white rounded-full p-3"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scrollBy(400)}
            className="bg-gray-900 hover:bg-red-700 text-white rounded-full p-3"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* ================= SLIDER ================= */}
      <div
        ref={scrollRef}
        className="
          flex gap-4
          overflow-x-auto
          scrollbar-hide
          scroll-smooth
          snap-x snap-mandatory
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              snap-start shrink-0 cursor-pointer
              w-[130px] sm:w-[160px] md:w-[180px] lg:w-[220px]
            "
            onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}
          >
            {/* CARD */}
            <div
              className="
                relative
                h-[195px] sm:h-[240px] md:h-[270px] lg:h-[330px]
                rounded-xl overflow-hidden
                border border-gray-700
                hover:border-gray-400
                transition
                group
              "
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder-poster.png"
                }
                alt={movie.title}
                className="
                  w-full h-full object-cover
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />

              {/* INFO */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2">
                <h2 className="text-white text-xs sm:text-sm font-semibold truncate">
                  {movie.title}
                </h2>

                <div className="flex justify-between text-[10px] sm:text-xs text-gray-300 mt-1">
                  <span className="flex items-center gap-1">
                    <FaClock />
                    {movie.runtime
                      ? `${Math.floor(movie.runtime / 60)}h`
                      : "N/A"}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaRegEye />
                    {movie.popularity?.toFixed(1)}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
