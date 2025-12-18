import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function HeroSlider() {
    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670',
            title: 'Инновациялык чечимдер',
            subtitle: 'Сиздин кафеңиз үчүн заманбап технологиялар.'
        },
        {
            image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670',
            title: 'Ыңгайлуу башкаруу',
            subtitle: 'Буйрутмаларды, менюну жана кардарларды оңой башкарыңыз.'
        },
        {
            image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2574',
            title: 'Кардарлардын ыраазычылыгы',
            subtitle: 'Тез жана ыңгайлуу тейлөө менен кардарларыңызды кубантыңыз.'
        }
    ];

    return (
        <section id="hero" className="w-full h-[400px] sm:h-[500px] md:h-[600px]">
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
