import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import image9 from '../../assets/9img.jpeg';
import image10 from '../../assets/10img.jpeg';
import image11 from '../../assets/11img.jpeg';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function HeroSlider() {
    const slides = [
        {
            image: image9,
            title: 'Инновациялык чечимдер',
            subtitle: 'Сиздин кафеңиз үчүн заманбап технологиялар.'
        },
        {
            image: image10,
            title: 'Ыңгайлуу башкаруу',
            subtitle: 'Буйрутмаларды, менюну жана кардарларды оңой башкарыңыз.'
        },
        {
            image: image11,
            title: 'Кардарлардын ыраазычылыгы',
            subtitle: 'Тез жана ыңгайлуу тейлөө менен кардарларыңызды кубантыңыз.'
        }
    ];

    return (
        <section id="hero" className="w-full h-[100vh]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center drop-shadow-lg leading-tight">{slide.title}</h2>
                            <p className="text-base sm:text-lg md:text-xl font-medium text-center max-w-3xl drop-shadow-md">{slide.subtitle}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default HeroSlider;
