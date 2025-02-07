import {
    login,
    addUser,
    getUser,
    getUserByUsername,
    updateUser,
    deleteUser,
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByUser,
  } from '../services/api_client';
  
  const BASE_URL = 'http://localhost:3001';
  
  global.fetch = jest.fn();
  
  describe('api_client', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('login should call fetch with correct parameters', async () => {
      const mockResponse = { access_token: 'sample-token' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await login('testuser', 'password');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'password' }),
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('addUser should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1 };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
      const response = await addUser(userData);
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('getUser should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1, username: 'testuser' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await getUser(1, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('getUserByUsername should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1, username: 'testuser' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await getUserByUsername('testuser', 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/testuser`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('updateUser should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1, username: 'updateduser' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const userData = { username: 'updateduser' };
      const response = await updateUser(1, userData, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
        body: JSON.stringify(userData),
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('deleteUser should call fetch with correct parameters', async () => {
      const mockResponse = { message: 'User deleted' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await deleteUser(1, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/1`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('createTransaction should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1, amount: 100.0, description: 'Test transaction' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const transactionData = { user_id: 1, amount: 100.0, description: 'Test transaction' };
      const response = await createTransaction(transactionData, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
        body: JSON.stringify(transactionData),
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('getTransaction should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1, amount: 100.0, description: 'Test transaction' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await getTransaction(1, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/transactions/1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('updateTransaction should call fetch with correct parameters', async () => {
      const mockResponse = { id: 1, amount: 200.0, description: 'Updated transaction' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const transactionData = { amount: 200.0, description: 'Updated transaction' };
      const response = await updateTransaction(1, transactionData, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/transactions/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
        body: JSON.stringify(transactionData),
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('deleteTransaction should call fetch with correct parameters', async () => {
      const mockResponse = { message: 'Transaction deleted' };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await deleteTransaction(1, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/transactions/1`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
      });
      expect(response).toEqual(mockResponse);
    });
  
    it('getTransactionsByUser should call fetch with correct parameters', async () => {
      const mockResponse = [
        { id: 1, amount: 100.0, description: 'Test transaction 1' },
        { id: 2, amount: 200.0, description: 'Test transaction 2' },
      ];
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const response = await getTransactionsByUser(1, 'sample-token');
  
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/transactions/user/1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sample-token' },
      });
      expect(response).toEqual(mockResponse);
    });
  });