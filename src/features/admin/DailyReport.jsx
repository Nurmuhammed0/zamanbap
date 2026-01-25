import React, { forwardRef, useState } from 'react';
import { useCafeStore } from '../../store/cafeStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom Input for DatePicker with an icon
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <button 
    className="p-2 border rounded-md text-center flex items-center justify-between space-x-2" 
    onClick={onClick} 
    ref={ref}
  >
    <span className="hidden sm:inline">{value}</span> {/* Hidden on small screens, inline on sm and up */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 sm:ml-0 ml-auto" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  </button>
));

const DailyReport = forwardRef(({ stats }, ref) => {
  const { 
    totalSalesToday, 
    totalOrdersToday, 
    totalProfitToday,
    popularItems 
  } = stats;
  const cafeName = useCafeStore((state) => state.cafeName);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Placeholder data for reports based on selected date
  const getReportDataForDate = (date) => {
    // In a real application, you would fetch data from a backend based on the selected date.
    // For now, we return empty/placeholder data.
    return {
      totalSales: 0,
      totalProfit: 0,
      totalOrders: 0,
      popularItems: []
    };
  };

  const reportData = getReportDataForDate(selectedDate);

  return (
    <div ref={ref} className="p-6 md:p-8 w-full">
      <div className="flex items-center mb-4 relative">
        <div className="flex-grow text-center">
          <h1 className="text-3xl print:text-2xl font-bold mb-1 text-gray-900">{cafeName}</h1>
          <h2 className="text-2xl print:text-xl font-bold text-gray-800">Күндүк жыйынтык</h2>
        </div>
        <div className="print:hidden absolute right-4 top-0">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            customInput={<CustomDateInput />}
            popperPlacement="bottom-end"
          />
        </div>
      </div>
      <p className="text-center text-sm mb-4 text-gray-600">Күн: {selectedDate.toLocaleDateString()}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4 text-center">
        <div className="p-2 bg-gray-100 rounded print:border print:bg-transparent">
          <p className="text-xs text-gray-600">Жалпы сатуулар</p>
          <p className="text-lg print:text-base font-bold text-gray-900">{reportData.totalSales.toLocaleString()} сом</p>
        </div>
        <div className="p-2 bg-green-100 rounded print:border print:bg-transparent">
          <p className="text-xs text-green-800">Жалпы пайда</p>
          <p className="text-lg print:text-base font-bold text-green-900">{reportData.totalProfit.toLocaleString()} сом</p>
        </div>
        <div className="p-2 bg-gray-100 rounded print:border print:bg-transparent">
          <p className="text-xs text-gray-600">Буйрутмалар саны</p>
          <p className="text-lg print:text-base font-bold text-gray-900">{reportData.totalOrders}</p>
        </div>
        <div className="p-2 bg-gray-100 rounded print:border print:bg-transparent">
          <p className="text-xs text-gray-600">Эң көп сатылган</p>
          <p className="text-lg print:text-base font-bold text-gray-900 truncate">{reportData.popularItems.length > 0 ? reportData.popularItems[0].name : 'Азырынча жок'}</p>
        </div>
      </div>

      <h3 className="text-xl print:text-lg font-bold mb-2 text-gray-800">Тамактар боюнча жыйынтык</h3>
      <div className="overflow-x-auto print:overflow-visible">
        <table className="min-w-full print:w-full bg-white text-sm border border-collapse">
          <thead className="bg-gray-100 print:bg-transparent">
            <tr>
              <th className="py-1 px-2 border text-left">#</th>
              <th className="py-1 px-2 border text-left">Тамак</th>
              <th className="py-1 px-2 border text-right">Саны</th>
              <th className="py-1 px-2 border text-right">Сатуу баасы</th>
              <th className="py-1 px-2 border text-right">Пайда</th>
            </tr>
          </thead>
          <tbody>
            {reportData.popularItems.length > 0 ? (
              reportData.popularItems.map((item, index) => {
                const profitPerItem = (item.price - (item.cost || 0)) * item.count;
                return (
                  <tr key={index} className="border-b">
                    <td className="py-1 px-2 border">{index + 1}</td>
                    <td className="py-1 px-2 border">{item.name}</td>
                    <td className="py-1 px-2 border text-right font-semibold">{item.count}</td>
                    <td className="py-1 px-2 border text-right">{item.price} сом</td>
                    <td className="py-1 px-2 border text-right">{profitPerItem.toLocaleString()} сом</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 border">
                  Бүгүн эч кандай тамак буйрутма кылынган жок.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default DailyReport;