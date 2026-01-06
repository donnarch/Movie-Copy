import React, { useEffect, useState } from "react";
import Api_Service from "../../Service/Api_Service";

const Hero_slider = ({ url }) => {
  const [Movies, setMovies] = useState([]);
  const GetApi = async () => {
    const response = await Api_Service.GetData(url);
    console.log(response);
  };
  useEffect(() => {
    GetApi();
  }, []);
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <div className="flex gap-4 animate-[scrollLeft_30s_linear_infinite] w-fit">
        {/* {Movies.map((movie, index) => (
          <div
            key={index}
            className="flex-none w-28 h-42 md:w-32 md:h-48 rounded-lg overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
          >
            <img
              src={movie}
              alt={`Movie ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Hero_slider;
