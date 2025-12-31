import React, { useState, useEffect } from 'react';
import image1 from '../../assets/1img.PNG';
import image2 from '../../assets/2img.PNG';
import image3 from '../../assets/3img.PNG';
import image4 from '../../assets/4img.PNG';
import image5 from '../../assets/5img.PNG';
import image6 from '../../assets/6img.PNG';
import image7 from '../../assets/7img.PNG';
import image8 from '../../assets/8img.PNG';

const galleryData = [
  { src: image1, title: 'Бирдиктүү башкаруунун күчү!', description: 'Кафеңиздин жүрөгүн бир экрандан башкарыңыз! Сатуулар, буйрутмалар жана негизги көрсөткүчтөр менен бизнесиңизди толук көзөмөлгө алыңыз.' },
  { src: image2, title: 'Ыкчам буйрутмалар - ыраазы кардарлар!', description: 'Ар бир буйрутманы заматта кабыл алып, даярдоо процессин көзөмөлдөп, кардарларыңызды тез тейлөө менен таң калтырыңыз. Натыйжалуулук сиздин колуңузда!' },
  { src: image3, title: 'Каржыңызды санарипке өткөрүңүз', description: 'Төлөмдөрдү кабыл алуу эч качан мынчалык оңой болгон эмес. Заманбап кассалык система менен каржылык операцияларды так жана ыңгайлуу жүргүзүңүз.' },
  { src: image4, title: 'Менюңуз - сиздин чыгармачылыгыңыз!', description: 'Жаңы даамдарды жаратыңыз, бааларды заматта жаңыртыңыз жана акциялар менен кардарларды тартыңыз. Сиздин менюңуз - бул сиздин ийгилигиңиздин рецеби!' },
  { src: image5, title: 'Сандар сүйлөсүн: Ийгиликтин аналитикасы', description: 'Кайсы тамак хит болуп жатат? Кардарлар качан активдүү? Бизнес чечимдерин так маалыматтарга таянып кабыл алыңыз жана кирешеңизди арттырыңыз.' },
  { src: image6, title: 'Күн жыйынтыгы: Ар бир тыйындын эсеби', description: 'Күнүмдүк отчет менен ар бир сомдун кайда кеткенин так билиңиз. Киреше, чыгаша жана сатылган товарлар боюнча толук маалымат менен бизнесиңизди бекемдеңиз.' },
  { src: image7, title: 'Мыкты сервис ар бир үстөлдө', description: 'Кафеңиздин картасын санариптештирип, үстөлдөрдү эффективдүү башкарыңыз. QR-коддор менен кардарларга заманбап жана ыңгайлуу шарт түзүп бериңиз.' },
  { src: image8, title: 'Санариптик дүмүрчөк: Жаратылышка кам көрүү!', description: 'Кагазды үнөмдөп, жаратылышка аяр мамиле жасаңыз. Кардарларыңызга заманбап ыңгайлуулукту тартуулап, брендиңиздин аброюн жаңы деңгээлге көтөрүңүз.' },
];

function Gallery() {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (selectedImage) {
            setIsModalVisible(true);
        } else {
            setIsModalVisible(false);
        }
    }, [selectedImage]);

    // --- Full Gallery Grid ---
    const FullGallery = () => (
        <div className="w-full animate-fade-in">
             <button 
                onClick={() => setIsGalleryOpen(false)}
                className="mb-8 bg-cafe-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-cafe-primary-dark transition-colors flex items-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                <span>Артка</span>
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryData.map((image, index) => (
                    <div 
                        key={index} 
                        className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-slate-100" // Changed bg-slate-100 to bg-white
                        onClick={() => setSelectedImage(image)}
                    >
                        <img src={image.src} alt={image.title} className="w-full h-48 object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-lg font-bold text-center p-4">
                                {image.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    // --- Image Modal ---
    const ImageModal = () => (
        <div 
            className={`fixed inset-0 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${isModalVisible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setSelectedImage(null)}
        >
            <div 
                className={`bg-white rounded-xl shadow-2xl w-full flex flex-col md:flex-row transition-transform duration-300 ${isModalVisible ? 'scale-100' : 'scale-95'}`}
                style={{maxWidth: '90vw', maxHeight: '90vh'}}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full lg:w-3/4 bg-gray-200 rounded-t-xl md:rounded-l-xl md:rounded-t-none flex items-center justify-center p-4">
                    <img src={selectedImage?.src} alt={selectedImage?.title} className="max-h-full w-auto object-contain" />
                </div>
                <div className="p-8 flex flex-col justify-center w-full lg:w-1/4 overflow-y-auto">
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">{selectedImage?.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedImage?.description}</p>
                </div>
                 <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );

    // --- Image Stack ---
    const ImageStack = () => (
        <div 
            className="relative w-72 h-56 cursor-pointer group"
            onClick={() => setIsGalleryOpen(true)}
        >
            {galleryData.slice(0, 3).map((image, index) => (
                <img
                    key={index}
                    src={image.src}
                    alt={`Stacked image ${index + 1}`}
                    className={`absolute w-full h-full object-contain p-2 bg-slate-100 rounded-lg shadow-xl border-2 border-white transition-transform duration-300 ease-in-out
                        ${index === 0 ? '-rotate-6 group-hover:-rotate-12 group-hover:-translate-x-8' : ''}
                        ${index === 1 ? 'rotate-2 group-hover:rotate-0 group-hover:scale-105 z-10' : ''}
                        ${index === 2 ? 'rotate-8 group-hover:rotate-12 group-hover:translate-x-8' : ''}
                    `}
                />
            ))}
            <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <p className="text-white text-lg font-bold">Галереяны ачуу</p>
            </div>
        </div>
    );

    return (
        <section id="gallery" className="bg-slate-50 py-16">
            <div className="container mx-auto px-6 flex flex-col items-center">
                <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800">Системанын мүмкүнчүлүктөрү</h3>
                
                {!isGalleryOpen ? <ImageStack /> : <FullGallery />}
            </div>
            
            <ImageModal />
        </section>
    );
}

export default Gallery;