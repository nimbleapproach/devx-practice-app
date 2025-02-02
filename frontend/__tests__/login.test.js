import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/login';
import UserContext from '../context/UserContext';
import { login as api_login } from '../services/api_client';
import { useRouter } from 'next/router';


jest.mock('../services/api_client');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login', () => {
  const mockLogin = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(
      <UserContext.Provider value={{ token: null, login: mockLogin }}>
        <Login />
      </UserContext.Provider>
    );

    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    api_login.mockResolvedValue({ access_token: 'sample-token' });

    render(
      <UserContext.Provider value={{ token: null, login: mockLogin }}>
        <Login />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'sample-token');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles failed login', async () => {
    api_login.mockResolvedValue({});

    render(
      <UserContext.Provider value={{ token: null, login: mockLogin }}>
        <Login />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('handles backend error', async () => {
    api_login.mockRejectedValue(new Error('Backend error'));

    render(
      <UserContext.Provider value={{ token: null, login: mockLogin }}>
        <Login />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});