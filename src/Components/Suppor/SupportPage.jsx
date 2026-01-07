import React, { useEffect, useState } from "react";
import Api_Service from "../../Service/Api_Service";

const SupportPage = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
  });

  /* ================= API ================= */
  useEffect(() => {
    const getMovies = async () => {
      const data = await Api_Service.GetData("movie/popular");
      setMovies(data?.results?.slice(0, 8) || []);
    };
    getMovies();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.agreed) {
      alert("Please agree to Terms of Use and Privacy Policy");
      return;
    }
    alert("Message sent successfully!");
  };

  const posterUrl = (path) =>
    path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : "/Image/no-poster.png";

  return (
    <div className="bg-black text-white min-h-screen px-5 pt-[130px] pb-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
        
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to our support page!
          </h1>

          <p className="text-gray-400 mb-10 leading-relaxed">
            We're here to help you with any problems you may be having with our product.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg 
                           hover:scale-105 transition duration-300"
              >
                <img
                  src={posterUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-10">
          
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full bg-black border border-[#333] rounded-md px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full bg-black border border-[#333] rounded-md px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full bg-black border border-[#333] rounded-md px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Phone Number</label>
              <div className="flex gap-2">
                <select className="bg-black border border-[#333] rounded-md px-3 py-3 text-sm">
                  <option>🇺🇿 +998</option>
                </select>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="flex-1 bg-black border border-[#333] rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Enter your Message"
              className="w-full bg-black border border-[#333] rounded-md px-4 py-3 text-sm outline-none resize-y"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 mb-6">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-400 text-sm">
              I agree with Terms of Use and Privacy Policy
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 transition py-4 rounded-md font-semibold"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
