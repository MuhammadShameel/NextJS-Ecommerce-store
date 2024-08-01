import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import slide1 from "../../../public/images/23.jpg";
import slide2 from "../../../public/images/24.jpg";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="fade"
        className="h-full"
      >
        <SwiperSlide>
          <div className="relative slide-content h-full">
            <Image
              src={slide1}
              alt="Slide 1"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0   flex flex-col justify-center items-center text-center">
              <h4 className="text-xl text-[#b11200] font-bold mb-4">
                THE LITTLE ONE LOVE IT SO MUCH
              </h4>
              <h2 className="text-black text-3xl font-bold mb-4">
                OF DELECIOUS SPICES
              </h2>
              <button className="px-6 py-3 bg-black text-white rounded-full">
                SHOP NOW
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full">
            <Image
              src={slide2}
              alt="Slide 2"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute inset-0   flex flex-col justify-center items-center text-center">
              <h4 className=" text-[#b11200] text-xl font-bold mb-4">
                CREATES A MODERATE CRUNCH
              </h4>
              <h2 className="text-black text-3xl font-bold mb-4">
                {" "}
                100% FRESH FOOD
              </h2>
              <button className="px-6 py-3 bg-black text-white rounded-md">
                SHOP NOW
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
