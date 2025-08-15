export interface Feedback {
  id: string;
  text: string;
  sentiment: "positive" | "neutral" | "concern";
  author: string;
  timestamp: Date;
  upvotes: number;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  status: "active" | "resolved" | "pending" | "contradiction";
  createdAt: Date;
  participantCount: number;
  consensusLevel: number;
  deadline?: Date;
  category: string;
  contradictions?: Contradiction[];
  options?: DecisionOption[];
}

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  supportPercentage: number;
  pros: string[];
  cons: string[];
}

export interface Contradiction {
  id: string;
  description: string;
  sideA: string;
  sideB: string;
  synthesis?: string;
  resolved: boolean;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar?: string;
  role: "member" | "moderator" | "admin";
  joinedAt: Date;
  contributionScore: number;
}

export interface Discussion {
  id: string;
  name: string;
  description?: string;
  trending: boolean;
  memberCount: number;
  messages: Message[];
  lastActivity: Date;
}

export interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  likes: number;
  replies?: Message[];
  edited?: boolean;
}

export interface CommunityStats {
  memberCount: number;
  activeDecisions: number;
  consensusRate: number;
  participationRate: number;
  synthesisSuccessRate: number;
  collectiveIQ: number;
}

export interface ACMMAnalysis {
  contradictionCount: number;
  synthesisOpportunities: number;
  resolutionRate: number;
  patterns: Pattern[];
}

export interface Pattern {
  id: string;
  type: "recurring" | "emerging" | "resolved";
  description: string;
  frequency: number;
  impact: "low" | "medium" | "high";
}