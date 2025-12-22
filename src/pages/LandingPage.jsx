import React, { useRef, useEffect } from 'react';
import Header from '../features/landing/Header';
import HeroSlider from '../features/landing/HeroSlider';
import Features from '../features/landing/Features';
import HowToUse from '../features/landing/HowToUse';
import VideoSection from '../features/landing/VideoSection';
import Gallery from '../features/landing/Gallery';
import Footer from '../features/landing/Footer';
import '../assets/snow.css';

// Snowfall component
const Snowfall = () => {
  const snowflakes = Array.from({ length: 200 }).map((_, i) => {
    const style = {
      width: `${Math.random() * 5 + 2}px`,
      height: `${Math.random() * 5 + 2}px`,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
    };
    return <div key={i} className="snowflake" style={style}></div>;
  });

  return <div className="snow-container">{snowflakes}</div>;
};

function LandingPage() {
    const refs = {
        features: useRef(null),
        video: useRef(null),
        gallery: useRef(null),
        'how-to-use': useRef(null),
    };

    const handleScroll = (id) => {
        refs[id].current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-100 relative">
            <Snowfall />
            <Header onScroll={handleScroll} />
            <main>
                <HeroSlider />
                <div ref={refs.features}>
                    <Features />
                </div>
                <div ref={refs.video}>
                    <VideoSection />
                </div>
                <div ref={refs.gallery}>
                    <Gallery />
                </div>
                <div ref={refs['how-to-use']}>
                    <HowToUse />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default LandingPage;