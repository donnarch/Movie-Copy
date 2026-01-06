import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Top content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 pb-8 border-b border-white/10">
          {/* Column 1 */}
          <div>
            <h4 className="text-white mb-4 text-sm font-semibold">Home</h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Devices
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white mb-4 text-sm font-semibold">Movies</h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Genres
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  New Release
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Popular
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white mb-4 text-sm font-semibold">Shows</h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Genres
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  New Release
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Popular
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white mb-4 text-sm font-semibold">Support</h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h4 className="text-white mb-4 text-sm font-semibold">
              Subscription
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa] hover:text-red-600 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4 text-sm font-semibold">
              Connect With Us
            </h4>
            <div className="flex gap-3">
              {["facebook-f", "twitter", "linkedin"].map((icon) => (
                <Link
                  key={icon}
                  to="https://www.facebook.com/?locale=ru_RU"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-black-600 rounded-[20%] text-white bg-black-950/20 transition-all hover:bg-black-600"
                >
                  <i className={`fa-brands fa-${icon} text-xs sm:text-sm`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <p className="text-[#666] text-center sm:text-left">
            &copy; 2025 streamvibe. All Rights Reserved
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center sm:text-left">
            <Link to="/" className="text-[#666] hover:text-red-600 transition">
              Terms of Use
            </Link>
            <Link to="/" className="text-[#666] hover:text-red-600 transition">
              Privacy Policy
            </Link>
            <Link to="/" className="text-[#666] hover:text-red-600 transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
