import React from 'react';

function InstructionsPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Сайтты колдонуу боюнча көрсөтмө</h1>
      
      {/* Video Section */}
      <section className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Видеону көрсөтүү</h2>
        <p className="mb-4">Төмөндө сайтты кантип колдонуу керектиги тууралуу кыскача видео көрсөтмө берилген.</p>
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src="https://www.youtube.com/embed/M7lc1UVf-VE" // Working YouTube video example (e.g., from YouTube's official channel)
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            title="Сайтты колдонуу көрсөтмөсү"
          ></iframe>
        </div>
      </section>

      <div className="space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Менюну башкаруу</h2>
          <p className="mb-2">
            <strong>"Менюну өзгөртүү"</strong> бөлүмү аркылуу сиз кафеңиздин менюсуна жаңы тамактарды кошуп, учурдагыларын өзгөртүп же өчүрө аласыз.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Жаңы тамак кошуу:</strong> Форманы толтуруп, "Кошуу" баскычын басыңыз. Категорияны туура тандоону унутпаңыз.</li>
            <li><strong>Тамакты өзгөртүү:</strong> Тиешелүү тамактын жанындагы "Өзгөртүү" баскычын басыңыз. Маалыматтар формага жүктөлөт, аларды оңдоп "Сактоо" баскычын басыңыз.</li>
            <li><strong>Көрсөтүү/Жашыруу:</strong> Эгер тамак убактылуу жок болсо, аны "Жашыруу" баскычы менен кардарлардын менюсунан алып салсаңыз болот. Кайра сатыкка чыкканда "Көрсөтүү" баскычын басыңыз.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Буйрутмаларды башкаруу</h2>
          <p className="mb-2">
            <strong>"Буйрутмалар"</strong> бөлүмүнө кардарлардан келген жаңы буйрутмалар реалдуу убакыт режиминде түшүп турат.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Жаңы:</strong> Кардардан жаңы келген буйрутмалар ушул жерде пайда болот.</li>
            <li><strong>Даярдоону баштоо:</strong> Буйрутманы даярдап баштаганда, "Даярдоону баштоо" баскычын басыңыз. Буйрутма "Даярдалууда" тилкесине жылат.</li>
            <li><strong>Даяр болду:</strong> Тамак даяр болгондо, "Даяр болду" баскычын басыңыз. Буйрутма "Даяр" тилкесине жылат.</li>
            <li><strong>Аткарылды:</strong> Кардар буйрутманы алып кеткенден кийин, "Аткарылды" баскычын басыңыз. Буйрутма тизмеден жашырылат.</li>
            <li><strong>Аткарылганды тазалоо:</strong> Бул баскыч "Аткарылды" статусундагы бардык буйрутмаларды тизмеден биротоло тазалайт.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Столдорду башкаруу жана QR-коддор</h2>
          <p className="mb-2">
            <strong>"Столдор"</strong> бөлүмүндө сиз кафедеги столдорду кошуп, алардын уникалдуу QR-коддорун басып чыгара аласыз.
          </p>
           <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Жаңы стол кошуу:</strong> Столдун номерин киргизип, "Кошуу" баскычын басыңыз.</li>
            <li><strong>QR-кодду басып чыгаруу:</strong> Ар бир столдун жанындагы "QR-кодду басып чыгаруу" баскычын басып, кодду принтерден чыгарып, столго чаптап коюңуз. Кардарлар ушул код аркылуу менюну ачып, буйрутма беришет.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default InstructionsPage;
