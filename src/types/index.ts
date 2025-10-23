// Data models for OpenStates, Congress.gov, and GovInfo.gov

export interface Legislator {
  id: string;
  name: string;
  party: string;
  state: string;
  district?: string;
  chamber: 'house' | 'senate';
  photoUrl: string;
  biography: string;
  // OpenStates data
  openStatesId?: string;
  // Congress.gov data
  congressGovId?: string;
  termStart: string;
  termEnd: string;
  committees: string[];
}

export interface Bill {
  id: string;
  billNumber: string;
  title: string;
  summary: string;
  introducedDate: string;
  status: string;
  sponsor: string;
  // GovInfo.gov data
  govInfoUrl?: string;
  fullTextUrl?: string;
}

export interface VotingRecord {
  id: string;
  legislatorId: string;
  billId: string;
  vote: 'yea' | 'nay' | 'present' | 'not-voting';
  date: string;
  rollCallNumber: string;
}

export interface SocialMediaPost {
  id: string;
  legislatorId: string;
  content: string;
  platform: 'twitter' | 'facebook' | 'instagram';
  timestamp: string;
  topic: string;
}

export interface AnalysisMetrics {
  bias: number; // 0-100
  honesty: number; // 0-100
  consistency: number; // 0-100
  alignment: number; // 0-100 (voting vs. social media)
}

export interface AnalysisResult {
  id: string;
  legislator: Legislator;
  bill: Bill;
  votingRecord: VotingRecord;
  relatedPosts: SocialMediaPost[];
  metrics: AnalysisMetrics;
  analysis: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
