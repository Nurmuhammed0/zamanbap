import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import Logo from '../Logo'; // Import the new Logo component

function AdminLayout() {
  const logoutAdmin = useOrderStore((state) => state.logoutAdmin);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const activeLinkClass = "bg-cafe-primary text-white";
  const inactiveLinkClass = "hover:bg-gray-700 hover:text-white";

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center mb-6">
        <Logo className="w-10 h-10 text-cafe-accent" />
        <h1 className="text-2xl font-bold text-white ml-2">Заманбап</h1>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <NavLink to="/admin/dashboard" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>Башкы бет</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/admin/orders" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <span>Буйрутмалар</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/admin/cashier" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
              <span>Касса</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/admin/menu" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              <span>Менюну өзгөртүү</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/admin/stats" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              <span>Статистика</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/admin/tables" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
              <span>Үстөлдөрдү башкаруу</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/admin/instructions" className={({ isActive }) => `block p-2 rounded ${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-3`} onClick={() => setSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              <span>Көрсөтмө</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        onClick={logoutAdmin}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
        <span>Чыгуу</span>
      </button>
    </>
  );

  return (
    <div className="relative min-h-screen md:flex">
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black opacity-50 z-10 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar for mobile (conditionally rendered) */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-gray-300 flex-col p-4 z-20 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Sidebar for desktop */}
      <aside className="w-64 bg-gray-800 text-gray-300 flex-col p-4 hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header for mobile with Hamburger button */}
        <header className="p-4 bg-white shadow-md md:hidden flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-cafe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              <h1 className="text-xl font-bold text-cafe-primary ml-2">Заманбап</h1>
            </div>
            <button onClick={() => setSidebarOpen(true)} className="text-gray-700 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </header>
        <div className="p-2 sm:p-4 md:p-6 bg-gray-200 min-h-screen">
            <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;