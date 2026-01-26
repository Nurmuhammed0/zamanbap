import React, { useState, useRef, useCallback } from 'react'; // Add useCallback
import { useReactToPrint } from 'react-to-print';
import DailyReport from './DailyReport';
import WeeklyReport from './WeeklyReport';
import MonthlyReport from './MonthlyReport';
import { useOrderStore } from '../../store/orderStore';
import { useMenuStore } from '../../store/menuStore';

function StatisticsPage() {
  const [activeReport, setActiveReport] = useState(null); // 'daily', 'weekly', 'monthly', or null
  const { orders } = useOrderStore();
  const { items: menuItems } = useMenuStore();
  const reportContentRef = useRef(); // Ref for the entire report component instance

  const handlePrint = useReactToPrint({
    content: () => reportContentRef.current,
    documentTitle: `SmartCafe Report - ${new Date().toLocaleDateString()}`,
    pageStyle: `
      @page { size: A4 portrait; margin: 20mm; }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `,
  });

  const triggerPrint = useCallback(() => {
    handlePrint();
  }, [handlePrint]);
  
    // --- All-Time Stats based on PAID orders ---
    const paidOrders = orders.filter(o => o.status === 'Paid');
    const totalOrders = paidOrders.length;
  
    const { totalSales, totalProfit } = paidOrders.reduce(
      (acc, order) => {
        order.items.forEach(item => {
          const salePrice = item.basePrice; // Price at the time of sale
          const cost = item.cost || 0;
          acc.totalSales += salePrice * item.quantity;
          acc.totalProfit += (salePrice - cost) * item.quantity;
        });
        return acc;
      },
      { totalSales: 0, totalProfit: 0 }
    );
  
    const allTimePopularItems = paidOrders
      .flatMap(order => order.items)
      .reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + item.quantity;
        return acc;
      }, {});
  
    const sortedAllTimePopularItems = Object.entries(allTimePopularItems)
      .sort(([, a], [, b]) => b - a)
      .map(([id, count]) => {
        const menuItem = menuItems.find(mi => mi.id === id);
        return { name: menuItem ? menuItem.name : 'Белгисиз тамак', count };
      });
    
    const mostPopularItemAllTime = sortedAllTimePopularItems.length > 0 ? sortedAllTimePopularItems[0] : null;
  
    // --- Today's Stats for the Report (based on PAID orders) ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const todaysPaidOrders = orders.filter(o => {
      const orderDate = new Date(o.timestamp);
      return o.status === 'Paid' && orderDate >= today;
    });
  
    const totalOrdersToday = todaysPaidOrders.length;
    
    const { totalSalesToday, totalProfitToday } = todaysPaidOrders.reduce(
      (acc, order) => {
        order.items.forEach(item => {
          const salePrice = item.basePrice;
          const cost = item.cost || 0;
          acc.totalSalesToday += salePrice * item.quantity;
          acc.totalProfitToday += (salePrice - cost) * item.quantity;
        });
        return acc;
      },
      { totalSalesToday: 0, totalProfitToday: 0 }
    );
    
    const popularItemsToday = todaysPaidOrders
      .flatMap(order => order.items)
      .reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + item.quantity;
        return acc;
      }, {});
  
    const sortedPopularItemsToday = Object.entries(popularItemsToday)
      .sort(([, a], [, b]) => b - a)
      .map(([id, count]) => {
        const menuItem = menuItems.find(mi => mi.id === id);
        return { 
          name: menuItem ? menuItem.name : 'Белгисиз тамак', 
          count, 
          price: menuItem ? menuItem.price : 0,
          cost: menuItem ? menuItem.cost : 0,
        };
      });
  
    const top5PopularItems = sortedPopularItemsToday.slice(0, 5);
  
    const renderReportContent = () => {
      switch (activeReport) {
        case 'daily':
          return <DailyReport 
                    ref={reportContentRef}
                    stats={{
                      totalSalesToday,
                      totalOrdersToday,
                      totalProfitToday,
                      popularItems: sortedPopularItemsToday
                    }}
                  />;
        case 'weekly':
          return <WeeklyReport ref={reportContentRef} />;
        case 'monthly':
          return <MonthlyReport ref={reportContentRef} />;
        default:
          return null;
      }
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Статистика</h1>
          <button 
            onClick={() => setActiveReport('daily')}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>Жыйынтык</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Жалпы сатуулар</h2>
            <p className="text-4xl font-bold text-blue-500">{totalSales.toLocaleString()} сом</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Жалпы пайда</h2>
            <p className="text-4xl font-bold text-green-500">{totalProfit.toLocaleString()} сом</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Буйрутмалар</h2>
            <p className="text-4xl font-bold text-indigo-500">{totalOrders}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Эң көп сатылган</h2>
            <p className="text-3xl font-bold text-yellow-500 truncate" title={mostPopularItemAllTime?.name}>
              {mostPopularItemAllTime ? mostPopularItemAllTime.name : 'Азырынча жок'}
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Бүгүнкү эң көп сатылган 5 тамак</h2>
          <ul className="space-y-3">
            {top5PopularItems.length > 0 ? top5PopularItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-lg p-2 border-b">
                <span className="font-semibold">{index + 1}. {item.name}</span>
                <span className="font-bold bg-gray-200 px-3 py-1 rounded-full">{item.count} жолу</span>
              </li>
            )) : <p className="text-gray-500">Бүгүнкү күнгө аткарылган буйрутмалар жок.</p>}
          </ul>
        </div>
  
        {activeReport && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4 print:hidden" 
            onClick={() => setActiveReport(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Report Navigation */}
              <div className="flex justify-center border-b p-2 bg-gray-50 rounded-t-lg">
                  <button 
                      onClick={() => setActiveReport('daily')} 
                      className={`px-4 py-2 text-lg font-semibold rounded-md ${activeReport === 'daily' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                      Күндүк
                  </button>
                  <button 
                      onClick={() => setActiveReport('weekly')} 
                      className={`px-4 py-2 text-lg font-semibold rounded-md mx-2 ${activeReport === 'weekly' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                      Жумалык
                  </button>
                  <button 
                      onClick={() => setActiveReport('monthly')} 
                      className={`px-4 py-2 text-lg font-semibold rounded-md ${activeReport === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                      Айлык
                  </button>
              </div>
              
              {/* Report Content */}
              <div className="overflow-y-auto flex-grow">
                {renderReportContent()}
              </div>
  
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 p-4 border-t bg-gray-50 rounded-b-lg">
                <button 
                  onClick={() => setActiveReport(null)}
                  className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                  Жабуу
                </button>
                {activeReport && (
                  <button 
                    onClick={triggerPrint}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Басып чыгаруу</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

export default StatisticsPage;