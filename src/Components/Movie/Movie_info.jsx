import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Api_Service from "../../Service/Api_Service";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Actor = () => {
  const { actorId } = useParams();
  const sliderRef = useRef(null);

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    Api_Service.GetData(`person/${actorId}`).then(setActor);

    Api_Service.GetData(`person/${actorId}/movie_credits`).then((data) =>
      setMovies(data.cast.filter((m) => m.poster_path))
    );
  }, [actorId]);

  // Drag-to-scroll + wheel horizontal scroll + touch support
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;

    const onMouseDown = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeftStart = slider.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; // adjust multiplier for sensitivity
      slider.scrollLeft = scrollLeftStart - walk;
    };

    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    // allow vertical mouse wheel to scroll horizontally inside the slider
    const onWheel = (e) => {
      // if user is doing a horizontal scroll already, let it be
      // otherwise convert vertical wheel into horizontal scroll
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        slider.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = slider.scrollLeft;
    };
    const onTouchMove = (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1;
      slider.scrollLeft = touchScrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("wheel", onWheel, { passive: false });

    slider.addEventListener("touchstart", onTouchStart, { passive: true });
    slider.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("wheel", onWheel);
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const handleMovieClick = async (movieId) => {
    const data = await Api_Service.GetData(`movie/${movieId}/videos`);
    const trailer = data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    } else {
      alert("Trailer not available for this movie.");
    }
  };

  if (!actor) {
    return <p className="text-center text-gray-400 py-20">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white pt-24 pb-24">
      <div className="max-w-350 mx-auto px-6">
        {/* TOP INFO */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* IMAGE */}
          <div className="w-72 shrink-0">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "/Image/no-avatar.png"
              }
              className="rounded-xl"
            />
          </div>

          {/* CONTENT */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {actor.name}
            </h1>

            <p className="text-gray-400 leading-relaxed mb-10 max-w-4xl">
              {actor.biography || "No biography available."}
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="bg-[#161616] p-5 rounded-lg">
                <p className="text-sm text-gray-400">Birthday</p>
                <p className="font-bold">{actor.birthday || "—"}</p>
              </div>
              <div className="bg-[#161616] p-5 rounded-lg">
                <p className="text-sm text-gray-400">Place of Birth</p>
                <p className="font-bold">{actor.place_of_birth || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOVIE SLIDER */}
        <div className="mt-24 relative">
          <h2 className="text-3xl font-bold mb-8">Movies Played In</h2>

          {/* NOTE:
              Arrows removed to match requirement (no visible left/right icons).
              Slider supports mouse drag, wheel-to-scroll (vertical -> horizontal),
              and touch swiping. If you want to show arrows only on some breakpoints
              you can re-add buttons and control visibility with Tailwind classes
              like "hidden md:block" or "block md:hidden".
          */}

          <div
            ref={sliderRef}
            role="list"
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide -ml-16 pr-6"
            style={{ cursor: "grab" }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                role="listitem"
                className="min-w-60 cursor-pointer"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="rounded-xl mb-3 hover:scale-105 transition"
                  alt={movie.title}
                />
                <p className="text-sm font-semibold line-clamp-2">
                  {movie.title}
                </p>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {movie.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-4 -right-4 bg-red-600 w-10 h-10 rounded-full text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actor;
