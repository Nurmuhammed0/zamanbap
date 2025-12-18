import React from 'react';
import OrderCard from './OrderCard';

const OrderModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <OrderCard order={order} />
      </div>
    </div>
  );
};

export default OrderModal;
