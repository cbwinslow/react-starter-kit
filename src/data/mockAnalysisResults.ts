import type { AnalysisResult } from '../types';
import { mockLegislators } from './mockLegislators';
import { mockBills } from './mockBills';

export const mockAnalysisResults: AnalysisResult[] = [
  {
    id: 'analysis-1',
    legislator: mockLegislators[0], // Elizabeth Warren
    bill: mockBills[0], // Climate Action
    votingRecord: {
      id: 'vote-1',
      legislatorId: 'leg-1',
      billId: 'bill-1',
      vote: 'yea',
      date: '2024-05-15',
      rollCallNumber: 'RC-123',
    },
    relatedPosts: [
      {
        id: 'post-1',
        legislatorId: 'leg-1',
        content: 'Climate change is the existential threat of our time. We must act now with bold investments in clean energy. #ClimateAction',
        platform: 'twitter',
        timestamp: '2024-05-10T14:30:00Z',
        topic: 'Climate',
      },
      {
        id: 'post-2',
        legislatorId: 'leg-1',
        content: 'Proud to support legislation that will create millions of green jobs while protecting our planet for future generations.',
        platform: 'twitter',
        timestamp: '2024-05-14T10:15:00Z',
        topic: 'Climate',
      },
    ],
    metrics: {
      bias: 15,
      honesty: 92,
      consistency: 95,
      alignment: 98,
    },
    analysis: 'Senator Warren demonstrates exceptional alignment between her social media advocacy and voting record on climate legislation. Her consistent messaging and voting pattern show strong commitment to environmental policy with minimal partisan bias in her environmental stance.',
    timestamp: '2024-05-16T08:00:00Z',
    likes: 234,
    comments: [
      {
        id: 'comment-1',
        userId: 'user-1',
        userName: 'John Smith',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Great to see politicians who actually follow through on their promises!',
        timestamp: '2024-05-16T09:30:00Z',
        likes: 45,
      },
      {
        id: 'comment-2',
        userId: 'user-2',
        userName: 'Sarah Johnson',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        content: 'This is the kind of accountability we need in politics.',
        timestamp: '2024-05-16T11:00:00Z',
        likes: 32,
      },
    ],
  },
  {
    id: 'analysis-2',
    legislator: mockLegislators[1], // Ted Cruz
    bill: mockBills[1], // Border Security
    votingRecord: {
      id: 'vote-2',
      legislatorId: 'leg-2',
      billId: 'bill-2',
      vote: 'yea',
      date: '2024-04-20',
      rollCallNumber: 'RC-234',
    },
    relatedPosts: [
      {
        id: 'post-3',
        legislatorId: 'leg-2',
        content: 'Border security is national security. We need to protect American families and sovereignty. #SecureTheBorder',
        platform: 'twitter',
        timestamp: '2024-04-15T16:00:00Z',
        topic: 'Immigration',
      },
    ],
    metrics: {
      bias: 35,
      honesty: 78,
      consistency: 88,
      alignment: 94,
    },
    analysis: 'Senator Cruz shows strong alignment between his border security messaging and legislative actions. His voting pattern consistently matches his public statements, though his messaging displays moderate partisan framing.',
    timestamp: '2024-04-21T08:00:00Z',
    likes: 189,
    comments: [
      {
        id: 'comment-3',
        userId: 'user-3',
        userName: 'Mike Anderson',
        userAvatar: 'https://i.pravatar.cc/150?img=3',
        content: 'Actions speak louder than words!',
        timestamp: '2024-04-21T10:00:00Z',
        likes: 28,
      },
    ],
  },
  {
    id: 'analysis-3',
    legislator: mockLegislators[2], // AOC
    bill: mockBills[4], // Green New Deal
    votingRecord: {
      id: 'vote-3',
      legislatorId: 'leg-3',
      billId: 'bill-5',
      vote: 'yea',
      date: '2024-03-10',
      rollCallNumber: 'RC-345',
    },
    relatedPosts: [
      {
        id: 'post-4',
        legislatorId: 'leg-3',
        content: 'The Green New Deal isn\'t just about the climate - it\'s about creating millions of good-paying jobs and addressing economic inequality.',
        platform: 'twitter',
        timestamp: '2024-03-05T13:20:00Z',
        topic: 'Climate',
      },
      {
        id: 'post-5',
        legislatorId: 'leg-3',
        content: 'We can\'t have climate justice without economic justice. They\'re inseparable.',
        platform: 'instagram',
        timestamp: '2024-03-08T15:45:00Z',
        topic: 'Climate',
      },
    ],
    metrics: {
      bias: 25,
      honesty: 89,
      consistency: 93,
      alignment: 96,
    },
    analysis: 'Rep. Ocasio-Cortez demonstrates very strong consistency between her social media advocacy and voting record on climate and economic policy. Her messaging consistently emphasizes both environmental and economic justice themes, which align with her legislative actions.',
    timestamp: '2024-03-11T08:00:00Z',
    likes: 412,
    comments: [
      {
        id: 'comment-4',
        userId: 'user-4',
        userName: 'Emily Chen',
        userAvatar: 'https://i.pravatar.cc/150?img=4',
        content: 'Love seeing data-driven analysis of our representatives!',
        timestamp: '2024-03-11T09:15:00Z',
        likes: 67,
      },
      {
        id: 'comment-5',
        userId: 'user-5',
        userName: 'David Martinez',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        content: 'This kind of transparency is exactly what we need.',
        timestamp: '2024-03-11T12:30:00Z',
        likes: 54,
      },
    ],
  },
  {
    id: 'analysis-4',
    legislator: mockLegislators[4], // Bernie Sanders
    bill: mockBills[2], // Medicare for All
    votingRecord: {
      id: 'vote-4',
      legislatorId: 'leg-5',
      billId: 'bill-3',
      vote: 'yea',
      date: '2024-02-25',
      rollCallNumber: 'RC-456',
    },
    relatedPosts: [
      {
        id: 'post-6',
        legislatorId: 'leg-5',
        content: 'Healthcare is a human right, not a privilege. Medicare for All will guarantee healthcare to every American.',
        platform: 'twitter',
        timestamp: '2024-02-20T11:00:00Z',
        topic: 'Healthcare',
      },
      {
        id: 'post-7',
        legislatorId: 'leg-5',
        content: 'No one in America should go bankrupt because they got sick. That\'s why we need Medicare for All.',
        platform: 'facebook',
        timestamp: '2024-02-23T14:30:00Z',
        topic: 'Healthcare',
      },
    ],
    metrics: {
      bias: 18,
      honesty: 94,
      consistency: 97,
      alignment: 99,
    },
    analysis: 'Senator Sanders shows exceptional consistency between his decades-long social media messaging and voting record on healthcare reform. His alignment score is among the highest, demonstrating unwavering commitment to his stated policy positions with minimal partisan bias in messaging.',
    timestamp: '2024-02-26T08:00:00Z',
    likes: 567,
    comments: [
      {
        id: 'comment-6',
        userId: 'user-6',
        userName: 'Lisa Thompson',
        userAvatar: 'https://i.pravatar.cc/150?img=6',
        content: 'Consistency over decades - that\'s what true leadership looks like.',
        timestamp: '2024-02-26T09:45:00Z',
        likes: 89,
      },
      {
        id: 'comment-7',
        userId: 'user-7',
        userName: 'Robert Wilson',
        userAvatar: 'https://i.pravatar.cc/150?img=7',
        content: 'This data really shows who walks the walk.',
        timestamp: '2024-02-26T13:20:00Z',
        likes: 72,
      },
    ],
  },
  {
    id: 'analysis-5',
    legislator: mockLegislators[3], // Matt Gaetz
    bill: mockBills[3], // Tax Cut Extension
    votingRecord: {
      id: 'vote-5',
      legislatorId: 'leg-4',
      billId: 'bill-4',
      vote: 'yea',
      date: '2024-04-05',
      rollCallNumber: 'RC-567',
    },
    relatedPosts: [
      {
        id: 'post-8',
        legislatorId: 'leg-4',
        content: 'Americans deserve to keep more of their hard-earned money. Tax cuts fuel economic growth and job creation.',
        platform: 'twitter',
        timestamp: '2024-04-01T10:30:00Z',
        topic: 'Taxes',
      },
    ],
    metrics: {
      bias: 42,
      honesty: 75,
      consistency: 85,
      alignment: 91,
    },
    analysis: 'Rep. Gaetz demonstrates strong alignment between his messaging and voting on tax policy. His social media posts consistently advocate for tax cuts, matching his legislative record. However, his messaging shows higher partisan framing compared to other representatives.',
    timestamp: '2024-04-06T08:00:00Z',
    likes: 156,
    comments: [
      {
        id: 'comment-8',
        userId: 'user-8',
        userName: 'Amanda Rodriguez',
        userAvatar: 'https://i.pravatar.cc/150?img=8',
        content: 'Good to see the data behind the rhetoric.',
        timestamp: '2024-04-06T11:00:00Z',
        likes: 34,
      },
    ],
  },
];
