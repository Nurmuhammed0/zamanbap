import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer.jsx';
import { useOrderStore } from '../store/orderStore';

const FIVE_MINUTES_IN_SECONDS = 5 * 60;

// Helper function for status text (copied from MenuPage/App for now)
const getStatusText = (status) => {
  switch (status) {
    case 'New': return 'Күтүүдө';
    case 'In Progress': return 'Даярдалууда';
    case 'Ready': return 'Даяр';
    case 'Completed': return 'Төлөндү'; // Changed from 'Аткарылды' to 'Төлөндү'
    default: return status;
  }
};

function MyOrdersPage() {
  const navigate = useNavigate();
  const { clientOrderHistory, clearExpiredOrders } = useOrderStore((state) => ({
    clientOrderHistory: state.clientOrderHistory,
    clearExpiredOrders: state.clearExpiredOrders,
  }));

  // Get tableId from the most recent order.
  const lastTableId = clientOrderHistory[0]?.tableId;

  const handleReturnToMenu = () => {
    if (lastTableId) {
      navigate(`/?table=${lastTableId}`);
    } else {
      // Fallback if for some reason tableId is not available or history is empty
      navigate('/');
    }
  };

  if (clientOrderHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-cafe-background text-gray-800 p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Буйрутмаларыңыз жок</h1>
        <p className="text-gray-600 mb-6">Сизде акыркы 2 сааттын ичинде эч кандай буйрутма жок.</p>
        <button
          onClick={handleReturnToMenu}
          className="bg-cafe-primary text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span>Менюга кайтуу</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cafe-primary">Буйрутмаларым</h1>
        <button onClick={handleReturnToMenu} className="text-sm text-gray-600 hover:underline flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span>Менюга кайтуу</span>
        </button>
      </header>



      <div className="space-y-4">
        {clientOrderHistory.map((order) => {
          const isCompleted = order.status === 'Completed';
          const completionTimestamp = isCompleted ? (order.statusChangeTimestamp || order.timestamp) : order.timestamp;

          return (
            <div key={order.id} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${isCompleted ? 'border-green-500' : 'border-cafe-primary'}`}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Үстөл #{order.tableId}</h2>
                <CountdownTimer
                  key={order.id} // Add key to force re-mount on status change
                  timestamp={completionTimestamp}
                  duration={isCompleted ? FIVE_MINUTES_IN_SECONDS : undefined} // 5 mins for completed, otherwise default
                  onComplete={isCompleted ? clearExpiredOrders : undefined}
                />
              </div>
              <p className="text-sm text-gray-700 mb-2">Статус: <span className="font-semibold">{getStatusText(order.status)}</span></p>
              <ul className="space-y-2">
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
              <hr className="my-2" />
              <div className="text-right font-bold text-gray-800">
                Жалпы: {order.items.reduce((total, item) => {
                  const itemLineTotal = item.itemTotal ?? ((item.basePrice || 0) + (item.optionsPrice || 0)) * item.quantity;
                  return total + itemLineTotal;
                }, 0)} сом
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrdersPage;
