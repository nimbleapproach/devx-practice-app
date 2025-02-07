const BASE_URL = "http://api:3001"; // Adjust the base URL as needed

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const addUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getUser = async (userId, token) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return response.json();
};

export const getUserByUsername = async (username, token) => {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return response.json();
};

export const updateUser = async (userId, userData, token) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (userId, token) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return response.json();
};

export const createTransaction = async (transactionData, token) => {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(transactionData),
  });
  return response.json();
};

export const getTransaction = async (transactionId, token) => {
  const response = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return response.json();
};

export const updateTransaction = async (
  transactionId,
  transactionData,
  token
) => {
  const response = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(transactionData),
  });
  return response.json();
};

export const deleteTransaction = async (transactionId, token) => {
  const response = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return response.json();
};

export const getTransactionsByUser = async (userId, token) => {
  const response = await fetch(`${BASE_URL}/transactions/user/${userId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return response.json();
};
