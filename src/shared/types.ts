export interface Skill {
  name: string;
  category: string;
  isMain: boolean;
  icon: string;
  url: string;
}

export interface Project {
  name: string;
  shortDescription?: string;
  description?: string;
  startDate: string;
  endDate?: string;
  teamSize: number;
  isSideProject: boolean;
  tags: string[];
  score: number;
  coverImage?: string;
  iconImage?: string;
}

export interface Experience {
  role: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  logo: string;
}

export interface Education {
  department: string;
  organization?: string;
  description?: string;
  startDate: string;
  endDate?: string;
  logo?: string;
}

export interface Certification {
  name: string;
  kind: string;
  institution: string;
  date: string;
}

export interface Career {
  role: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  logo: string;
}

export interface Award {
  name: string;
  tier: string;
  date: string;
  score: number;
}

export interface Activity {
  name: string;
  role: string;
  hosts: string[];
  startDate: string;
  endDate: string;
}

export interface AboutMe {
  content: string;
}
