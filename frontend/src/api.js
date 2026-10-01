// All calls use a relative path; Nginx (prod) or Vite (dev) proxies /api to the backend.
const BASE = '/api/tasks';

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
}

export const getTasks = () => request(BASE);
export const addTask = (title) =>
  request(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
export const toggleTask = (id) => request(`${BASE}/${id}`, { method: 'PUT' });
export const deleteTask = (id) => request(`${BASE}/${id}`, { method: 'DELETE' });
