import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

function OrderStatusPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    
    // getOrderById селекторун колдонуп, керектүү буйрутманы түз алабыз
    const order = useOrderStore(state => state.orders.find(o => o.id === orderId));

    // Эгерде колдонуучу баракты жаңыласа жана store тазаланса, 
    // WebSocket аркылуу маалымат келгенче күтүү керек болушу мүмкүн.
    // Азырынча, эгер буйрутма жок болсо, негизги бетке багыттайбыз.
    useEffect(() => {
        if (!order) {
            // Буйрутманы серверден сураган логиканы бул жерге кошсо болот.
            // Азырынча жөн гана күтөбүз же ката билдирүүсүн көрсөтөбүз.
            console.log(`Order with ID ${orderId} not found in store.`);
        }
    }, [order, orderId]);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
                <div className="text-2xl font-bold text-gray-700 mb-4">Буйрутма табылган жок...</div>
                <p className="text-gray-500 mb-6">Маалыматтар жүктөлүүдө же бул ID менен буйрутма жок.</p>
                <Link to="/" className="text-lg bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                    &larr; Башкы бетке кайтуу
                </Link>
            </div>
        );
    }
    
    // Датаны форматтоо
    const orderDate = new Date(order.createdAt).toLocaleString('ky-KG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-start p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg my-8 p-6 font-sans">
                {/* Header */}
                <div className="text-center mb-6">
                    {order.cafeName && <p className="text-xl font-bold text-gray-800 mb-2">{order.cafeName}</p>}
                    <h1 className="text-2xl font-bold text-gray-800">Сиздин буйрутмаңыз</h1>
                    <p className="text-gray-500 text-sm">(Дүмүрчөк)</p>
                </div>

                {/* Order Info */}
                <div className="flex justify-between text-sm text-gray-600 mb-4 pb-2 border-b-2 border-dashed">
                    <div>
                        <p><strong>Буйрутма ID:</strong> {order.id.slice(0, 8)}...</p>
                        <p><strong>Үстөл №:</strong> {order.tableId}</p>
                    </div>
                    <div className="text-right">
                        <p><strong>Дата:</strong></p>
                        <p>{orderDate}</p>
                    </div>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                    {order.items.map(item => {
                        const itemLineTotal = item.itemTotal ?? ((item.basePrice || 0) + (item.optionsPrice || 0)) * item.quantity;
                        return (
                            <div key={item.cartItemId || item.id} className="flex justify-between items-center text-sm">
                                <span className="flex-grow">{item.quantity} x {item.name}</span>
                                <span className="font-bold w-24 text-right">{itemLineTotal} сом</span>
                            </div>
                        );
                    })}
                </div>

                {/* Total */}
                <div className="border-t-2 border-dashed pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-extrabold text-gray-900">
                        <span>Жалпы сумма:</span>
                        <span>{order.totalAmount} сом</span>
                    </div>
                </div>

                {/* Status */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">Учурдагы абалы:</p>
                    <p className="font-bold text-lg bg-yellow-100 text-yellow-800 rounded-full px-4 py-1 inline-block">
                        {order.status}
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-md hover:bg-blue-600 transition"
                    >
                        Башкы бетке кайтуу
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderStatusPage;