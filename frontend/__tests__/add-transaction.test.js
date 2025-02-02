import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTransaction from '../pages/add-transaction';
import UserContext from '../context/UserContext';
import { createTransaction, getUserByUsername } from '../services/api_client';
import { useRouter } from 'next/router';

jest.mock('../services/api_client');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AddTransaction', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the add transaction form', () => {
    render(
      <UserContext.Provider value={{ token: 'sample-token', username: 'testuser' }}>
        <AddTransaction />
      </UserContext.Provider>
    );

    expect(screen.getByText('Create Transaction')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add transaction/i })).toBeInTheDocument();
  });

  it('handles successful transaction submission', async () => {
    getUserByUsername.mockResolvedValue({ id: 1 });
    createTransaction.mockResolvedValue({});

    render(
      <UserContext.Provider value={{ token: 'sample-token', username: 'testuser' }}>
        <AddTransaction />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Amount:'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test transaction' } });
    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));

    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalledWith(
        { user_id: 1, amount: '100', description: 'Test transaction' },
        'sample-token'
      );
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles failed transaction submission', async () => {
    getUserByUsername.mockResolvedValue({ id: 1 });
    createTransaction.mockRejectedValue(new Error('Backend error'));

    render(
      <UserContext.Provider value={{ token: 'sample-token', username: 'testuser' }}>
        <AddTransaction />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Amount:'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test transaction' } });
    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));

    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalledWith(
        { user_id: 1, amount: '100', description: 'Test transaction' },
        'sample-token'
      );
      expect(mockPush).not.toHaveBeenCalled();
      expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
    });
  });
});