import { create } from 'zustand';
import { CartItem, MenuItem } from '../types/menu';

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

type State = {
  items: CartItem[];
  total: number;
};

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item: MenuItem) => {
    set((state: State) => {
      const existingItem = state.items.find((i: CartItem) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i: CartItem) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    });
  },
  removeItem: (itemId: number) => {
    set((state: State) => {
      const item = state.items.find((i: CartItem) => i.id === itemId);
      if (!item) return state;
      return {
        items: state.items.filter((i: CartItem) => i.id !== itemId),
        total: state.total - (item.price * item.quantity),
      };
    });
  },
  updateQuantity: (itemId: number, quantity: number) => {
    set((state: State) => {
      const item = state.items.find((i: CartItem) => i.id === itemId);
      if (!item) return state;
      const oldTotal = item.price * item.quantity;
      const newTotal = item.price * quantity;
      return {
        items: state.items.map((i: CartItem) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
        total: state.total - oldTotal + newTotal,
      };
    });
  },
  clearCart: () => set({ items: [], total: 0 }),
}));