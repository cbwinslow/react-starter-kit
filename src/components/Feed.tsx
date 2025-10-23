import { useEffect, useState } from 'react';
import type { AnalysisResult } from '../types';
import { ApiService } from '../services/api';
import AnalysisPost from './AnalysisPost';
import './Feed.css';

export default function Feed() {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    setLoading(true);
    const results = await ApiService.getAnalysisResults();
    setAnalysisResults(results);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="feed-container">
        <div className="loading">Loading analysis results...</div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h2>Recent Analysis</h2>
        <p className="feed-subtitle">
          Comparing legislative voting records with social media statements
        </p>
      </div>
      <div className="feed-content">
        {analysisResults.map(analysis => (
          <AnalysisPost key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </div>
  );
}
