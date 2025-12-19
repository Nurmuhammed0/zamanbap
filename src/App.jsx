import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './lib/socket'; // WebSocket туташуусун баштоо үчүн импорттойбуз

// Дүкөндөрдү жана баракчаларды импорттоо
import { useOrderStore } from './store/orderStore';
import { useMenuStore } from './store/menuStore'; // Меню дүкөнүн импорттоо
import AdminLayout from './components/layout/AdminLayout';
import CartPage from './features/cart/CartPage';
import OrderStatusPage from './features/order-tracking/OrderStatusPage';
import MyOrdersPage from './pages/MyOrdersPage'; // MyOrdersPage'ди импорттоо
import AdminDashboard from './features/admin/AdminDashboard';
import OrdersPage from './features/admin/OrdersPage';
import MenuEditor from './features/admin/MenuEditor';
import StatisticsPage from './features/admin/StatisticsPage';
import TableManagerPage from './features/admin/TableManagerPage';
import InstructionsPage from './features/admin/InstructionsPage';
import CashierPage from './features/admin/CashierPage'; // Касса барагын импорттоо
import NotFoundPage from './pages/NotFoundPage';
import RegistrationPage from './features/auth/RegistrationPage';
import LoginPage from './features/auth/LoginPage';
import Root from './pages/Root';

// Буйрутма статусунун тексттерин которуу үчүн
const getStatusText = (status) => {
  switch (status) {
    case 'New': return 'Жаңы буйрутма';
    case 'In Progress': return 'Даярдалууда';
    case 'Ready': return 'Даяр болду';
    case 'Completed': return 'Аткарылды';
    case 'Paid': return 'Төлөндү';
    default: return 'Статус белгисиз';
  }
};

// Статус баннеринин стилдери
const getStatusClasses = (status) => {
  switch (status) {
    case 'New': return 'bg-blue-500';
    case 'In Progress': return 'bg-yellow-500';
    case 'Ready': return 'bg-green-500';
    case 'Completed': return 'bg-gray-500';
    case 'Paid': return 'bg-green-600'; // Түс кошулду
    default: return 'bg-gray-400';
  }
};

function App() {
  // Бул useEffect WebSocket-серверден келген билдирүүлөрдү угуп жана эски буйрутмаларды тазалап турат
  useEffect(() => {
    // Колдонмо жүктөлгөндө, 2 сааттан эски буйрутмаларды тазалайбыз
    useOrderStore.getState().clearExpiredOrders();

    const handleSocketMessage = (event) => {
      const data = event.detail;
      
      // Серверден келген маалыматтын түрүнө жараша тиешелүү store'ду жаңылайбыз
      // Кодду окууга ыңгайлуу болуш үчүн "if" ордуна "switch" колдонобуз
      switch (data.type) {
        // --- Менюну башкаруу ---
        case 'initial_menu':
        case 'menu_updated':
          useMenuStore.getState().setMenuState(data.payload);
          break;

        // --- Буйрутмаларды башкаруу ---
        case 'initial_orders':
          useOrderStore.setState({ orders: data.payload });
          break;
        case 'orders_updated':
          useOrderStore.getState().handleOrdersUpdate(data.payload);
          break;
        
        case 'order_created':
          useOrderStore.getState().setCurrentOrder(data.payload);
          break;
        
        case 'new_order_received':
          useOrderStore.setState((state) => ({ orders: [data.payload, ...state.orders] }));
          break;
        
        case 'order_updated': // Бул эски, бирок кардар үчүн калтырылды
          useOrderStore.getState().updateOrderStatus(data.payload.id, data.payload.newStatus);
          break;
      }
    };

    // 'socket-message' аттуу глобалдык окуяны угууну баштайбыз
    window.addEventListener('socket-message', handleSocketMessage);

    // Компонент жок болгондо, окуяны угууну токтотобуз
    return () => {
      window.removeEventListener('socket-message', handleSocketMessage);
    };
  }, []);

  return (
    <Router>
      <MainAppContent />
    </Router>
  );
}

function MainAppContent() {
  const isAdminAuthenticated = useOrderStore((state) => state.isAdminAuthenticated);
  const { clientActiveOrder, resetClientOrderStatus } = useOrderStore(state => ({
    clientActiveOrder: state.clientActiveOrder,
    resetClientOrderStatus: state.resetClientOrderStatus,
  }));
  const navigate = useNavigate();

  const activeOrderId = clientActiveOrder?.id;
  const activeOrderStatus = clientActiveOrder?.status;

  // Статус баннерин жабуу функциясы
  const handleCloseStatus = () => {
    resetClientOrderStatus();
    navigate('/'); // Башкы бетке кайтуу
  };

  return (
    <>
      {/* Клиенттин буйрутмасынын статусун көрсөтүүчү баннер */}
      {activeOrderId && activeOrderStatus && (
        <div className={`fixed top-0 left-0 w-full p-3 text-white text-center font-bold text-lg z-50 flex justify-between items-center ${getStatusClasses(activeOrderStatus)}`}>
          <span>Буйрутма №{activeOrderId.slice(0, 4)}...: {getStatusText(activeOrderStatus)}</span>
          <button onClick={handleCloseStatus} className="text-white text-xl ml-4">&times;</button>
        </div>
      )}

      {/* Main Routes */}
      <Routes>
        {/* Кардардын маршруттары */}
        <Route path="/" element={<Root />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/:orderId" element={<OrderStatusPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Админдин маршруттары */}
        <Route
          path="/admin"
          element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cashier" element={<CashierPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="menu" element={<MenuEditor />} />
          <Route path="stats" element={<StatisticsPage />} />
          <Route path="tables" element={<TableManagerPage />} />
          <Route path="instructions" element={<InstructionsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
