export type Language = 'ar' | 'en';
export type ThemeMode = 'cyber-mint' | 'fitch-minimal' | 'oled-dark';

export interface WorkflowNode {
  id: string;
  title: string;
  subtitle?: string;
  type: 'trigger' | 'action' | 'code' | 'switch' | 'condition' | 'webhook';
  iconType: 'telegram' | 'sheets' | 'code' | 'clock' | 'branch' | 'openai' | 'webhook';
  x: number;
  y: number;
  badge?: string;
  status?: 'idle' | 'running' | 'success' | 'warning';
  outputData?: Record<string, unknown>;
}

export interface WorkflowConnection {
  from: string;
  to: string;
  label?: string;
  color?: string;
  condition?: boolean;
}

export interface ProjectWorkflow {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  categoryAr: string;
  categoryEn: string;
  badge: string;
  executionCount: string;
  uptime: string;
  latency: string;
  views: {
    id: string;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    canvasHeader: string;
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
  }[];
  techStack: string[];
  keyHighlightsAr: string[];
  keyHighlightsEn: string[];
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  level: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  color: string;
}

export interface WeeklyGoalMetric {
  day: string;
  dayAr: string;
  executions: number;
  successRate: number;
  target: number;
}
