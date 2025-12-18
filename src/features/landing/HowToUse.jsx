import React from 'react';
import { Link } from 'react-router-dom';

function HowToUse() {
    return (
        <section id="how-to-use" className="py-20 bg-cafe-background">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Кантип колдонсо болот?</h3>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-cafe-primary text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md">1</div>
                        <p className="text-lg text-gray-800">
                            Системада <Link to="/register" className="text-cafe-accent font-bold hover:underline">катталып</Link>, кафеңиздин атын жана маалыматтарын киргизиңиз.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-cafe-primary text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md">2</div>
                        <p className="text-lg text-gray-800">
                            "Үстөлдөрдү башкаруу" бетинен үстөлдөрүңүз үчүн уникалдуу QR-коддорду түзүп, басып чыгарыңыз.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-cafe-primary text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md">3</div>
                        <p className="text-lg text-gray-800">
                            Кардарлар QR-кодду сканерлеп, буйрутма беришет, ал эми сиздин админ-панелиңизге жаңы буйрутма заматта келип түшөт.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowToUse;
