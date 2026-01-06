import React from "react";

const Start = () => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 bg-black">
      <div
        className="w-full max-w-[1600px] p-6 sm:p-8 md:p-12 lg:p-16 text-white bg-cover bg-center rounded-lg opacity-80 brightness-90"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* text */}
          <div className="flex-1 leading-relaxed">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Start your free trial today!
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial.
            </p>
          </div>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-md text-sm sm:text-base font-medium hover:bg-red hover:text-white-800 transition whitespace-nowrap cursor-pointer">
            Start a Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
