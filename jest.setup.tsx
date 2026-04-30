import '@testing-library/jest-dom';
import React from 'react';

// Polyfill for matchMedia which is required by framer-motion in some environments
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock framer-motion to avoid module issues in Jest
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    __esModule: true,
    ...actual,
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => {
        // Remove framer-motion specific props to prevent React warnings
        const { initial, animate, exit, variants, transition, whileHover, whileTap, whileInView, viewport, ...validProps } = props;
        return <div ref={ref} {...validProps}>{children}</div>;
      }),
      button: React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, variants, transition, whileHover, whileTap, whileInView, viewport, ...validProps } = props;
        return <button ref={ref} {...validProps}>{children}</button>;
      }),
      article: React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, variants, transition, whileHover, whileTap, whileInView, viewport, ...validProps } = props;
        return <article ref={ref} {...validProps}>{children}</article>;
      }),
      a: React.forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, variants, transition, whileHover, whileTap, whileInView, viewport, ...validProps } = props;
        return <a ref={ref} {...validProps}>{children}</a>;
      }),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => false,
  };
});

// Mock isomorphic-dompurify to avoid jsdom conflicts in jest
jest.mock('isomorphic-dompurify', () => {
  return {
    sanitize: (str: string) => str.replace(/<script[^>]*?>.*?<\/script>/gi, ''),
  };
});
