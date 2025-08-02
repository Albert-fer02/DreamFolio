export interface TrinityCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  prose: string;
  gradient: string;
  skills: string[];
  secondaryIcon?: React.ReactNode;
}

export interface TechItem {
  icon: React.ReactNode;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'cloud' | 'blockchain' | 'database' | 'ai';
  proficiency: number;
}

export interface LearningItem {
  title: string;
  progress: number;
  color: string;
  description?: string;
  estimatedCompletion?: string;
}

export interface CollaborationItem {
  title: string;
  description: string;
  image: string;
  hint: string;
  category: 'security' | 'ai' | 'fintech' | 'creative';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
  username: string;
  isActive: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  projectType: 'urgent' | 'collaboration' | 'consultation' | 'other';
  budget?: string;
}

export interface HeroSectionData {
  title: string;
  subtitle: string;
  specialties: string[];
  status: 'available' | 'busy' | 'away';
  timezone: string;
  location: string;
}

export interface PortfolioData {
  hero: HeroSectionData;
  trinity: TrinityCard[];
  tech: TechItem[];
  learning: LearningItem[];
  collaborations: CollaborationItem[];
  social: SocialLink[];
} 