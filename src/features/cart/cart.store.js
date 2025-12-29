import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item.itemTotal, 0);
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      items: [],
      tableId: null,

      // --- ACTIONS ---
      setTableId: (id) => set({ tableId: id }),

      addToCart: (itemToAdd, quantity, selectedOptions = []) => {
        const { items } = get();
        const existingItem = items.find(
          (item) =>
            item.id === itemToAdd.id &&
            JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
        );

        let updatedItems;

        if (existingItem) {
          updatedItems = items.map((item) =>
            item.cartItemId === existingItem.cartItemId
              ? { ...item, quantity: item.quantity + quantity, itemTotal: (item.basePrice + item.optionsPrice) * (item.quantity + quantity) }
              : item
          );
        } else {
          const optionsPrice = selectedOptions.reduce((sum, opt) => sum + (opt.priceModifier || 0), 0);
          
          // Determine the correct price to use, prioritizing the promotion price
          const effectivePrice = (itemToAdd.promotionPrice && itemToAdd.promotionPrice > 0) 
            ? itemToAdd.promotionPrice 
            : itemToAdd.price;

          const newItem = {
            cartItemId: `cart-item-${Date.now()}`,
            id: itemToAdd.id,
            name: itemToAdd.name,
            imageUrl: itemToAdd.imageUrl,
            quantity,
            selectedOptions,
            basePrice: effectivePrice, // Use the effective price
            optionsPrice: optionsPrice,
            itemTotal: (effectivePrice + optionsPrice) * quantity,
            originalPrice: itemToAdd.price, // Store original price for reference
          };
          updatedItems = [...items, newItem];
        }
        set({ items: updatedItems });
      },

      updateQuantity: (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeFromCart(cartItemId);
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: newQuantity, itemTotal: (item.basePrice + item.optionsPrice) * newQuantity }
                : item
            ),
          }));
        }
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return calculateTotal(get().items);
      },
    }),
    {
      name: 'smart-cafe-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
