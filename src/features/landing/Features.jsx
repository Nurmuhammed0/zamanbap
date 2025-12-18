import React from 'react';

function Features() {
    return (
        <section id="features" className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Мүмкүнчүлүктөр</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform duration-300 border-t-4 border-cafe-accent">
                        <svg className="w-16 h-16 mx-auto mb-4 text-cafe-primary" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M64 160l64 0 0-64-64 0 0 64zM0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 416l64 0 0-64-64 0 0 64zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zM320 96l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zM288 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm96 32c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm32-96a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-32 32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>
                        <h4 className="text-2xl font-bold mb-3 text-cafe-primary">QR-Меню</h4>
                        <p className="text-gray-700">Кардарлар үстөлдөгү QR-кодду сканерлеп, дароо эле менюну көрүп, буйрутма бере алышат.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform duration-300 border-t-4 border-cafe-accent">
                        <svg className="w-16 h-16 mx-auto mb-4 text-cafe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <h4 className="text-2xl font-bold mb-3 text-cafe-primary">Админ-панель</h4>
                        <p className="text-gray-700">Буйрутмаларды реалдуу убакытта көзөмөлдөп, менюну оңой өзгөртүп, статистиканы анализдей аласыз.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform duration-300 border-t-4 border-cafe-accent">
                        <svg className="w-16 h-16 mx-auto mb-4 text-cafe-primary" fill="currentColor" stroke="none" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 512c141.4 0 256-114.6 256-256 0-23.3-3.1-45.9-8.9-67.3 5.5-13.5 8.9-28.4 8.9-44.7 0-53-43-96-96-96l-2.9 0c-2.5 0-5 .1-7.4 .3-42.1-30.4-93.8-48.3-149.7-48.3S148.4 17.9 106.3 48.3c-2.5-.2-4.9-.3-7.4-.3L96 48c-53 0-96 43-96 96 0 16.3 3.5 31.2 8.9 44.7-5.8 21.4-8.9 44-8.9 67.3 0 141.4 114.6 256 256 256zM386.7 324.9c11.9-3.7 23.9 6.3 19.6 18.1-22.4 61.3-81.3 105.1-150.3 105.1S128.1 404.2 105.7 342.9c-4.3-11.8 7.7-21.8 19.6-18.1 39.2 12.2 83.7 19.1 130.7 19.1s91.5-6.9 130.7-19.1zM322.9 96c13.5 0 26.5 5.4 36 14.9l9.1 9.1 9.1-9.1c9.5-9.5 22.5-14.9 36-14.9l2.9 0c26.5 0 48 21.5 48 48 0 53.4-66.9 95.7-89 108.2-4.4 2.5-9.6 2.5-14 0-22.1-12.5-89-54.8-89-108.2 0-26.5 21.5-48 48-48l2.9 0c13.5 0 26.5 5.4 36 14.9zM130.1 96c13.5 0 26.5 5.4 36 14.9l9.1 9.1 9.1-9.1c9.5-9.5 22.5-14.9 36-14.9l2.9 0c26.5 0 48 21.5 48 48 0 53.4-66.9 95.7-89 108.2-4.4 2.5-9.6 2.5-14 0-22.1-12.5-89-54.8-89-108.2 0-26.5 21.5-48 48-48l2.9 0c13.5 0 26.5 5.4 36 14.9z"/></svg>
                        <h4 className="text-2xl font-bold mb-3 text-cafe-primary">Ыңгайлуу интерфейс</h4>
                        <p className="text-gray-700">Сиз үчүн да, кардарларыңыз үчүн да интуитивдүү жана колдонууга оңой дизайн.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;