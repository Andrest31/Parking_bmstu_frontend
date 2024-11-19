// mock.ts
// Определяем интерфейс для карточек, совместимый с Parking
export interface Parking {
  id: number;
  name: string;
  place: string;
  sports: number;
  open_hour: number; // Меняем на snake_case для совместимости с API
  close_hour: number;
  image_card: string; // Совпадает с названием из API
  image: string;
  status: string;
}

// Данные для парковок, настроенные под тип Parking
export const CARDS_DATA: Parking[] = [
  {
      id: 1,
      name: 'ГЗ (мок)',
      place: 'Университет',
      sports: 31,
      open_hour: 8,
      close_hour: 21,
      image_card: '',
      image: '',
      status: 'Доступно',
  },
  {
      id: 2,
      name: 'Э (мок)',
      place: 'Университет',
      sports: 20,
      open_hour: 9,
      close_hour: 20,
      image_card: '',
      image: '',
      status: 'Доступно',
  },
  {
      id: 3,
      name: 'Спектр (мок)',
      place: 'Общежитие',
      sports: 15,
      open_hour: 8,
      close_hour: 18,
      image_card: '',
      image: '',
      status: 'Доступно',
  },
];
