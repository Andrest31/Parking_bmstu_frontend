// src/API/parkingsApi.ts
const BASE_URL = 'http://localhost:8000';

export const fetchParkings = async () => {
  const url = new URL(`${BASE_URL}/parkings/`);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Ошибка загрузки парковок');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.parkings || []; // Проверяем, что данные — массив
};


export const fetchParkingById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/parkings/${id}/`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных парковки');
    }
  
    const data = await response.json();
    console.log("Детали парковки из API:", data); // Отладка
    return data;
  };
  