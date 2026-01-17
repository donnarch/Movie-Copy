import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaPlay } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Api_Service from "../../Service/Api_Service";

export default function MoviePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(location.state?.movie || null);
  const [actors, setActors] = useState([]);
  const [director, setDirector] = useState("—");
  const [trailerKey, setTrailerKey] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [castIndex, setCastIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);

  const CAST_DESKTOP = 7;
  const CAST_MOBILE = 5;
  const REVIEW_VISIBLE = 2;

  /* ---------------- FETCH MOVIE ---------------- */
  useEffect(() => {
    if (!movie) {
      Api_Service.GetData(`movie/${id}`).then(setMovie);
    }
  }, [id, movie]);

  /* ---------------- EXTRA DATA ---------------- */
  useEffect(() => {
    if (!movie?.id) return;

    Api_Service.GetData(`movie/${movie.id}/credits`).then((data) => {
      setActors(data.cast.slice(0, 20));
      const dir = data.crew.find((p) => p.job === "Director");
      setDirector(dir?.name || "—");
    });

    Api_Service.GetData(`movie/${movie.id}/videos`).then((data) => {
      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    });

    Api_Service.GetData(`movie/${movie.id}/reviews`).then((data) => {
      setReviews(data.results.slice(0, 10));
    });
  }, [movie]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const visibleActorsDesktop = actors.slice(
    castIndex,
    castIndex + CAST_DESKTOP
  );

  const visibleReviews = reviews.slice(
    reviewIndex,
    reviewIndex + REVIEW_VISIBLE
  );

  return (
    <div className="bg-neutral-900 min-h-screen text-white pt-24 px-4 sm:px-8">
      {/* ================= HEADER ================= */}
      <div className="relative max-w-7xl mx-auto rounded-xl overflow-hidden shadow-xl h-64 sm:h-96 md:h-130">
        {playVideo && trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}

        {!playVideo && (
          <>
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-6 w-full text-center px-4">
              <h1 className="text-2xl sm:text-4xl font-black mb-4">
                {movie.title}
              </h1>

              {trailerKey && (
                <button
                  onClick={() => setPlayVideo(true)}
                  className="
                    bg-red-600 hover:bg-red-700
                    w-14 h-14 sm:w-auto sm:h-auto
                    sm:px-8 sm:py-4
                    rounded-full
                    flex items-center justify-center gap-2
                    mx-auto
                    text-xl sm:text-2xl
                  "
                >
                  <FaPlay />
                  <span className="hidden sm:inline">Play Trailer</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* CLOSE VIDEO */}
      {playVideo && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPlayVideo(false)}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full"
          >
            Close Trailer
          </button>
        </div>
      )}

      {/* ================= CAST (DIRECTLY UNDER HEADER) ================= */}
      <section className="max-w-7xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>

        {/* MOBILE SCROLL */}
        <div className="flex gap-4 overflow-x-auto sm:hidden pb-2">
          {actors.slice(0, CAST_MOBILE).map((actor) => (
            <div
              key={actor.id}
              onClick={() => navigate(`/actor/${actor.id}`)}
              className="w-24 shrink-0 text-center cursor-pointer"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/Image/no-avatar.png"
                }
                className="w-24 h-24 rounded-xl object-cover mb-1"
              />
              <p className="text-sm truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {actor.character}
              </p>
            </div>
          ))}
        </div>

        {/* DESKTOP SLIDER */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setCastIndex(Math.max(0, castIndex - 1))}
            className="absolute left-0 top-15 -translate-y-1/2 bg-black/60 p-3 rounded-full z-10"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-4 mx-12">
            {visibleActorsDesktop.map((actor) => (
              <div
                key={actor.id}
                onClick={() => navigate(`/actor/${actor.id}`)}
                className="w-24 text-center cursor-pointer"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/Image/no-avatar.png"
                  }
                  className="w-24 h-24 rounded-xl object-cover mb-1"
                />
                <p className="text-sm truncate">{actor.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setCastIndex(
                Math.min(actors.length - CAST_DESKTOP, castIndex + 1)
              )
            }
            className="absolute right-104 top-15 -translate-y-1/2 bg-black/60 p-3 rounded-full z-10"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10">
        {/* DESCRIPTION */}
        <div>
          <div className="bg-[#141414] rounded-xl p-5 sm:p-6 mb-12">
            <p className="text-gray-400 text-sm mb-2">Description</p>
            <p className="leading-relaxed text-sm sm:text-base">
              {movie.overview || "No description available."}
            </p>
          </div>

          {/* REVIEWS */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>

            <div className="flex gap-6 overflow-x-auto md:overflow-hidden">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#1a1a1a] p-5 rounded-lg min-w-70"
                >
                  <div className="flex justify-between mb-2">
                    <span>{review.author}</span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <FaStar />
                      {(review.author_details?.rating ?? 4).toFixed(1)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-4">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT POSTER (RESPONSIVE) */}
        <aside className="md:sticky md:top-16">
          <div className="bg-[#111] p-6 rounded-xl space-y-3">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="rounded mx-auto md:mx-0"
            />

            <p>
              <span className="text-gray-400">Director:</span> {director}
            </p>
            <p>
              <span className="text-gray-400">Rating:</span>{" "}
              {movie.vote_average?.toFixed(1)}
            </p>
            <p>
              <span className="text-gray-400">Votes:</span>{" "}
              {movie.vote_count?.toLocaleString()}
            </p>

            <button
              onClick={() => navigate(-1)}
              className="w-full bg-neutral-800 py-2 rounded hover:bg-neutral-700"
            >
              Back
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
