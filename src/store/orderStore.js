import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export const useOrderStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      orders: [], // Admin-facing list of all orders, not persisted for clients
      clientActiveOrder: null, // The single most recent order the client is tracking
      clientOrderHistory: [], // A list of the client's orders from the last 2 hours
      isAdminAuthenticated: false,

      // --- ACTIONS ---
      
      // Called when a new order is confirmed by the server
      setCurrentOrder: (order) => {
        set(state => ({
          clientActiveOrder: order,
          // Add the new order to the beginning of the history
          clientOrderHistory: [order, ...state.clientOrderHistory],
          // Also add to admin list (if this client is an admin)
          orders: [order, ...get().orders],
        }));
      },
      
      // Updates the status of orders
      updateOrderStatus: (orderId, newStatus) => {
        set(state => {
          // Update admin-facing list
          const updatedOrders = state.orders.map(order => 
            order.orderId === orderId ? { ...order, status: newStatus } : order
          );
          
          // Update client's active order if it matches
          let updatedClientActiveOrder = state.clientActiveOrder;
          if (state.clientActiveOrder && state.clientActiveOrder.orderId === orderId) {
            updatedClientActiveOrder = { ...state.clientActiveOrder, status: newStatus };
            if (newStatus === 'Paid') { // Changed from Completed
              updatedClientActiveOrder.statusChangeTimestamp = new Date().toISOString();
            }
          }
          
          // Update client's order history
          const updatedClientOrderHistory = state.clientOrderHistory.map(order => {
            if (order.orderId === orderId) {
              const updatedOrder = { ...order, status: newStatus };
              if (newStatus === 'Paid') { // Changed from Completed
                updatedOrder.statusChangeTimestamp = new Date().toISOString();
              }
              return updatedOrder;
            }
            return order;
          });

          return { 
            orders: updatedOrders, 
            clientActiveOrder: updatedClientActiveOrder,
            clientOrderHistory: updatedClientOrderHistory,
          };
        });
      },

      // Called from the main socket listener to sync all orders
      handleOrdersUpdate: (updatedOrders) => {
        set(state => {
          let updatedClientActiveOrder = state.clientActiveOrder;
          if (state.clientActiveOrder) {
            const newlyFoundOrder = updatedOrders.find(o => o.orderId === state.clientActiveOrder.orderId);
            if (newlyFoundOrder) {
              updatedClientActiveOrder = newlyFoundOrder;
            } else {
              // The active order was completed and archived on the server, so clear it
              updatedClientActiveOrder = null;
            }
          }

          // Filter updatedOrders to keep only those relevant to this client's history or active order.
          // This ensures that new properties like statusChangeTimestamp from the server are included.
          const relevantClientOrders = updatedOrders.filter(serverOrder => 
            state.clientOrderHistory.some(clientOrder => clientOrder.orderId === serverOrder.orderId) ||
            (state.clientActiveOrder && state.clientActiveOrder.orderId === serverOrder.orderId)
          );

          return {
            orders: updatedOrders, // for admin
            clientActiveOrder: updatedClientActiveOrder,
            clientOrderHistory: relevantClientOrders, // Use the filtered server list directly
          };
        });
      },

      // Clears orders that have been in 'Paid' status for more than 5 minutes.
      clearExpiredOrders: () => {
        set(state => {
          const now = new Date();
          const freshOrders = state.clientOrderHistory.filter(order => {
            if (order.status !== 'Paid') { // Changed from Completed
              return true; // Keep all non-paid orders
            }

            // For 'Paid' orders:
            if (!order.statusChangeTimestamp) {
              // This is an old 'Paid' order from before the logic change.
              // To align with the new rule, we remove it immediately.
              return false; 
            }

            // Check if 5 minutes have passed since payment.
            const isExpired = now - new Date(order.statusChangeTimestamp) >= FIVE_MINUTES_IN_MS;
            return !isExpired; // Keep if not expired, remove if expired.
          });
          return { clientOrderHistory: freshOrders };
        });
      },

      // Resets the client's active order tracking (e.g. when they start a new one)
      // This does NOT clear history.
      resetClientOrderStatus: () => set({ clientActiveOrder: null }),
      
      // Retrieves an order by its ID from the admin's list
      getOrderById: (orderId) => {
        return get().orders.find(order => order.orderId === orderId);
      },
          
      loginAdmin: () => set({ isAdminAuthenticated: true }),

      logoutAdmin: () => set({ isAdminAuthenticated: false }),
    }),
    {
      name: 'smart-cafe-order-storage', 
      storage: createJSONStorage(() => localforage),
      partialize: (state) => ({
        clientActiveOrder: state.clientActiveOrder,
        clientOrderHistory: state.clientOrderHistory, // Persist history
        isAdminAuthenticated: state.isAdminAuthenticated,
      }),
    }
  )
);


