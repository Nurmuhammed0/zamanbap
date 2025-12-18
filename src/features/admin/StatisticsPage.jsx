import React, { useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useMenuStore } from '../../store/menuStore';
import DailyReport from './DailyReport';

function StatisticsPage() {
  const [showReport, setShowReport] = useState(false);
  const { orders } = useOrderStore();
  const { items: menuItems } = useMenuStore();

  // --- All-Time Stats based on PAID orders ---
  const paidOrders = orders.filter(o => o.status === 'Paid');
  const totalSales = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = paidOrders.length;
  
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

  const totalSalesToday = todaysPaidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrdersToday = todaysPaidOrders.length;
  const averageOrderValueToday = totalOrdersToday > 0 ? (totalSalesToday / totalOrdersToday).toFixed(2) : 0;
  
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
      return { name: menuItem ? menuItem.name : 'Белгисиз тамак', count, price: menuItem ? menuItem.price : 0 };
    });

  const top5PopularItems = sortedPopularItemsToday.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Статистика</h1>
        <button 
          onClick={() => setShowReport(true)}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span>Жыйынтык</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Жалпы сатуулар</h2>
          <p className="text-4xl font-bold text-green-500">{totalSales} сом</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Буйрутмалардын саны</h2>
          <p className="text-4xl font-bold text-blue-500">{totalOrders}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Эң көп сатылган</h2>
          <p className="text-3xl font-bold text-yellow-500 truncate" title={mostPopularItemAllTime?.name}>
            {mostPopularItemAllTime ? mostPopularItemAllTime.name : 'Азырынча жок'}
          </p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Бүгүнкү буйрутмалар</h2>
        <ul className="space-y-3">
          {top5PopularItems.length > 0 ? top5PopularItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-lg p-2 border-b">
              <span className="font-semibold">{index + 1}. {item.name}</span>
              <span className="font-bold bg-gray-200 px-3 py-1 rounded-full">{item.count} жолу</span>
            </li>
          )) : <p className="text-gray-500">Бүгүнкү күнгө аткарылган буйрутмалар жок.</p>}
        </ul>
      </div>

      {showReport && (
        <DailyReport 
          stats={{
            totalSalesToday,
            totalOrdersToday,
            averageOrderValueToday,
            popularItems: sortedPopularItemsToday
          }}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}


export default StatisticsPage;
