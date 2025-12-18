import React from 'react';
import { sendMessage } from '../../../lib/socket';

const OrderCard = ({ order }) => {
  const updateStatus = (newStatus) => {
    sendMessage({ type: 'update_status', payload: { orderId: order.orderId, newStatus } });
  };

  const statusColors = {
    'New': 'border-blue-500',
    'In Progress': 'border-yellow-500',
    'Ready': 'border-green-500',
    'Completed': 'border-gray-500',
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${statusColors[order.status]}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Үстөл #{order.tableId}</h3>
        <span className="text-sm text-gray-500">
          {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <ul className="mb-3 space-y-2">
        {order.items.map((item) => {
          const itemLineTotal = item.itemTotal ?? ((item.basePrice || 0) + (item.optionsPrice || 0)) * item.quantity;
          const singleItemPrice = (item.basePrice || 0) + (item.optionsPrice || 0);
          return (
            <li key={item.cartItemId || item.id} className="flex justify-between items-center text-sm text-gray-700">
                <div>
                    <span className="font-semibold">{item.quantity} x {item.name}</span>
                    <p className="text-xs text-gray-500 pl-2">
                        Баасы: {singleItemPrice} сом
                    </p>
                </div>
                <span className="font-bold">{itemLineTotal} сом</span>
            </li>
          );
        })}
      </ul>
      <p className="font-bold text-right mb-4">{order.totalAmount} сом</p>
      <div className="flex justify-end space-x-2">
        {order.status === 'New' && (
          <button
            onClick={() => updateStatus('In Progress')}
            className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded hover:bg-yellow-600"
          >
            Даярдоону баштоо
          </button>
        )}
        {order.status === 'In Progress' && (
          <button
            onClick={() => updateStatus('Ready')}
            className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600"
          >
            Даяр болду
          </button>
        )}
        {order.status === 'Ready' && (
          <button
            onClick={() => updateStatus('Completed')}
            className="px-3 py-1 bg-gray-500 text-white text-sm font-semibold rounded hover:bg-gray-600"
          >
            Аткарылды
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
