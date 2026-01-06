import React, { useState } from "react";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
  });

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

  const movies = [
    { title: "Heist Korea", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400" },
    { title: "Stranger Things", img: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400" },
    { title: "The Blind", img: "https://images.unsplash.com/photo-1574267432644-f02d5a3c5fc9?w=400" },
    { title: "The Defenders", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400" },
    { title: "Black Panther", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400" },
    { title: "Moonlight", img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400" },
    { title: "Fire", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400" },
    { title: "Khailee", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400" },
  ];

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
            {movies.map((movie, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition"
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-10">
          {/* names */}
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

          {/* email & phone */}
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
                  placeholder="+998"
                  className="flex-1 bg-black border border-[#333] rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* message */}
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

          {/* checkbox */}
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

          {/* button */}
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
