import { useState, useCallback } from 'react';
import { ChatMessage } from '@/types';

/**
 * Interface for Chat API responses.
 */
interface ChatResponse {
  response: string;
  error?: string;
}

/**
 * Custom hook to handle Gemini-powered AI chat interactions.
 * Extracts state and logic for 'Ballot Buddy' from UI components.
 * 
 * @returns {Object} Chat state and submission handler.
 */
export function useGeminiChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submits a user message and retrieves an AI response.
   * 
   * @param {string} question - The user's query.
   * @returns {Promise<void>}
   */
  const sendMessage = useCallback(async (question: string): Promise<void> => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    // Add user message to local state
    setMessages(prev => [...prev, { text: trimmed, sender: 'user' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data: ChatResponse = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to fetch response');

      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to Ballot Buddy.';
      setError(msg);
      setMessages(prev => [...prev, { text: msg, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const resetMessages = useCallback((newInitial: ChatMessage[] = []) => {
    setMessages(newInitial);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetMessages
  };
}
