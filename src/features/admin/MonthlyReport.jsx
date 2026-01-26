import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
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
  const [isPrinting, setIsPrinting] = useState(false);
  const [chartImageUrl, setChartImageUrl] = useState(null);
  const chartRef = useRef(null);
  const cafeName = useCafeStore((state) => state.cafeName);

  useEffect(() => {
    const mediaQuery = window.matchMedia('print');
    const handlePrintChange = async (e) => {
      setIsPrinting(e.matches);
      if (e.matches && chartRef.current) {
        try {
          setChartImageUrl(null);
          const dataUrl = await toPng(chartRef.current, { backgroundColor: '#ffffff' });
          setChartImageUrl(dataUrl);
                  } catch (error) {          console.error('Error generating chart image for print:', error);
          setChartImageUrl(null);
        }
      } else if (!e.matches) {
        setChartImageUrl(null);
      }
    };
    mediaQuery.addListener(handlePrintChange);

    return () => {
      mediaQuery.removeListener(handlePrintChange);
    };
  }, [chartRef, isPrinting]);

  const weekWithMostSales = monthlyData.reduce((max, week) => (week.sales > max.sales ? week : max), monthlyData[0]);
  const totalProfit = monthlyData.reduce((sum, week) => sum + week.profit, 0);

  return (
    <div {...props} ref={ref} className="p-4 md:p-8 w-full print:p-2 print:text-xs">
       <h1 className="text-3xl print:text-xl font-bold text-center mb-1 text-gray-900">{cafeName}</h1>
       <h2 className="text-2xl print:text-lg font-bold text-center mb-4 print:mb-0 text-gray-800">Айлык жыйынтык</h2>
      {/* TODO: Add a calendar here to select the month */}
      <div className="mb-6 print:mb-1 text-center">
        <p className="text-lg print:text-sm">Азыркы ай (Январь 2026)</p>
      </div>

      <div className="mb-8 print:mb-2 chart-container">
        <h3 className="text-xl font-semibold mb-4 print:mb-1 text-center print:text-base">Жумалык сатуулар (ушул айда)</h3>
        {isPrinting && chartImageUrl ? (
          <img src={chartImageUrl} alt="Айлык сатуулар диаграммасы" style={{ width: '100%', maxWidth: '600px', height: '300px', display: 'block' }} className="print:max-w-full print:h-[200px]" />
        ) : isPrinting && !chartImageUrl ? (
          <p className="text-center text-blue-600 font-bold text-lg print:text-base">Диаграмма басып чыгаруу үчүн даярдалууда...</p>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '300px' }}> {/* Apply ref here */}
            <ResponsiveContainer width="100%" height="100%"> {/* Use 100% height relative to parent div */}
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} isAnimationActive={0}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" name="Сатуулар (сом)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-8 print:mt-2">
        <h3 className="text-xl font-semibold mb-4 print:mb-1 text-center print:text-base">Жыйынтык таблицасы</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm border border-collapse print:text-xs">
                <thead className="bg-gray-100 print:bg-transparent">
                    <tr>
                        <th className="py-2 px-3 border text-left print:py-1 print:px-2">Жума</th>
                        <th className="py-2 px-3 border text-right print:py-1 print:px-2">Сатуулар (сом)</th>
                        <th className="py-2 px-3 border text-right print:py-1 print:px-2">Пайда (сом)</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3 border">{item.week}</td>
                            <td className="py-2 px-3 border text-right print:py-1 print:px-2">{item.sales.toLocaleString()}</td>
                            <td className="py-2 px-3 border text-right print:py-1 print:px-2">{item.profit.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className='mt-8 print:mt-2'>
        <h3 className="text-xl font-semibold mb-4 print:mb-1 text-center print:text-base">Айдын анализи</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 text-center">
            <div className="p-4 border rounded-lg bg-gray-50 print:p-2 print:text-xs print:break-inside-avoid">
                <p className="text-lg print:text-sm">Эң көп сатуу болгон жума:</p>
                <p className="font-bold text-green-600 text-xl print:text-base">{weekWithMostSales.week}</p>
                <p className="text-2xl font-bold my-1 print:text-lg">{weekWithMostSales.sales.toLocaleString()} сом</p>
                <p className="text-md print:text-xs">
                Ошол жумада эң көп сатылган: <span className="font-bold text-blue-600">{weekWithMostSales.topItem}</span>
                </p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50 print:p-2 print:text-xs print:break-inside-avoid">
                <p className="text-lg print:text-sm">Жалпы айлык пайда:</p>
                <p className="text-3xl font-bold my-2 text-green-700 print:text-xl">{totalProfit} сом</p>
            </div>
        </div>
      </div>
    </div>
  );
});

export default MonthlyReport;
