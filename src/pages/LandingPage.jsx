import React, { useRef } from 'react';
import Header from '../features/landing/Header';
import HeroSlider from '../features/landing/HeroSlider';
import Features from '../features/landing/Features';
import HowToUse from '../features/landing/HowToUse';
import VideoSection from '../features/landing/VideoSection';
import Gallery from '../features/landing/Gallery';
import Footer from '../features/landing/Footer';

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
        <div className="bg-gray-100">
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