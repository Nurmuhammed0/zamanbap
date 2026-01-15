import React from 'react';

function HeroSlider() {
    const logoAnimationPath = '/src/assets/logo-animation.mp4'; // Vite'те статикалык активдерге түз жол

    return (
        <section id="hero" className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] max-h-[800px] overflow-hidden bg-white">
            <video
                className="absolute top-1/2 left-1/2 w-[90%] h-auto object-contain transform -translate-x-1/2 -translate-y-1/2"
                src={logoAnimationPath}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center drop-shadow-lg leading-tight">
                    Заманбап Кафе Технологиялары
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-medium text-center max-w-3xl drop-shadow-md">
                    Сиздин бизнесиңиз үчүн инновациялык жана ыңгайлуу чечимдер.
                </p>
            </div>
        </section>
    );
}

export default HeroSlider;
