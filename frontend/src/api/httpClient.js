import { BASE_URL } from '../constants/apiConfig.js';

const parseJson = async (response) => {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  return JSON.parse(text);
};

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await parseJson(response);

  if (!response.ok) {
    const error = new Error(data?.message || 'Erro na requisição ao servidor');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const get = (path) => request(path, { method: 'GET' });
export const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });
export const put = (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) });
export const del = (path) => request(path, { method: 'DELETE' });

export default { get, post, put, del };
