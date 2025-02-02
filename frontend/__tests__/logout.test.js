import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logout from '../pages/logout';
import UserContext from '../context/UserContext';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Logout', () => {
  const mockLogout = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls logout and redirects to the homepage', async () => {
    render(
      <UserContext.Provider value={{ logout: mockLogout }}>
        <Logout />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});