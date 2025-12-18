import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenuStore } from '../../store/menuStore';
import { useCartStore } from '../cart/cart.store';
import { useOrderStore } from '../../store/orderStore'; // Order store'ду импорттоо
import { Html5QrcodeScanner } from 'html5-qrcode';

// Helper function for status text (copied from MenuPage/App for now)
const getStatusText = (status) => {
  switch (status) {
    case 'New': return 'Күтүүдө';
    case 'In Progress': return 'Даярдалууда';
    case 'Ready': return 'Даяр';
    case 'Completed': return 'Аткарылды';
    default: return status;
  }
};


const OrderStatusCard = ({ order, totalHistorySum }) => (
  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg shadow-lg mb-6 text-center">
    <h2 className="text-xl font-bold mb-2">Сиздин буйрутмаңыздын абалы</h2>
    <div className="flex justify-around items-center">
      <div>
        <p className="text-sm opacity-80">Статус</p>
        <p className="text-2xl font-bold">{getStatusText(order.status)}</p>
      </div>
      <div>
        <p className="text-sm opacity-80">Жалпы сумма</p>
        <p className="text-2xl font-bold">{totalHistorySum} сом</p>
      </div>
    </div>
  </div>
);

const ExistingOrderPrompt = ({ order, onOrderAgain }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 text-center">
    <h1 className="text-3xl font-bold mb-4">Акыркы буйрутмаңыз</h1>
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mb-6 text-left border-t-4 border-cafe-primary">
      <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-center">Чек</h2>
      <div className="flex justify-between text-gray-600 mb-4">
        <span>Үстөл: <span className="font-bold text-gray-800">#{order.tableId}</span></span>
        <span>Статус: <span className="font-bold text-gray-800">{getStatusText(order.status)}</span></span>
      </div>
      <ul className="mb-4 space-y-2">
        {order.items.map(item => (
          <li key={item.cartItemId || item.id} className="flex justify-between items-center text-sm">
            <span>{item.quantity} x {item.name}</span>
            <span className="font-semibold">{item.price * item.quantity} сом</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold text-lg border-t-2 border-dashed pt-3 mt-3">
        <span>Жалпы сумма:</span>
        <span>{order.totalAmount} сом</span>
      </div>
    </div>
    <button
      onClick={onOrderAgain}
      className="bg-cafe-primary text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:bg-cafe-primary-dark transition-transform transform hover:scale-105 flex items-center space-x-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l4.992-4.993m-4.993 0l-3.181 3.183a8.25 8.25 0 000 11.664l3.181 3.183" /></svg>
      <span>Менюга кайтуу</span>
    </button>
  </div>
);

const QRScannerPrompt = ({ onScan, onCancel }) => {
    const scannerRef = React.useRef(null);

    useEffect(() => {
        // scannerRef.current is used to ensure we only initialize the scanner once
        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'qr-scanner-container', 
                { 
                    fps: 10, 
                    qrbox: { width: 250, height: 250 },
                    rememberLastUsedCamera: true,
                },
                false // verbose
            );
            
            const handleScanSuccess = (decodedText, decodedResult) => {
                // Stop scanning after a successful scan
                scanner.clear().catch(error => {
                    console.error('Failed to clear scanner.', error);
                });
                onScan({ text: decodedText });
            };

            const handleScanError = (error) => {
                // This function is called frequently, so we only log specific errors
                // console.warn(`QR scan error: ${error}`);
            };

            scanner.render(handleScanSuccess, handleScanError);
            
            scannerRef.current = scanner;
        }

        // Cleanup function to clear the scanner on component unmount
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error('Failed to clear scanner on unmount.', error);
                });
                 scannerRef.current = null;
            }
        };
    }, [onScan]);

    return (
         <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">QR-кодду сканерлеңиз</h1>
            <div id="qr-scanner-container" className="w-full max-w-sm border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg"></div>
            <p className="text-sm text-gray-600 mt-4">Камераны QR-кодго багыттаңыз</p>
         </div>
    );
};


// --- Main Page Component ---

function MenuPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Global state
  const categories = useMenuStore((state) => state.categories);
  const items = useMenuStore((state) => state.items);
  const { setTableId, tableId, addToCart, items: cartItems } = useCartStore();
  const clientActiveOrder = useOrderStore((state) => state.clientActiveOrder);
  const clientOrderHistory = useOrderStore((state) => state.clientOrderHistory); // Тарыхты алуу

  const historyTotalSum = clientOrderHistory.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Local state
  const [showQrPrompt, setShowQrPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tableIdFromUrl = queryParams.get('table');

    if (tableIdFromUrl) {
      setTableId(tableIdFromUrl);
      setShowQrPrompt(false);
    } else if (!useCartStore.getState().tableId) {
      // If no tableId in URL or cart, show the prompt screen.
      // The prompt screen itself will decide whether to show QR or existing order.
      setShowQrPrompt(true);
    }
  }, [location.search, setTableId]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  
  const handleOrderAgain = () => {
    if (clientActiveOrder) {
      setTableId(clientActiveOrder.tableId);
      setShowQrPrompt(false);
    }
  };

  const handleScanResult = (result) => {
    if (result) {
      try {
        const url = new URL(result.text);
        const id = url.searchParams.get('table');
        if (id) {
          setTableId(id);
          setShowQrPrompt(false);
        } else {
          alert('Жараксыз QR-код: үстөл номери табылган жок.');
        }
      } catch (error) {
        alert('Жараксыз QR-код форматы.');
      }
    }
  };

  const filteredItems = items.filter(
    (item) => (selectedCategory === 'all' || item.categoryId === selectedCategory) && item.isAvailable
  );
  
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- RENDER LOGIC ---

  if (showQrPrompt) {
    return clientActiveOrder && clientActiveOrder.status !== 'Completed'
      ? <ExistingOrderPrompt order={clientActiveOrder} onOrderAgain={handleOrderAgain} />
      : <QRScannerPrompt onScan={handleScanResult} onCancel={() => { /* Since we are on the main page, cancel does nothing */ }} />;
  }

  return (
    <div className="container mx-auto p-4 pb-28">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cafe-primary">Меню</h1>
        {tableId && (
          <h2 className="text-xl font-semibold bg-gray-200 text-gray-700 px-4 py-1 rounded-full">
              Үстөл №{tableId}
            </h2>
        )}
      </header>
      
      {clientActiveOrder && clientActiveOrder.status !== 'Completed' && <OrderStatusCard order={clientActiveOrder} totalHistorySum={historyTotalSum} />}

      {clientOrderHistory.length > 0 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate('/my-orders')}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Буйрутмаларым ({clientOrderHistory.length})</span>
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-4">
        <button          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-cafe-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Баары
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-cafe-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => handleImageClick(item.imageUrl)}
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-1 flex-1">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-gray-900">{item.price} сом</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="bg-cafe-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  <span>Кошуу</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Cart Button */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-2 shadow-lg">
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-cafe-primary text-white font-bold py-3 px-4 rounded-lg text-lg flex justify-between items-center"
          >
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.828-6.491A1.125 1.125 0 0018.062 6H6.088a1.125 1.125 0 00-1.087.835L3.21 11.25m3.75-3.75h11.218" /></svg>
              <span>Себетти көрүү</span>
            </span>
            <span>{totalCartItems} тамак | {useCartStore.getState().getTotal()} сом</span>
          </button>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected food" className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg"/>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
