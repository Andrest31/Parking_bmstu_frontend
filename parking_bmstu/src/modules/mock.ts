// mock.ts

// Определяем интерфейс для карточек
export interface Card {
    id: number;
    name: string;
    place: string;
    spots: number;
    openHour: number;
    closeHour: number;
    imageCard: string;
    image: string;
    status: string;
  }
  
  // Данные для карточек
  export const CARDS_DATA: Card[] = [
    {
      id: 1,
      name: 'ГЗ',
      place: 'Университет',
      spots: 31,
      openHour: 8,
      closeHour: 21,
      imageCard: 'http://localhost:9000/mini/images/img1.jpg',
      image: 'http://localhost:9000/mini/images/building1.jpg',
      status: 'Доступно',
    },
    {
      id: 2,
      name: 'Э',
      place: 'Университет',
      spots: 20,
      openHour: 9,
      closeHour: 20,
      imageCard: 'http://localhost:9000/mini/images/img2.jpg',
      image: 'http://localhost:9000/mini/images/building2.jpg',
      status: 'Доступно',
    },
    {
      id: 3,
      name: 'Спектр',
      place: 'Общежитие',
      spots: 15,
      openHour: 8,
      closeHour: 18,
      imageCard: 'http://localhost:9000/mini/images/img3.jpg',
      image: 'http://localhost:9000/mini/images/building3.jpg',
      status: 'Доступно',
    },
  ];
  