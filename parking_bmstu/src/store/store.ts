import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/filtersSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    cart: cartReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;