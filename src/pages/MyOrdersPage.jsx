import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer.jsx';
import { useOrderStore } from '../store/orderStore';
import Logo from '../components/Logo'; // Import the new Logo component

const TWENTY_FOUR_HOURS_IN_SECONDS = 24 * 60 * 60;

// Helper function for status text (copied from MenuPage/App for now)
const getStatusText = (status) => {
  switch (status) {
    case 'New': return 'Күтүүдө';
    case 'In Progress': return 'Даярдалууда';
    case 'Ready': return 'Даяр';
    case 'Completed': return 'Аткарылды';
    case 'Paid': return 'Төлөндү';
    default: return status;
  }
};

const statusOrder = ['New', 'In Progress', 'Ready', 'Completed', 'Paid'];

const getCardStyle = (status) => {
  switch (status) {
    case 'New':
      return 'border-blue-500';
    case 'In Progress':
      return 'border-yellow-500';
    case 'Ready':
      return 'border-green-500';
    case 'Completed':
      return 'border-gray-500';
    case 'Paid':
      return 'border-purple-500';
    default:
      return 'border-cafe-primary';
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

  const sortedOrders = [...clientOrderHistory].sort((a, b) => {
    const statusA = statusOrder.indexOf(a.status);
    const statusB = statusOrder.indexOf(b.status);
    return statusA - statusB;
  });

  // New PaidOrderReceipt component
  const PaidOrderReceipt = ({ order, onComplete, cafeName }) => {
    const paidDate = order.statusChangeTimestamp ? new Date(order.statusChangeTimestamp) : new Date(order.timestamp);
    const formattedDate = paidDate.toLocaleDateString('kg-KG', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = paidDate.toLocaleTimeString('kg-KG', { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="bg-white p-6 rounded-lg shadow-xl border-t-8 border-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <Logo className="w-64 h-64 text-cafe-accent opacity-20" />
        </div>
        <div className="relative z-10">
          <div className="text-center mb-6">
            {cafeName && <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{cafeName}</h2>}
            <p className="text-sm text-gray-600">ZamanBap</p>
            <p className="text-sm text-gray-600">{formattedDate} {formattedTime}</p>
          </div>

          <div className="flex justify-between items-center mb-4 pb-2 border-b border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-800">Буйрутма</h3>
            <span className="text-md text-gray-700">Үстөл: #{order.tableId}</span>
          </div>

          <ul className="space-y-3 mb-4 pb-4 border-b border-dashed border-gray-300">
            {order.items.map((item) => {
              const itemLineTotal = item.itemTotal ?? ((item.basePrice || 0) + (item.optionsPrice || 0)) * item.quantity;
              const singleItemPrice = (item.basePrice || 0) + (item.optionsPrice || 0);
              return (
                <li key={item.cartItemId || item.id} className="flex justify-between items-center text-md text-gray-800">
                  <div>
                    <span className="font-semibold">{item.quantity} x {item.name}</span>
                    <p className="text-xs text-gray-500 pl-2">Баасы: {singleItemPrice} сом</p>
                  </div>
                  <span className="font-bold">{itemLineTotal} сом</span>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between items-center text-xl font-bold text-gray-900 mt-4">
            <span>Жалпы сумма:</span>
            <span>{order.totalAmount} сом</span>
          </div>

          <div className="mt-6 text-center text-gray-700">
            <p>Төлөндү!</p>
            <p className="text-sm">Буйрутмаңыз үчүн чоң рахмат!</p>
            <CountdownTimer
              key={order.id + '-paid-receipt'}
              timestamp={order.statusChangeTimestamp}
              duration={TWENTY_FOUR_HOURS_IN_SECONDS}
              onComplete={onComplete}
            />
          </div>
        </div>
      </div>
    );
  };

  if (sortedOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-cafe-background text-gray-800 p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Буйрутмаларыңыз жок</h1>
        <p className="text-gray-600 mb-6">Сизде акыркы 24 сааттын ичинде эч кандай буйрутма жок.</p>
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
        {sortedOrders.map((order) => {
          const isPaid = order.status === 'Paid';
          
          if (isPaid) {
            return <PaidOrderReceipt key={order.id} order={order} onComplete={clearExpiredOrders} cafeName={order.cafeName} />;
          }

          return (
            <div key={order.id} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${getCardStyle(order.status)}`}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Үстөл #{order.tableId}</h2>
                <CountdownTimer
                  key={order.id + '-default'}
                  timestamp={order.timestamp}
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
