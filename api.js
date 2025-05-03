// api.js
const API_BASE = 'http://localhost:3000/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return await res.json();
}

export async function loginSeller(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password }),
  });
  return await res.json();
}

export async function createProduct(productData) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return await res.json();
}
