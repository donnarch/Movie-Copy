import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Main/Navbar";
import Start from "../Components/Main/Start";
import Footer from "../Components/Main/Footer";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import Support from "../Pages/Support";
import Subscription from "../Pages/Subscription";
import Search from "../Components/Main/Search";
import Casts from "../Components/Movie/Casts";
import Actor from "../Components/Movie/Movie_info";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        {/* 🔥 MUHIM FIX */}
        <Route path="/movie/:id" element={<Casts />} />

        <Route path="/actor/:actorId" element={<Actor />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/support" element={<Support />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <Start />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
