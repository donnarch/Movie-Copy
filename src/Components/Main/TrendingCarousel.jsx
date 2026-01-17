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
  const scrollRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(160);

  const GAP = 16;

  /* ---------------- RESPONSIVE CARD WIDTH ---------------- */
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) setCardWidth(140); // mobile
      else if (window.innerWidth < 1024) setCardWidth(180); // tablet
      else setCardWidth(224); // desktop
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const STEP = cardWidth + GAP;

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

    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCurrentIndex(Math.round(el.scrollLeft / STEP));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [STEP]);

  const scrollToIndex = (index) => {
    if (!movies.length) return;

    const max = movies.length - 1;
    const clamped = Math.max(0, Math.min(index, max));

    setCurrentIndex(clamped);
    scrollRef.current.scrollTo({
      left: clamped * STEP,
      behavior: "smooth",
    });
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

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
            onClick={handlePrev}
            className="bg-gray-900 hover:bg-red-700 text-white rounded-full p-3 cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-900 hover:bg-red-700 text-white rounded-full p-3 cursor-pointer"
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
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{ minWidth: cardWidth }}
            className="shrink-0 cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}
          >
            <div
              className="
                relative h-87.5 sm:h-65 md:h-98.75 md:w-69
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
                  group-hover:scale-105
                  transition-transform duration-300
                "
              />

              {/* INFO */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent p-2">
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
