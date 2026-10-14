export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  categoryLabel: string;
  image: string;
  featured?: boolean;
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  tags: string[];
  description: string;
  architectureDetails: {
    overview: string;
    nodes: { id: string; name: string; role: string; latency: string; status: 'active' | 'synced' | 'standby' }[];
    codeSnippet: string;
    language: string;
    filename: string;
    benchmarkStats: {
      p50: string;
      p99: string;
      throughput: string;
      memory: string;
    };
    decisions: string[];
  };
  liveDemoUrl?: string;
  repoUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    highlight: string;
    tags: string[];
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  scope: string;
  metrics: string[];
  technologies: string[];
  highlights: string[];
}

export interface TelemetryMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  status: 'optimal' | 'nominal' | 'warning';
}
