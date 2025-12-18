import React from 'react';

const CompactOrder = ({ order, onClick, isDeleteMode, onDelete }) => {
  const statusClasses = {
    'New': 'bg-blue-500 hover:bg-blue-600',
    'In Progress': 'bg-yellow-500 hover:bg-yellow-600',
    'Ready': 'bg-green-500 hover:bg-green-600',
    'Completed': 'bg-green-500 hover:bg-green-600', // For Cashier page
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`w-32 h-10 flex justify-center items-center rounded-lg text-white font-bold shadow-md transition-transform transform hover:scale-105 ${statusClasses[order.status] || 'bg-gray-500'} ${isDeleteMode ? 'cursor-not-allowed' : ''}`}
        disabled={isDeleteMode}
      >
        <span className="text-lg">Үстөл: № {order.tableId}</span>
      </button>
      {isDeleteMode && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the main button's onClick
            onDelete();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-200"
          aria-label="Delete order"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default CompactOrder;
