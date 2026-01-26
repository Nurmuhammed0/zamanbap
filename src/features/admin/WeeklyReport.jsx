import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react';
import { toPng } from 'html-to-image'; // Import toPng
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, getDate, getWeek, getDay, isSameDay } from 'date-fns';
import { enUS, ru } from 'date-fns/locale'; // Import locales
import { useCafeStore } from '../../store/cafeStore';

// Helper function to get week range for a given date
const getWeekRange = (date, locale) => {
  const start = startOfWeek(date, { locale: locale, weekStartsOn: 1 }); // Monday as start of week
  const end = endOfWeek(date, { locale: locale, weekStartsOn: 1 }); // Sunday as end of week
  return {
    startDate: start,
    endDate: end,
    formattedRange: `${format(start, 'd-MMM', { locale: locale })} - ${format(end, 'd-MMM', { locale: locale })}`
  };
};

// Function to generate fake weekly data
const generateFakeWeeklyData = (startDate, locale) => {
  const data = [];
  const dayNames = ['Дүйшөмбү', 'Шейшемби', 'Шаршемби', 'Бейшемби', 'Жума', 'Ишемби', 'Жекшемби'];
  const topItems = ['Кофе', 'Чай', 'Бургер', 'Пицца', 'Сэндвич', 'Салат', 'Десерт'];

  for (let i = 0; i < 7; i++) {
    const currentDay = addWeeks(startDate, 0); // Start from startDate
    const dayDate = addWeeks(currentDay, i);

    // Simple fake data logic
    const sales = 3000 + Math.floor(Math.random() * 5000);
    const profit = Math.floor(sales * 0.3 + Math.random() * 500); // 30% profit margin
    const topItem = topItems[Math.floor(Math.random() * topItems.length)];

    data.push({
      day: dayNames[i], // Use fixed Kyrgyz day names
      sales,
      profit,
      topItem,
      date: dayDate, // Keep date object for reference
    });
  }
  return data;
};

