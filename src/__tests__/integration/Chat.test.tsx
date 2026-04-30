import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '@/components/Chat';
import { FramerProvider } from '@/components/FramerProvider';

// Mock the fetch API
global.fetch = jest.fn() as jest.Mock;

describe('Chat Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows a user to open the chat and send a message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'I am here to help you understand the election process.' }),
    });

    render(
      <FramerProvider>
        <Chat />
      </FramerProvider>
    );

    // 1. Open the chat
    const toggleButton = screen.getByLabelText(/Open Ballot Buddy Chat/i);
    fireEvent.click(toggleButton);

    // 2. Verify chat window is open
    expect(screen.getByText(/Ballot Buddy/i)).toBeInTheDocument();
    
    // 3. Type a message
    const input = screen.getByPlaceholderText(/Ask about propositions/i);
    fireEvent.change(input, { target: { value: 'How do I register to vote?' } });
    
    // 4. Submit the form
    const sendButton = screen.getByLabelText(/Send Message/i);
    fireEvent.click(sendButton);

    // 5. Verify user message appears
    expect(screen.getByText(/How do I register to vote\?/i)).toBeInTheDocument();

    // 6. Verify AI response appears after mock delay
    await waitFor(() => {
      expect(screen.getByText(/I am here to help you understand the election process/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.any(Object));
  });
});
