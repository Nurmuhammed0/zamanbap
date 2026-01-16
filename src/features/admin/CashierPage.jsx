import React, { useState, useEffect, useRef } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useReactToPrint } from 'react-to-print';
import { sendMessage } from '../../lib/socket'; // Import sendMessage
import CompactOrder from './components/CompactOrder';

const ReceiptModal = ({ order, onClose }) => {
  const componentRef = useRef();
  const [cafeName, setCafeName] = useState('');

  useEffect(() => {
    const storedCafeName = localStorage.getItem('cafeName');
    if (storedCafeName) {
      setCafeName(storedCafeName);
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Чек - Стол #${order?.tableId}`,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 2mm;
      }
      body {
        -webkit-print-color-adjust: exact;
        font-family: monospace;
        font-size: 10pt;
      }
    `
  });

  const handleMarkAsPaid = () => {
    if (!order) return;
    sendMessage({ type: 'mark_as_paid', payload: { orderId: order.orderId } });
    onClose(); // Close the modal immediately
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
        {/* Printable Area */}
        <div ref={componentRef} className="p-2 text-black">
          {cafeName && <h2 className="text-xl font-bold text-center">{cafeName}</h2>}
          <p className="text-center text-xs">Чек</p>
          <div className="text-xs my-2 border-t border-b border-dashed border-black py-1">
            <p>Дата: {new Date(order.timestamp).toLocaleDateString()}</p>
            <p>Убактысы: {new Date(order.timestamp).toLocaleTimeString()}</p>
            <p className="font-bold">Стол #{order.tableId}</p>
          </div>
          <div className="space-y-1 text-xs py-2">
            {order.items.map(item => (
              <div key={item.cartItemId || item.id} className="grid grid-cols-3 gap-1">
                <span className="col-span-2">{item.quantity} x {item.name}</span>
                <span className="text-right">{item.itemTotal}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-sm mt-2 border-t border-black pt-2">
            <span>Жалпы:</span>
            <span>{order.totalAmount} сом</span>
          </div>
           <p className="text-center text-xs mt-4">Келгениңизге рахмат!</p>
        </div>
        {/* End Printable Area */}

        <div className="flex justify-center space-x-2 mt-4 pt-4 border-t">
            <button 
              onClick={handleMarkAsPaid} 
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow-md transform hover:scale-105 transition-all duration-200"
            >
                Төлөндү
            </button>
            <button 
              onClick={handlePrint} 
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold shadow-md transform hover:scale-105 transition-all duration-200"
            >
                Чыгаруу
            </button>
            <button 
              onClick={onClose} 
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold shadow-md transform hover:scale-105 transition-all duration-200"
            >
                Жабуу
            </button>
        </div>
      </div>
    </div>
  );
};


function CashierPage() {
  const orders = useOrderStore((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order =>
    order.tableId.toString().includes(searchQuery)
  );

  const completedOrders = filteredOrders.filter((o) => o.status === 'Completed').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Касса</h1>
        <input
          type="text"
          placeholder="Үстөл боюнча издөө..."
          className="px-4 py-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-700">Аткарылган буйрутмалар ({completedOrders.length})</h2>
          {completedOrders.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,8rem)] justify-center gap-4">
                {completedOrders.map((order) => (
                <CompactOrder key={order.orderId} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Аткарылган буйрутмалар жок.</p>
          )}
      </div>

      {selectedOrder && <ReceiptModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}

export default CashierPage;
