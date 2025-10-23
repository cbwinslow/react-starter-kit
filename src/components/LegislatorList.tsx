import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Legislator } from '../types';
import { ApiService } from '../services/api';
import { getPartyColor } from '../utils/helpers';
import './LegislatorList.css';

export default function LegislatorList() {
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadLegislators();
  }, []);

  const loadLegislators = async () => {
    setLoading(true);
    const data = await ApiService.getLegislators();
    setLegislators(data);
    setLoading(false);
  };

  const filteredLegislators = legislators.filter(leg => {
    if (filter === 'all') return true;
    if (filter === 'senate') return leg.chamber === 'senate';
    if (filter === 'house') return leg.chamber === 'house';
    return leg.party.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="legislators-container">
        <div className="loading">Loading legislators...</div>
      </div>
    );
  }

  return (
    <div className="legislators-container">
      <div className="legislators-header">
        <h2>U.S. Legislators</h2>
        <p className="legislators-subtitle">
          Profiles powered by OpenStates and Congress.gov data
        </p>
      </div>

      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'senate' ? 'active' : ''}`}
          onClick={() => setFilter('senate')}
        >
          Senate
        </button>
        <button 
          className={`filter-btn ${filter === 'house' ? 'active' : ''}`}
          onClick={() => setFilter('house')}
        >
          House
        </button>
        <button 
          className={`filter-btn ${filter === 'democrat' ? 'active' : ''}`}
          onClick={() => setFilter('democrat')}
        >
          Democrat
        </button>
        <button 
          className={`filter-btn ${filter === 'republican' ? 'active' : ''}`}
          onClick={() => setFilter('republican')}
        >
          Republican
        </button>
        <button 
          className={`filter-btn ${filter === 'independent' ? 'active' : ''}`}
          onClick={() => setFilter('independent')}
        >
          Independent
        </button>
      </div>

      <div className="legislators-grid">
        {filteredLegislators.map(legislator => (
          <Link 
            key={legislator.id} 
            to={`/legislator/${legislator.id}`}
            className="legislator-card"
          >
            <img 
              src={legislator.photoUrl} 
              alt={legislator.name}
              className="legislator-photo"
            />
            <div className="legislator-details">
              <h3>{legislator.name}</h3>
              <p className="legislator-role">
                {legislator.chamber === 'senate' ? 'Senator' : 'Representative'}
                {' • '}
                {legislator.state}
                {legislator.district && `-${legislator.district}`}
              </p>
              <p 
                className="legislator-party"
                style={{ color: getPartyColor(legislator.party) }}
              >
                {legislator.party}
              </p>
              <p className="legislator-bio">{legislator.biography}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
