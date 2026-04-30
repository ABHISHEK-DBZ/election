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