const WeeklyReport = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPrinting, setIsPrinting] = useState(false); // New state for print detection
  const [chartImageUrl, setChartImageUrl] = useState(null); // New state for chart image
  const chartRef = useRef(null); // New ref for the chart container

  const currentMonth = new Date(); // Represents the current month for week calculation
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(1); // Default to 1st week
  const [locale, setLocale] = useState(ru); // Default to Russian locale for date-fns
  const cafeName = useCafeStore((state) => state.cafeName);

  useEffect(() => {
    const mediaQuery = window.matchMedia('print');
    const handlePrintChange = async (e) => { // Make async
      setIsPrinting(e.matches);
      if (e.matches && chartRef.current) {
        // Generate image when entering print mode
        try {
          setChartImageUrl(null); // Clear previous image
          // For html-to-image, it's better to capture the chart's direct container
          const dataUrl = await toPng(chartRef.current, { backgroundColor: '#ffffff' });
          setChartImageUrl(dataUrl);
        } catch (error) {
          console.error('Error generating chart image for print:', error);
          setChartImageUrl(null);
        }
      } else if (!e.matches) {
        setChartImageUrl(null); // Clear image when exiting print mode
      }
    };
    mediaQuery.addListener(handlePrintChange);

    setLocale(ru);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeListener(handlePrintChange); // Clean up media query listener
    };
  }, [chartRef, isPrinting]); // Add chartRef and isPrinting to dependencies

  // Calculate the start date of the selected week in the current month
  const getStartDateForSelectedWeek = (monthDate, weekNumber) => {
    let firstDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    let startOfFirstWeek = startOfWeek(firstDayOfMonth, { locale: locale, weekStartsOn: 1 });
    
    // If the firstMonday is in the previous month, that's fine as per the example (Dec 29 for Jan 1)
    let targetWeekStartDate = addWeeks(startOfFirstWeek, weekNumber - 1);
    return targetWeekStartDate;
  };

  const startDateOfWeek = getStartDateForSelectedWeek(currentMonth, selectedWeekNumber);
  const { formattedRange } = getWeekRange(startDateOfWeek, locale);
  const weeklyData = generateFakeWeeklyData(startDateOfWeek, locale);

  const formatXAxis = (tickItem) => {
    if (isMobile) {
      switch (tickItem) {
        case 'Дүйшөмбү': return 'Дүй';
        case 'Шейшемби': return 'Шей';
        case 'Шаршемби': return 'Шар';
        case 'Бейшемби': return 'Бей';
        case 'Жума': return 'Жум';
        case 'Ишемби': return 'Ише';
        case 'Жекшемби': return 'Жек';
        default: return tickItem;
      }
    }
    return tickItem;
  };

  const dayWithMostSales = weeklyData.reduce((max, day) => (day.sales > max.sales ? day : max), weeklyData[0]);
  const totalProfit = weeklyData.reduce((sum, day) => sum + day.profit, 0);

  return (
    <div ref={ref} className="p-4 md:p-8 w-full print:p-2 print:text-xs">
      <div className="flex items-center mb-4 relative print:mb-1">
        <div className="flex-grow text-center">
          <h1 className="text-3xl print:text-xl font-bold mb-1 text-gray-900">{cafeName}</h1>
          <h2 className="text-2xl print:text-lg font-bold text-gray-800 print:mb-0">Жумалык жыйынтык</h2>
        </div>
        <div className="print:hidden absolute right-4 top-0">
          <select
            id="week-select"
            className="p-2 border rounded-md"
            value={selectedWeekNumber}
            onChange={(e) => setSelectedWeekNumber(parseInt(e.target.value))}
          >
            <option value={1}>1-Жума</option>
            <option value={2}>2-Жума</option>
            <option value={3}>3-Жума</option>
            <option value={4}>4-Жума</option>
          </select>
        </div>
      </div>
      <div className="mb-6 text-center print:mb-1">
        <p className="text-lg print:text-sm">Тандалган жума: ({formattedRange})</p>
      </div>

      <div className="mb-8 print:mb-2">
        <h3 className="text-xl font-semibold mb-4 text-center print:mb-1 print:text-base">Күнүмдүк сатуулар</h3>
        {isPrinting && chartImageUrl ? (
          <img src={chartImageUrl} alt="Жумалык сатуулар диаграммасы" style={{ width: '100%', maxWidth: '600px', height: '300px', display: 'block' }} className="print:max-w-full print:h-[200px]" />
        ) : isPrinting && !chartImageUrl ? (
          <p className="text-center text-gray-500 print:text-xs">Диаграмма басып чыгаруу үчүн даярдалууда...</p>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '300px' }}> {/* Apply ref here */}
            <ResponsiveContainer width="100%" height="100%"> {/* Use 100% height relative to parent div */}
              <BarChart data={weeklyData} margin={{ top: 5, right: isMobile ? 0 : 20, left: isMobile ? -20 : -10, bottom: 5 }} isAnimationActive={false}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Сатуулар (сом)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-8 print:mt-2">
        <h3 className="text-xl font-semibold mb-4 text-center print:mb-1 print:text-base">Жыйынтык таблицасы</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm border border-collapse print:text-xs">
                <thead className="bg-gray-100 print:bg-transparent">
                    <tr>
                        <th className="py-2 px-3 border text-left print:py-1 print:px-2">Күн</th>
                        <th className="py-2 px-3 border text-right print:py-1 print:px-2">Сатуулар (сом)</th>
                        <th className="py-2 px-3 border text-right print:py-1 print:px-2">Пайда (сом)</th>
                    </tr>
                </thead>
                <tbody>
                    {weeklyData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3 border print:py-1 print:px-2">{item.day}</td>
                            <td className="py-2 px-3 border text-right print:py-1 print:px-2">{item.sales.toLocaleString()}</td>
                            <td className="py-2 px-3 border text-right print:py-1 print:px-2">{item.profit.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className='mt-8 print:mt-2'>
        <h3 className="text-xl font-semibold mb-4 text-center print:mb-1 print:text-base">Жуманын анализи</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center print:grid-cols-2 print:gap-2">
          <div className="p-4 border rounded-lg bg-gray-50 print:p-2 print:text-xs print:break-inside-avoid">
            <p className="text-lg print:text-sm">Эң көп сатуу болгон күн:</p>
            <p className="font-bold text-green-600 text-xl print:text-base">{dayWithMostSales.day}</p>
            <p className="text-2xl font-bold my-1 print:text-lg">{dayWithMostSales.sales} сом</p>
            <p className="text-md print:text-xs">
              Ошол күнү эң көп сатылган: <span className="font-bold text-blue-600">{dayWithMostSales.topItem}</span>
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-green-50 print:p-2 print:text-xs print:break-inside-avoid">
            <p className="text-lg print:text-sm">Жалпы жумалык пайда:</p>
            <p className="text-3xl font-bold my-2 text-green-700 print:text-xl">{totalProfit} сом</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WeeklyReport;