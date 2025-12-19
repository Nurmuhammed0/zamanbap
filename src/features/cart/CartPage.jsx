import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from './cart.store';
import { useOrderStore } from '../../store/orderStore';
import { sendMessage } from '../../lib/socket';

function CartPage() {
  const navigate = useNavigate();
  // State
  const { items, tableId, updateQuantity, removeFromCart, getTotal, clearCart } = useCartStore();
  const clientActiveOrder = useOrderStore(state => state.clientActiveOrder);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Effect to watch for order confirmation
  useEffect(() => {
    // If we were placing an order and the clientActiveOrder has been set by the server,
    // then the order is confirmed. We can now clear the cart and navigate.
    if (isPlacingOrder && clientActiveOrder) {
      clearCart();
      setIsPlacingOrder(false);
      navigate(`/?table=${tableId}`); // Redirect back to menu for the same table
    }
    // This effect should only run when isPlacingOrder or clientActiveOrder changes.
  }, [isPlacingOrder, clientActiveOrder, clearCart, navigate, tableId]);
  
  const handlePlaceOrder = () => {
    if (items.length === 0 || !tableId) {
      alert("Себет бош же үстөлдүн номери аныкталган эмес!");
      return;
    }

    // Set loading state to true and disable the button
    setIsPlacingOrder(true);

    const newOrderPayload = {
      tableId: tableId,
      items: items.map(({ cartItemId, ...rest }) => rest), // Remove client-only properties
      totalAmount: getTotal(),
    };

    // Send the message. The useEffect above will handle the success case.
    sendMessage({ type: 'new_order', payload: newOrderPayload });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-cafe-background">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Себет бош</h1>
        <p className="text-gray-600 mb-6">Менюдан бир нерсе тандап, кайра келиңиз.</p>
        <button
          onClick={() => navigate(tableId ? `/?table=${tableId}` : '/')}
          className="bg-cafe-primary text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span>Менюга кайтуу</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl min-h-screen bg-cafe-background">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cafe-primary">Сиздин себетиңиз</h1>
        <button onClick={() => navigate(tableId ? `/?table=${tableId}` : '/')} className="text-sm text-gray-600 hover:underline flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span>Менюга кайтуу</span>
        </button>
      </header>

      {/* Cart Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center bg-white p-4 rounded-lg shadow">
            <img src={item.imageUrl} alt={item.name} className="min-w-[48px] min-h-[48px] w-[48px] h-[48px] rounded-md object-cover mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{item.name}</h3>
              {item.selectedOptions.length > 0 && (
                 <p className="text-sm text-gray-500">
                   {item.selectedOptions.map(opt => opt.choiceName || opt.name).join(', ')}
                 </p>
              )}
            </div>
            <div className="flex flex-col items-end ml-4">
              <div className="flex items-center space-x-3 mb-2">
                <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="p-1 w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center hover:bg-gray-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg></button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="p-1 w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center hover:bg-gray-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg></button>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{item.itemTotal} сом</p>
                <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500 hover:text-red-700 mt-1 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.93a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165a48.108 48.108 0 01-3.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.046-2.14h-1.562M2.25 5.79h19.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Жалпы сумма:</span>
          <span>{getTotal()} сом</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Салыктар жана тейлөө акысы баага кошулган.</p>
      </div>

      {/* Place Order Button */}
      <div className="mt-6">
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full bg-cafe-accent text-white font-extrabold py-4 px-4 rounded-lg text-xl transition-colors flex justify-center items-center disabled:bg-orange-300"
        >
          {isPlacingOrder ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Буйрутма жөнөтүлүүдө...
            </>
          ) : (
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              <span>Буйрутма берүү</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default CartPage;
