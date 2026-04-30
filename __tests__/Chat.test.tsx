import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '@/components/Chat';

// Mock matchMedia for Framer Motion
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Chat Component', () => {
  it('renders the chat toggle button initially', () => {
    render(<Chat />);
    expect(screen.getByRole('button', { name: 'Open Ballot Buddy Chat' })).toBeInTheDocument();
  });

  it('opens the chat window when toggle is clicked', () => {
    render(<Chat />);
    const toggleBtn = screen.getByRole('button', { name: 'Open Ballot Buddy Chat' });
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('dialog', { name: 'Ballot Buddy Chat Window' })).toBeInTheDocument();
  });

  it('has an accessible input field when open', () => {
    render(<Chat />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Ballot Buddy Chat' }));
    expect(screen.getByLabelText('Type your message')).toBeInTheDocument();
  });
});
