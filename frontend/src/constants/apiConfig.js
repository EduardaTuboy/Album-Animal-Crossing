export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const endpoints = {
  collection: '/collection',
  album: (email) => `/album/${email}`,
  stats: (email) => `/stats/${email}`,
  add: '/add',
  update: (number) => `/update/${number}`,
  delete: (number) => `/delete/${number}`,
};
