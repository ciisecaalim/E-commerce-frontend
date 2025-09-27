import React from "react";
import books from "../assets/images/woman.png"; // Replace with your book image
import { FaArrowRight } from "react-icons/fa";

function HeroBookStore() {
  return (
    <section className="w-full h-screen flex items-center bg-white">
      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Text Section */}
        <div className="flex-1 text-left space-y-6">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wide">
            Get Your Next Joy
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Discover Your <span className="text-green-600">Next Book</span> Today
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-md">
            Explore thousands of titles across genres. Dive into stories, 
            knowledge, and inspiration delivered straight to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-md">
              Shop Collection <FaArrowRight />
            </button>
            <button className="bg-green-100 hover:bg-green-200 transition text-green-700 font-semibold px-6 py-3 rounded-full shadow">
              Browse Categories
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 relative flex justify-center">
          <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-green-100 relative overflow-hidden shadow-xl">
            <img
              src={books}
              alt="Books"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 right-0 bg-white shadow-lg rounded-lg px-5 py-3 text-center">
            <h3 className="text-xl font-bold text-green-600">10K+</h3>
            <p className="text-sm text-gray-600">Books Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBookStore;
