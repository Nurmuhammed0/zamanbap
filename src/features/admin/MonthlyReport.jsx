import React, { forwardRef, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCafeStore } from '../../store/cafeStore';

// FAKE DATA with profit
const monthlyData = [
  { week: '1-жума', sales: 25000, profit: 9000, topItem: 'Кофе' },
  { week: '2-жума', sales: 32000, profit: 12000, topItem: 'Бургер' },
  { week: '3-жума', sales: 28000, profit: 10000, topItem: 'Пицца' },
  { week: '4-жума', sales: 40000, profit: 15000, topItem: 'Мохито' },
];

const MonthlyReport = forwardRef((props, ref) => {
  const [isPrinting, setIsPrinting] = useState(false); // New state for print detection

  useEffect(() => {
    const mediaQuery = window.matchMedia('print');
    const handlePrintChange = (e) => {
      setIsPrinting(e.matches);
    };
    mediaQuery.addListener(handlePrintChange);
    return () => mediaQuery.removeListener(handlePrintChange); // Clean up media query listener
  }, []);

  const weekWithMostSales = monthlyData.reduce((max, week) => (week.sales > max.sales ? week : max), monthlyData[0]);
  const totalProfit = monthlyData.reduce((sum, week) => sum + week.profit, 0);
  const cafeName = useCafeStore((state) => state.cafeName);

  return (
    <div ref={ref} className="p-4 md:p-8 w-full">
       <h1 className="text-3xl print:text-2xl font-bold text-center mb-1 text-gray-900">{cafeName}</h1>
       <h2 className="text-2xl print:text-xl font-bold text-center mb-4 print:mb-2 text-gray-800">Айлык жыйынтык</h2>
      {/* TODO: Add a calendar here to select the month */}
      <div className="mb-6 print:mb-3 text-center">
        <p className="text-lg">Азыркы ай (Январь 2026)</p>
      </div>

      <div className="mb-8 print:mb-4 chart-container">
        <h3 className="text-xl font-semibold mb-4 print:mb-2 text-center">Жумалык сатуулар (ушул айда)</h3>
        {isPrinting ? (
          <BarChart width={600} height={300} data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} isAnimationActive={false} animationDuration={0}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" name="Сатуулар (сом)" />
          </BarChart>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} isAnimationActive={false} animationDuration={0}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" name="Сатуулар (сом)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-8 print:mt-4">
        <h3 className="text-xl font-semibold mb-4 print:mb-2 text-center">Жыйынтык таблицасы</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm border border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 print:py-1 px-3 border text-left">Жума</th>
                        <th className="py-2 print:py-1 px-3 border text-right">Сатуулар (сом)</th>
                        <th className="py-2 print:py-1 px-3 border text-right">Пайда (сом)</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 print:py-1 px-3 border">{item.week}</td>
                            <td className="py-2 print:py-1 px-3 border text-right">{item.sales.toLocaleString()}</td>
                            <td className="py-2 print:py-1 px-3 border text-right">{item.profit.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className='mt-8 print:mt-4'>
        <h3 className="text-xl font-semibold mb-4 print:mb-2 text-center">Айдын анализи</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 text-center">
            <div className="p-4 border rounded-lg bg-gray-50 print:break-inside-avoid">
                <p className="text-lg">Эң көп сатуу болгон жума:</p>
                <p className="font-bold text-green-600 text-xl">{weekWithMostSales.week}</p>
                <p className="text-2xl font-bold my-1">{weekWithMostSales.sales.toLocaleString()} сом</p>
                <p className="text-md">
                Ошол жумада эң көп сатылган: <span className="font-bold text-blue-600">{weekWithMostSales.topItem}</span>
                </p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50 print:break-inside-avoid">
                <p className="text-lg">Жалпы айлык пайда:</p>
                <p className="text-3xl font-bold my-2 text-green-700">{totalProfit} сом</p>
            </div>
        </div>
      </div>
    </div>
  );
});

export default MonthlyReport;
