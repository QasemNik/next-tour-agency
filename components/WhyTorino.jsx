'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, EffectCoverflow, Navigation, Pagination, a11y } from 'swiper/modules'; // Added Navigation
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // Added coverflow css
import LineArrowLeft from "@/public/svg/LineArrowLeft";
import LineArrowRight from "@/public/svg/LineArrowRight";

function WhyTorino() {
    const images = [
        "/images/arbilTour.png",
        "/images/offroadTour.png",
        "/images/car-4260033_1280.png",
        "/images/image_SI3sJmh4_1727080822376_raw.png",
    ];

    return (
        <section className="py-20 bg-white overflow-hidden font-yekan">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content Section */}
                    <div className="text-gray-900 flex-col items-center justify-end">
                        <div className="flex items-center gap-2 text-3xl font-extrabold">
                            <h2 className=""> چرا </h2>
                            <span className="text-[#28A745]"> تورینو؟ </span>
                            {/* Note: Custom SVG components might need adjustments */}
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-gray-800">تور طبیعت گردی و تاریخی</h3>
                        <p className="w-2/3 mt-4 text-gray-600 leading-relaxed">
                            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید
                            و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید،
                            باید تورهای طبیعت‌گردی را خریداری کنید.
                            اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید،
                            می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.
                        </p>
                    </div>

                    <div className="relative font-extrabold text-white">
                        <Swiper
                            modules={[EffectCoverflow, EffectCards, Pagination, Navigation]} // 1. Added Navigation module
                            grabCursor={true}
                            effect={"cards"}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            pagination={{
                                type: 'fraction'
                            }}
                            navigation={{
                                nextEl: '.swiper-next-btn',
                                prevEl: '.swiper-prev-btn',
                            }}
                            coverflowEffect={{
                                rotate: 20,
                                stretch: -20,
                                depth: 100,
                                modifier: 1,
                            }}
                            className="mySwiper"
                            
                        >
                            {images.map((src, index) => (
                                <SwiperSlide key={index}
                                    style={{ width: '389px', height: '480px' }}>
                                    <Image
                                        src={src}
                                        priority
                                        alt={`Gallery image ${index + 1}`}
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover cursor-auto rounded-2xl"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Custom Navigation */}
                        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2  flex items-center gap-x-25 z-10 p-0 cursor-pointer">
                            <div className="swiper-next-btn">
                                <LineArrowRight />
                            </div>

                            <div className="swiper-prev-btn">
                                <LineArrowLeft />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyTorino;
