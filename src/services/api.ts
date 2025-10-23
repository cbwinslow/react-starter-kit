import type { AnalysisResult, Legislator, Comment } from '../types';
import { mockAnalysisResults } from '../data/mockAnalysisResults';
import { mockLegislators } from '../data/mockLegislators';

/**
 * Mock API service that simulates calls to OpenStates, Congress.gov, and GovInfo.gov APIs
 * In a real implementation, these would make actual HTTP requests to the respective APIs
 */

export const ApiService = {
  /**
   * Get all analysis results for the feed
   */
  getAnalysisResults(): Promise<AnalysisResult[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalysisResults);
      }, 500);
    });
  },

  /**
   * Get a specific analysis result by ID
   */
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalysisResults.find(result => result.id === id));
      }, 300);
    });
  },

  /**
   * Get all legislators
   */
  getLegislators(): Promise<Legislator[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockLegislators);
      }, 400);
    });
  },

  /**
   * Get a specific legislator by ID
   */
  getLegislator(id: string): Promise<Legislator | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockLegislators.find(leg => leg.id === id));
      }, 300);
    });
  },

  /**
   * Get analysis results for a specific legislator
   */
  getLegislatorAnalysis(legislatorId: string): Promise<AnalysisResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnalysisResults.filter(result => result.legislator.id === legislatorId));
      }, 400);
    });
  },

  /**
   * Add a comment to an analysis result
   */
  addComment(analysisId: string, comment: Omit<Comment, 'id' | 'timestamp' | 'likes'>): Promise<Comment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment: Comment = {
          ...comment,
          id: `comment-${Date.now()}`,
          timestamp: new Date().toISOString(),
          likes: 0,
        };
        
        // In a real app, this would update the backend
        const analysis = mockAnalysisResults.find(r => r.id === analysisId);
        if (analysis) {
          analysis.comments.push(newComment);
        }
        
        resolve(newComment);
      }, 300);
    });
  },

  /**
   * Like an analysis result
   */
  likeAnalysis(analysisId: string): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = mockAnalysisResults.find(r => r.id === analysisId);
        if (analysis) {
          analysis.likes += 1;
          resolve(analysis.likes);
        } else {
          resolve(0);
        }
      }, 200);
    });
  },

  /**
   * Like a comment
   */
  likeComment(analysisId: string, commentId: string): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = mockAnalysisResults.find(r => r.id === analysisId);
        if (analysis) {
          const comment = analysis.comments.find(c => c.id === commentId);
          if (comment) {
            comment.likes += 1;
            resolve(comment.likes);
          }
        }
        resolve(0);
      }, 200);
    });
  },
};
