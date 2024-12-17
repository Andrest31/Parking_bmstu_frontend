// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface UserState {
  user: null | { username: string };
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Создаем асинхронный экшен для авторизации
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post('/api/login', credentials); // API запрос на авторизацию
      return response.data; // Возвращаем данные из ответа
    } catch (error) {
      // Приводим ошибку к типу AxiosError и извлекаем сообщение
      if (axios.isAxiosError(error)) {
        // Обрабатываем ошибку типа AxiosError
        return Promise.reject(error.response?.data?.message || 'Ошибка авторизации');
      } else {
        // Если ошибка не AxiosError
        return Promise.reject('Неизвестная ошибка');
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Присваиваем полученного пользователя
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // Важно, что теперь error - это строка, а не unknown
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

export default userSlice.reducer;
