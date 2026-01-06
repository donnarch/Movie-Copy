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
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

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
      <div className="max-w-[1400px] mx-auto px-6">
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

          {/* LEFT ARROW */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black p-4 rounded-full"
          >
            <FaChevronLeft size={22} />
          </button>

          {/* SLIDER CONTAINER (moved left with negative margin) */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide -ml-16"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="min-w-[240px] cursor-pointer"
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

          {/* RIGHT ARROW */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black p-4 rounded-full"
          >
            <FaChevronRight size={22} />
          </button>
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
