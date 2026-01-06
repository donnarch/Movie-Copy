import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
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

  const CAST_VISIBLE = 7;
  const REVIEW_VISIBLE = 2;

  useEffect(() => {
    if (!movie) {
      Api_Service.GetData(`movie/${id}`).then(setMovie);
    }
  }, [id, movie]);

  useEffect(() => {
    if (!movie?.id) return;

    // Cast & Director
    Api_Service.GetData(`movie/${movie.id}/credits`).then((data) => {
      setActors(data.cast.slice(0, 20));
      const dir = data.crew.find((p) => p.job === "Director");
      setDirector(dir?.name || "—");
    });

    // Trailer key
    Api_Service.GetData(`movie/${movie.id}/videos`).then((data) => {
      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    });

    // Reviews
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

  const visibleActors = actors.slice(castIndex, castIndex + CAST_VISIBLE);
  const visibleReviews = reviews.slice(
    reviewIndex,
    reviewIndex + REVIEW_VISIBLE
  );

  return (
    <div className="bg-neutral-900 min-h-screen text-white pt-24 px-4">
      {/* HEADER */}
      <div className="relative max-w-6xl mx-auto mb-2 rounded-xl overflow-hidden shadow-xl h-[460px]">
        {/* Video yoki Image */}
        {playVideo && trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1`}
            className="w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          ></iframe>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        {!playVideo && (
          <div className="absolute bottom-16 text-center px-6">
            <h1 className="text-4xl font-black mb-2">{movie.title}</h1>
          </div>
        )}
        {!playVideo && trailerKey && (
          <div className="absolute inset-0 flex justify-center items-center">
            <button
              onClick={() => setPlayVideo(true)}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full flex items-center gap-2 text-2xl z-10 cursor-pointer"
            >
              <i class="fa-solid fa-play"></i> Play Trailer
            </button>
          </div>
        )}
      </div>
      {playVideo && (
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setPlayVideo(false)}
            className="bg-red-600 hover:bg-red-700 px-140 py-4 rounded-full text-xl font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_320px] gap-10">
        {/* LEFT */}
        <div>
          {/* CAST */}
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="relative flex items-center mb-12">
            <button
              onClick={() => setCastIndex(Math.max(0, castIndex - 1))}
              className="absolute left-0 bg-black/60 p-3 rounded-full z-10 cursor-pointer"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-3 mx-12 overflow-x-hidden">
              {visibleActors.map((actor) => (
                <div
                  key={actor.id}
                  onClick={() => navigate(`/actor/${actor.id}`)}
                  className="w-[95px] text-center cursor-pointer"
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
                  Math.min(actors.length - CAST_VISIBLE, castIndex + 1)
                )
              }
              className="absolute right-0 bg-black/60 p-3 rounded-full z-10 cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* REVIEWS */}
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="relative flex items-center">
            <button
              onClick={() => setReviewIndex(Math.max(0, reviewIndex - 1))}
              className="absolute left-0 bg-black/60 p-3 rounded-full z-10 cursor-pointer"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-6 mx-12">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#1a1a1a] p-5 rounded-lg w-[320px]"
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

            <button
              onClick={() =>
                setReviewIndex(
                  Math.min(reviews.length - REVIEW_VISIBLE, reviewIndex + 1)
                )
              }
              className="absolute right-18 bg-black/60 p-3 rounded-full z-10 cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <aside>
          <div className="bg-[#111] p-6 rounded-xl sticky top-28 space-y-3">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2"
            />
            <p className="text-sm text-gray-300">Director: {director}</p>
            <p className="text-sm text-gray-300">
              Rating: {movie.vote_average?.toFixed(1)}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 w-full bg-neutral-800 py-2 rounded hover:bg-neutral-700 cursor-pointer"
            >
              Back
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
