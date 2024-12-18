// src/store/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  imageCard: string;
  quantity: number;
  place: string;
  spots: number;
  orderId?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity' | 'place' | 'spots'>>) => {
      const newItem = {
        ...action.payload,
        quantity: 1,  // По умолчанию количество 1
        place: 'ГЗ',  // Например, 'ГЗ' как место
        spots: 1,     // Количество мест, предположительно 1
      };
      state.items.push(newItem);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
