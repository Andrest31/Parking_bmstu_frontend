// src/API/parkingsApi.ts

export const fetchParkings = async () => {
  const createFetchFunction = new Function(
    'return async function fetchData() {' +
      'const response = await fetch("/parkings");' +
      'if (!response.ok) {' +
        'throw new Error("Ошибка загрузки парковок");' +
      '}' +
      'const data = await response.json();' +
      'return Array.isArray(data) ? data : data.parkings || [];' +
    '}'
  );

  const fetchData = createFetchFunction();
  return await fetchData();
};


export const fetchParkingById = async (id: number) => {
  const createFetchFunction = new Function(
    'id',
    `
      return async function fetchData() {
        const response = await fetch(\`/parkings/\${id}\`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных парковки");
        }
        const data = await response.json();
        console.log("Детали парковки из API:", data); // Отладка
        return data;
      };
    `
  );

  const fetchData = createFetchFunction(id);
  return await fetchData();
};


export const createRegisterFunction = new Function(
  `
    return async function registerUser(username, password) {
      const response = await fetch('/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Пытаемся обработать ошибку из тела ответа, если оно есть
        try {
          const error = await response.json();
          throw new Error('Ошибка регистрации: ' + (error.error || response.statusText));
        } catch {
          throw new Error('Ошибка регистрации: ' + response.statusText);
        }
      }

      // Проверяем, есть ли тело ответа
      const text = await response.text();
      if (!text) {
        throw new Error('Пустой ответ от сервера');
      }

      // Парсим тело ответа
      const data = JSON.parse(text);
      console.log('Регистрация успешна:', data);
      return data;
    };
  `
);
