import { create } from 'zustand';
import { sendMessage } from '../lib/socket';

export const useMenuStore = create(
    (set, get) => ({
      // --- STATE ---
      // Абал эми башында бош, серверден маалымат күтөт.
      categories: [],
      items: [],
      tables: [],

      // --- ACTIONS ---

      // This function now uses a functional update to safely merge the new state.
      setMenuState: (newState) => set((state) => ({
        ...state, // Carry over the existing state (like tables)
        categories: newState.categories || state.categories,
        items: newState.items || state.items,
      })),

      // Эски функциялар эми локалдык абалды өзгөртпөйт.
      // Алар жөн гана серверге тиешелүү билдирүүнү жөнөтүшөт.
      // Абал серверден "menu_updated" кабары келгенде баарына бирдей жаңыланат.

      addItem: (itemData) => {
        sendMessage({ type: 'add_item', payload: { itemData } });
      },

      updateItem: (itemId, itemData) => {
        sendMessage({ type: 'update_item', payload: { itemId, itemData } });
      },
        
      deleteItem: (itemId) => {
        sendMessage({ type: 'delete_item', payload: { itemId } });
      },

      toggleItemAvailability: (itemId) => {
        sendMessage({ type: 'toggle_item_availability', payload: { itemId } });
      },

      // --- CATEGORY & TABLE ACTIONS (Азырынча өзгөртүүсүз, керек болсо серверге өткөрүлөт) ---
      addTable: (tableNumber) => {
        const newTable = { id: `table-${Date.now()}`, number: tableNumber };
        set((state) => ({
            tables: [...state.tables, newTable]
        }));
      },
      deleteTable: (tableId) => {
        set((state) => ({
            tables: state.tables.filter(table => table.id !== tableId)
        }));
      },
      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, { id: `cat-${Date.now()}`, ...newCategory }],
        })),
      updateCategory: (categoryId, updatedData) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, ...updatedData } : cat
          ),
        })),
      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== categoryId),
          items: state.items.filter((item) => item.categoryId !== categoryId),
        })),
    })
);