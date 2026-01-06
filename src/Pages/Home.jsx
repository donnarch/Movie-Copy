import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import TrendingCarousel from "../Components/Main/TrendingCarousel";
import Questions from "../Components/Main/Questions";
import PricingPlans from "../Components/Main/PricingPlans";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrendingCarousel title="Trending now" url="trending/movie/week" />
      <Questions />
      <PricingPlans />
    </div>
  );
};

export default Home;
