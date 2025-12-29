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
  { src: image1, title: 'Админ панел: Башкы бет', description: 'Бул жерде сиз кафенин ишин комплекстүү башкара аласыз. Сатуулардын жалпы обзору, активдүү буйрутмалар жана негизги көрсөткүчтөр бир экранда.' },
  { src: image2, title: 'Буйрутмаларды башкаруу', description: 'Кардарлардан түшкөн буйрутмаларды реалдуу убакыт режиминде кабыл алуу, алардын статусун өзгөртүү (даярдалууда, даяр, аткарылды) жана официанттарга бөлүштүрүү.' },
  { src: image3, title: 'Кассалык операциялар', description: 'Төлөмдөрдү ыңгайлуу кабыл алуу, чектерди басып чыгаруу же электрондук түрдө жөнөтүү. Бардык каржылык операциялар оңой көзөмөлдөнөт.' },
  { src: image4, title: 'Менюну ийкемдүү өзгөртүү', description: 'Кафеңиздин менюсун оңой жана тез түзөтүңүз. Жаңы тамактарды кошуңуз, бааларды өзгөртүңүз, сүрөттөрдү жаңыртыңыз жана акцияларды бир нече мүнөттүн ичинде жарыялаңыз.' },
  { src: image5, title: 'Толук Статистика', description: 'Сатуулардын динамикасы, эң популярдуу тамактар, кардарлардын активдүүлүгү жана кирешелер боюнча деталдуу отчеттор. Бизнесиңизди өнүктүрүү үчүн баалуу маалыматтар.' },
  { src: image6, title: 'Күндүк жыйынтык отчету', description: 'Ар бир күндүн аягында автоматтык түрдө түзүлүүчү деталдуу отчет. Күндүн кирешеси, чыгашалары, эң көп сатылган товарлар жана кардарлардын саны боюнча толук маалымат.' },
  { src: image7, title: 'Үстөлдөрдү эффективдүү башкаруу', description: 'Кафедеги ар бир үстөлдүн абалын интерактивдүү түрдө көзөмөлдөңүз. Бош, ээлеген же буйрутмасы бар үстөлдөрдү даана көрүп, QR коддорду оңой түзүңүз.' },
  { src: image8, title: 'Санариптик Чек: Электрондук ыңгайлуулук', description: 'Ар бир буйрутма үчүн электрондук чекти түзүп, кардарларыңызга дароо жөнөтүңүз. Бул экологиялык таза жана заманбап чечим кардарлардын лоялдуулугун арттырат.' },
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
                style={{maxWidth: '1000px'}}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full md:w-3/5 bg-gray-200 rounded-t-xl md:rounded-l-xl md:rounded-t-none flex items-center justify-center p-4">
                    <img src={selectedImage?.src} alt={selectedImage?.title} className="max-h-[80vh] w-auto object-contain" />
                </div>
                <div className="p-8 flex flex-col justify-center w-full md:w-2/5">
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