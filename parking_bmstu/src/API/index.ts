import { Api } from './Api';

export const api = new Api({
    baseURL: 'http://localhost:5173/api/',
});

api.parkings.parkingsList().then(response => {
    console.log(response.data);
  });