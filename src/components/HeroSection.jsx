import React from "react";
import models from "../assets/models.png";
import population from "../assets/population.png";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen flex items-center px-6 lg:px-20"
      style={{ backgroundImage: `url(${models})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 max-w-lg">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-6">
          FIND CLOTHES <br /> THAT MATCH <br /> YOUR STYLE
        </h1>
        <button className="px-12 py-2 bg-white text-black rounded-3xl hover:bg-gray-300">
          Shop Now
        </button>
        <img className="px-10 py-20" src={population} alt="numbers" />
      </div>
    </div>
  );
};

export default HeroSection;
