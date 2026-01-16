import React, { useState, useEffect } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { sendMessage } from '../../lib/socket';
import OrderModal from './components/OrderModal';
import CompactOrder from './components/CompactOrder';

function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedOrder) {
      const freshOrder = orders.find(o => o.orderId === selectedOrder.orderId);
      if (!freshOrder || freshOrder.status !== selectedOrder.status) {
        setSelectedOrder(null);
      }
    }
  }, [orders, selectedOrder]);

  const toggleDeleteMode = () => {
    setDeleteMode(!isDeleteMode);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Бул буйрутманы чын эле өчүргүңүз келеби?')) {
      sendMessage({ type: 'delete_order', payload: { orderId } });
    }
  };

  const filteredOrders = orders.filter(order =>
    order.tableId.toString().includes(searchQuery)
  );

  const newOrders = filteredOrders.filter((o) => o.status === 'New').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const inProgressOrders = filteredOrders.filter((o) => o.status === 'In Progress').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const readyOrders = filteredOrders.filter((o) => o.status === 'Ready').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Буйрутмалар</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Үстөл боюнча издөө..."
            className="px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={toggleDeleteMode}
            className={`px-4 py-2 text-white font-semibold rounded-lg flex items-center space-x-2 shadow-md transform hover:scale-105 transition-all duration-200 ${
              isDeleteMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              {isDeleteMode 
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.93a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165a48.108 48.108 0 01-3.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.046-2.14h-1.562M2.25 5.79h19.5" />
              }
            </svg>
            <span>{isDeleteMode ? 'Артка' : 'Тазалоо'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* New */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4 text-blue-600">Жаңы ({newOrders.length})</h2>
          <div className="grid grid-cols-[repeat(auto-fit,8rem)] justify-center gap-4">
            {newOrders.map((order) => (
              <CompactOrder 
                key={order.orderId} 
                order={order} 
                onClick={() => !isDeleteMode && setSelectedOrder(order)}
                isDeleteMode={isDeleteMode}
                onDelete={() => handleDeleteOrder(order.orderId)}
              />
            ))}
          </div>
        </div>
        {/* In Progress */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4 text-yellow-600">Даярдалууда ({inProgressOrders.length})</h2>
          <div className="grid grid-cols-[repeat(auto-fit,8rem)] justify-center gap-4">
            {inProgressOrders.map((order) => (
              <CompactOrder 
                key={order.orderId} 
                order={order} 
                onClick={() => !isDeleteMode && setSelectedOrder(order)}
                isDeleteMode={isDeleteMode}
                onDelete={() => handleDeleteOrder(order.orderId)}
              />
            ))}
          </div>
        </div>
        {/* Ready */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4 text-green-600">Даяр ({readyOrders.length})</h2>
          <div className="grid grid-cols-[repeat(auto-fit,8rem)] justify-center gap-4">
            {readyOrders.map((order) => (
              <CompactOrder 
                key={order.orderId} 
                order={order} 
                onClick={() => !isDeleteMode && setSelectedOrder(order)}
                isDeleteMode={isDeleteMode}
                onDelete={() => handleDeleteOrder(order.orderId)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}

export default OrdersPage;
