import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../pages/dashboard';
import UserContext from '../context/UserContext';
import { getTransactionsByUser, getUserByUsername } from '../services/api_client';
import { useRouter } from 'next/router';

jest.mock('../services/api_client');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login if not logged in', async () => {
    render(
      <UserContext.Provider value={{ token: null, username: null }}>
        <Dashboard />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('displays transactions when user has some transactions', async () => {
    const mockTransactions = [
      { id: 1, amount: 100.0, description: 'Test transaction 1' },
      { id: 2, amount: 200.0, description: 'Test transaction 2' },
    ];
    getUserByUsername.mockResolvedValue({ id: 1 });
    getTransactionsByUser.mockResolvedValue(mockTransactions);

    render(
      <UserContext.Provider value={{ token: 'sample-token', username: 'testuser' }}>
        <Dashboard />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Welcome to your dashboard! Here you can view your information and manage your transactions.')).toBeInTheDocument();
      expect(screen.getByText('Test transaction 1')).toBeInTheDocument();
      expect(screen.getByText('Test transaction 2')).toBeInTheDocument();
    });
  });

  it('displays no transactions message when user has no transactions', async () => {
    getUserByUsername.mockResolvedValue({ id: 1 });
    getTransactionsByUser.mockResolvedValue([]);

    render(
      <UserContext.Provider value={{ token: 'sample-token', username: 'testuser' }}>
        <Dashboard />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Welcome to your dashboard! Here you can view your information and manage your transactions.')).toBeInTheDocument();
      expect(screen.queryByText('Test transaction 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Test transaction 2')).not.toBeInTheDocument();
    });
  });
});