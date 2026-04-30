import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from '@/components/Timeline';

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

describe('Timeline Component', () => {
  const steps = [
    { title: 'Step 1', description: 'Desc 1', completed: true, current: false },
    { title: 'Step 2', description: 'Desc 2', completed: false, current: true },
  ];

  it('renders the correct number of steps', () => {
    render(<Timeline steps={steps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('sets aria-current on the active step', () => {
    render(<Timeline steps={steps} />);
    const activeStep = screen.getByText('Step 2').closest('article');
    expect(activeStep).toHaveAttribute('aria-current', 'step');
  });

  it('has accessible section label', () => {
    render(<Timeline steps={steps} />);
    expect(screen.getByRole('region', { name: 'Voting Journey Timeline' })).toBeInTheDocument();
  });
});
