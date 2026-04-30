/**
 * @fileoverview Type definitions for CivicFlow 2.0.
 * Ensures strict typing across all components and API responses.
 */

/**
 * Properties for a single step in a voting journey timeline.
 */
export interface TimelineStepProps {
  /** The display title of the step. */
  title: string;
  /** A detailed description of what happens during this step. */
  description: string;
  /** Whether the user has completed this stage. */
  completed: boolean;
  /** Whether this is the current active stage. */
  current: boolean;
}

/**
 * Structure of a message in the AI chat interface.
 */
export interface ChatMessage {
  /** The content of the message. */
  text: string;
  /** The identity of the sender. */
  sender: 'user' | 'bot';
}

export type CountryKey = 'us' | 'in' | 'uk' | 'generic';

/**
 * Data structure representing a government official from the Google Civic API.
 */
export interface CivicOfficial {
  /** The full name of the official. */
  name: string;
  /** Political party affiliation. */
  party?: string;
  /** Contact phone numbers. */
  phones?: string[];
  /** Official website URLs. */
  urls?: string[];
  /** URL to the official's profile photo. */
  photoUrl?: string;
  /** Social media channels. */
  channels?: { type: string; id: string }[];
}

/**
 * Data structure representing a government office from the Google Civic API.
 */
export interface CivicOffice {
  /** The name of the office (e.g. "President of the United States"). */
  name: string;
  /** Indices mapping to the 'officials' array in RepresentativeData. */
  officialIndices: number[];
}

/**
 * The root response structure from the Google Civic Information API.
 */
export interface RepresentativeData {
  /** List of offices found for the address. */
  offices: CivicOffice[];
  /** List of officials holding those offices. */
  officials: CivicOfficial[];
}

/**
 * A flattened representation of a representative and their office for UI display.
 */
export interface OrganizedRepresentative {
  /** The name of the office they hold. */
  officeName: string;
  /** The official's details. */
  official: CivicOfficial;
}

/**
 * Re-exporting Framer Motion types for centralized access.
 */
import { Variants as FMVariants, Transition as FMTransition } from 'framer-motion';
export type Variants = FMVariants;
export type Transition = FMTransition;

/**
 * Properties for the Timeline component.
 */
export interface TimelineProps {
  steps: TimelineStepProps[];
}

export interface CountryData {
  label: string;
  stages: TimelineStage[];
}

/**
 * Structure of a single stage in the education timeline.
 */
export interface TimelineStage {
  title: string;
  period: string;
  description: string;
  tips: string[];
}

/**
 * Properties for the EducationTimeline component.
 */
export interface EducationTimelineProps {
  stages: TimelineStage[];
  label: string;
}

/**
 * Structure of a single glossary item.
 */
export interface GlossaryItem {
  term: string;
  definition: string;
}

/**
 * Properties for the Glossary component.
 */
export interface GlossaryProps {
  items: GlossaryItem[];
}

/**
 * Structure of a single quiz question.
 */
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

/**
 * Properties for the Quiz component.
 */
export interface QuizProps {
  questions: QuizQuestion[];
  countryLabel: string;
}

