import React from 'react';
import { Link } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

function AdminDashboard() {
  const { orders } = useOrderStore();

  const activeOrdersCount = orders.filter(
    (order) => order.status === 'New' || order.status === 'In Progress'
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalSalesToday = orders
    .filter(order => {
      const orderDate = new Date(order.timestamp);
      return order.status === 'Paid' && orderDate >= today;
    })
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Башкаруу панели</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Активдүү буйрутмалар */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Активдүү буйрутмалар</h2>
          <p className="text-4xl font-bold text-blue-500">{activeOrdersCount}</p>
        </div>

        {/* Күндүк сатуулар */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Бүгүнкү сатуулар</h2>
          <p className="text-4xl font-bold text-green-500">{totalSalesToday} сом</p>
        </div>

        {/* Ыкчам шилтемелер */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Ыкчам шилтемелер</h2>
          <div className="flex flex-col space-y-2 mt-4">
            <Link to="/admin/orders" className="text-blue-600 hover:underline">
              Буйрутмалар панелин көрүү &rarr;
            </Link>
            <Link to="/admin/menu" className="text-blue-600 hover:underline">
              Менюну өзгөртүү &rarr;
            </Link>
             <Link to="/admin/stats" className="text-blue-600 hover:underline">
              Статистиканы көрүү &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
