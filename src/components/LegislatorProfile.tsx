import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Legislator, AnalysisResult } from '../types';
import { ApiService } from '../services/api';
import { getPartyColor } from '../utils/helpers';
import AnalysisPost from './AnalysisPost';
import './LegislatorProfile.css';

export default function LegislatorProfile() {
  const { id } = useParams<{ id: string }>();
  const [legislator, setLegislator] = useState<Legislator | null>(null);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProfile(id);
    }
  }, [id]);

  const loadProfile = async (legislatorId: string) => {
    setLoading(true);
    const [legData, analysisData] = await Promise.all([
      ApiService.getLegislator(legislatorId),
      ApiService.getLegislatorAnalysis(legislatorId),
    ]);
    setLegislator(legData || null);
    setAnalyses(analysisData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!legislator) {
    return (
      <div className="profile-container">
        <div className="error">Legislator not found</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={legislator.photoUrl} 
          alt={legislator.name}
          className="profile-photo"
        />
        <div className="profile-info">
          <h1>{legislator.name}</h1>
          <p className="profile-title">
            {legislator.chamber === 'senate' ? 'U.S. Senator' : 'U.S. Representative'}
          </p>
          <p 
            className="profile-party"
            style={{ color: getPartyColor(legislator.party) }}
          >
            {legislator.party} • {legislator.state}
            {legislator.district && ` District ${legislator.district}`}
          </p>
          <p className="profile-term">
            Term: {new Date(legislator.termStart).getFullYear()} - {new Date(legislator.termEnd).getFullYear()}
          </p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Biography</h2>
          <p>{legislator.biography}</p>
        </div>

        <div className="profile-section">
          <h2>Committee Assignments</h2>
          <ul className="committees-list">
            {legislator.committees.map((committee, index) => (
              <li key={index}>{committee}</li>
            ))}
          </ul>
        </div>

        <div className="profile-section">
          <h2>Data Sources</h2>
          <ul className="data-sources">
            {legislator.openStatesId && (
              <li>OpenStates ID: {legislator.openStatesId}</li>
            )}
            {legislator.congressGovId && (
              <li>Congress.gov ID: {legislator.congressGovId}</li>
            )}
          </ul>
        </div>

        <div className="profile-section">
          <h2>Recent Analysis</h2>
          {analyses.length > 0 ? (
            <div className="profile-analyses">
              {analyses.map(analysis => (
                <AnalysisPost key={analysis.id} analysis={analysis} />
              ))}
            </div>
          ) : (
            <p className="no-data">No analysis available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
