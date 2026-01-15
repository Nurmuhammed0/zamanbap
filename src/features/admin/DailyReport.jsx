import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCafeStore } from '../../store/cafeStore';

const DailyReport = ({ stats, onClose }) => {
  const { 
    totalSalesToday, 
    totalOrdersToday, 
    averageOrderValueToday, 
    popularItems 
  } = stats;
  const cafeName = useCafeStore((state) => state.cafeName);


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Daily Report - ${new Date().toLocaleDateString()}`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 20mm;
      }
      body {
        -webkit-print-color-adjust: exact;
      }
    `,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 print:hidden">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div ref={componentRef} className="w-full">
          <h1 className="text-3xl print:text-2xl font-bold text-center mb-1 text-gray-900">{cafeName}</h1>
          <h2 className="text-2xl print:text-xl font-bold text-center mb-4 text-gray-800">Күндүк жыйынтык</h2>
          <p className="text-center text-sm mb-4 text-gray-600">Күн: {new Date().toLocaleDateString()}</p>
          
          <div className="grid grid-cols-3 print:grid-cols-3 gap-2 mb-4 text-center">
            <div className="p-2 bg-gray-100 rounded print:border print:bg-transparent">
              <p className="text-xs text-gray-600">Жалпы сатуулар</p>
              <p className="text-lg print:text-base font-bold text-gray-900">{totalSalesToday} сом</p>
            </div>
            <div className="p-2 bg-gray-100 rounded print:border print:bg-transparent">
              <p className="text-xs text-gray-600">Буйрутмалар саны</p>
              <p className="text-lg print:text-base font-bold text-gray-900">{totalOrdersToday}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded print:border print:bg-transparent">
              <p className="text-xs text-gray-600">Эң көп сатылган</p>
              <p className="text-lg print:text-base font-bold text-gray-900 truncate">{popularItems.length > 0 ? popularItems[0].name : 'Азырынча жок'}</p>
            </div>
          </div>

          <h3 className="text-xl print:text-lg font-bold mb-2 text-gray-800">Тамактар боюнча жыйынтык</h3>
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full print:w-full bg-white text-sm border border-collapse">
              <thead className="bg-gray-100 print:bg-transparent">
                <tr>
                  <th className="py-1 px-2 border text-left">#</th>
                  <th className="py-1 px-2 border text-left">Тамак</th>
                  <th className="py-1 px-2 border text-right">Баасы</th>
                  <th className="py-1 px-2 border text-right">Саны</th>
                </tr>
              </thead>
              <tbody>
                {popularItems.length > 0 ? (
                  popularItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-1 px-2 border">{index + 1}</td>
                      <td className="py-1 px-2 border">{item.name}</td>
                      <td className="py-1 px-2 border text-right">{item.price} сом</td>
                      <td className="py-1 px-2 border text-right font-semibold">{item.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500 border">
                      Бүгүн эч кандай тамак буйрутма кылынган жок.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4 print:hidden">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
              Жабуу
            </button>
            <button 
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0a.225.225 0 01.225.225v.884a2.25 2.25 0 01-2.25 2.25H6.34a2.25 2.25 0 01-2.25-2.25v-.884c0-.124.101-.225.225-.225H17.66zM6 12h12M6 12a2.25 2.25 0 01-2.25-2.25V6.34a2.25 2.25 0 012.25-2.25h12A2.25 2.25 0 0120.25 6.34v3.41A2.25 2.25 0 0118 12H6z" />
              </svg>
              <span>Басып чыгаруу</span>
            </button>
          </div>
      </div>
    </div>
  );
};

export default DailyReport;
