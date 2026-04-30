'use client';

import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Provider component to enable lazy-loading for Framer Motion.
 * This significantly reduces the initial bundle size by only loading 
 * the animation logic when needed.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The children to wrap.
 * @returns {JSX.Element} The rendered provider.
 */
export function FramerProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
