import React from "react";
import TrendingCarousel from "../Components/Main/TrendingCarousel";

const Movies = () => {
  return (
    <main>
      <TrendingCarousel title={"Popular Top 10 In Genres"} url="movie/popular" />
      <TrendingCarousel title={"New Releases"} url="movie/now_playing" />
      <TrendingCarousel title={"Must - Watch Movies"} url="movie/top_rated" />
      <TrendingCarousel title={"Our Genres"} url="movie/upcoming" />
    </main>
  );
};

export default Movies;
