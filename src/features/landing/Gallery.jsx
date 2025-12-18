import React from 'react';

function Gallery() {
    const images = [
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2670',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2581',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2580',
        'https://images.unsplash.com/photo-1484723050470-7e38c1b3c146?q=80&w=2670',
    ];

    return (
        <section id="gallery" className="bg-gray-100 py-10">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Сүрөт галереясы</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((src, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-cafe-accent/50">
                            <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Gallery;