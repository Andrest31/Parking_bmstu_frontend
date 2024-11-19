import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string; // Текущий текст поиска
}

const initialState: FiltersState = {
  searchTerm: '', // Начальное значение фильтра
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = filtersSlice.actions;
export default filtersSlice.reducer;
