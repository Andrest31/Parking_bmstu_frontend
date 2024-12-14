// store/features/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Parking {
  id: number;
  name: string;
  place: string;
  sports: number;
  open_hour: number;
  close_hour: number;
  image_card: string;
  image: string;
  status: string;
}

interface FiltersState {
  searchTerm: string; // Храним значение поискового запроса
  filteredCards: Parking[]; // Храним отфильтрованные данные
}

const initialState: FiltersState = {
  searchTerm: '', // По умолчанию поисковая строка пустая
  filteredCards: [], // По умолчанию отфильтрованные данные пустые
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload; // Устанавливаем поисковый запрос
    },
    setFilteredCards(state, action: PayloadAction<Parking[]>) {
      state.filteredCards = action.payload; // Устанавливаем отфильтрованные парковки
    },
  },
});

export const { setSearchTerm, setFilteredCards } = filtersSlice.actions;
export default filtersSlice.reducer;
