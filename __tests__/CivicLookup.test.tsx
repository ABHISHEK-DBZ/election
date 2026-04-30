import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CivicLookup from '@/components/CivicLookup';

// Mock fetch
global.fetch = jest.fn();

describe('CivicLookup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and search button', () => {
    render(<CivicLookup />);
    expect(screen.getByLabelText('Enter your home address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search Representatives' })).toBeInTheDocument();
  });

  it('shows error if API fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid address' })
    });

    render(<CivicLookup />);
    fireEvent.change(screen.getByLabelText('Enter your home address'), { target: { value: '123 Fake St' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search Representatives' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid address')).toBeInTheDocument();
    });
  });

  it('renders representatives on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        offices: [{ name: 'Mayor', officialIndices: [0] }],
        officials: [{ name: 'Jane Doe', party: 'Independent' }]
      })
    });

    render(<CivicLookup />);
    fireEvent.change(screen.getByLabelText('Enter your home address'), { target: { value: '123 Real St' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search Representatives' }));

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Mayor')).toBeInTheDocument();
      expect(screen.getByText('Independent')).toBeInTheDocument();
    });
  });
});
