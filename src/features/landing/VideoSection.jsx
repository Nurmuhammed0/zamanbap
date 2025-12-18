import React from 'react';

function VideoSection() {
    return (
        <section id="video" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cafe-accent">Тиркеме тууралуу видео</h3>
                <div className="aspect-w-16 aspect-h-5 rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
                    <iframe 
                        src="https://www.youtube.com/embed/cyqVfKF6tAU?si=CjXu3afHIZuTShGC" // A more generic placeholder video
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

export default VideoSection;
