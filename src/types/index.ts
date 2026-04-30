export interface TimelineStepProps {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

export interface CivicOfficial {
  name: string;
  party?: string;
  phones?: string[];
  urls?: string[];
  photoUrl?: string;
}

export interface CivicOffice {
  name: string;
  officialIndices: number[];
}

export interface RepresentativeData {
  offices: CivicOffice[];
  officials: CivicOfficial[];
}

export interface OrganizedRepresentative {
  officeName: string;
  official: CivicOfficial;
}
