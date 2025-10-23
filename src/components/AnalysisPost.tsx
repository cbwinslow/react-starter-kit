import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { AnalysisResult } from '../types';
import { formatRelativeTime, getMetricColor, getMetricLabel, getPartyColor } from '../utils/helpers';
import { ApiService } from '../services/api';
import './AnalysisPost.css';

interface AnalysisPostProps {
  analysis: AnalysisResult;
}

export default function AnalysisPost({ analysis }: AnalysisPostProps) {
  const [likes, setLikes] = useState(analysis.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(analysis.comments);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!isLiked) {
      const newLikes = await ApiService.likeAnalysis(analysis.id);
      setLikes(newLikes);
      setIsLiked(true);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = await ApiService.addComment(analysis.id, {
        userId: 'current-user',
        userName: 'Demo User',
        userAvatar: 'https://i.pravatar.cc/150?img=10',
        content: newComment,
      });
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="analysis-post">
      <div className="post-header">
        <Link to={`/legislator/${analysis.legislator.id}`} className="legislator-info">
          <img src={analysis.legislator.photoUrl} alt={analysis.legislator.name} className="legislator-avatar" />
          <div>
            <h3>{analysis.legislator.name}</h3>
            <p className="legislator-meta">
              <span style={{ color: getPartyColor(analysis.legislator.party) }}>
                {analysis.legislator.party}
              </span>
              {' • '}
              {analysis.legislator.state}
              {' • '}
              {formatRelativeTime(analysis.timestamp)}
            </p>
          </div>
        </Link>
      </div>

      <div className="post-content">
        <div className="bill-info">
          <h4>{analysis.bill.billNumber}: {analysis.bill.title}</h4>
          <p className="bill-summary">{analysis.bill.summary}</p>
          <div className="voting-record">
            <span className="vote-label">Vote:</span>
            <span className={`vote-badge vote-${analysis.votingRecord.vote}`}>
              {analysis.votingRecord.vote.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="analysis-section">
          <h5>Analysis Results</h5>
          <p>{analysis.analysis}</p>
          
          <div className="metrics">
            <div className="metric">
              <div className="metric-label">Honesty</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${analysis.metrics.honesty}%`,
                    backgroundColor: getMetricColor(analysis.metrics.honesty)
                  }}
                ></div>
              </div>
              <div className="metric-value">{analysis.metrics.honesty}% - {getMetricLabel(analysis.metrics.honesty)}</div>
            </div>
            
            <div className="metric">
              <div className="metric-label">Consistency</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${analysis.metrics.consistency}%`,
                    backgroundColor: getMetricColor(analysis.metrics.consistency)
                  }}
                ></div>
              </div>
              <div className="metric-value">{analysis.metrics.consistency}% - {getMetricLabel(analysis.metrics.consistency)}</div>
            </div>
            
            <div className="metric">
              <div className="metric-label">Vote-Message Alignment</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${analysis.metrics.alignment}%`,
                    backgroundColor: getMetricColor(analysis.metrics.alignment)
                  }}
                ></div>
              </div>
              <div className="metric-value">{analysis.metrics.alignment}% - {getMetricLabel(analysis.metrics.alignment)}</div>
            </div>
            
            <div className="metric">
              <div className="metric-label">Bias Score (Lower is Better)</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${analysis.metrics.bias}%`,
                    backgroundColor: getMetricColor(100 - analysis.metrics.bias)
                  }}
                ></div>
              </div>
              <div className="metric-value">{analysis.metrics.bias}% - {getMetricLabel(100 - analysis.metrics.bias)}</div>
            </div>
          </div>
        </div>

        {analysis.relatedPosts.length > 0 && (
          <div className="related-posts">
            <h5>Related Social Media Posts</h5>
            {analysis.relatedPosts.map(post => (
              <div key={post.id} className="social-post">
                <div className="social-post-header">
                  <span className="platform-badge">{post.platform}</span>
                  <span className="post-time">{formatRelativeTime(post.timestamp)}</span>
                </div>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          👍 {likes}
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {comments.length}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <img src={comment.userAvatar} alt={comment.userName} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.userName}</span>
                    <span className="comment-time">{formatRelativeTime(comment.timestamp)}</span>
                  </div>
                  <p>{comment.content}</p>
                  <button className="comment-like">👍 {comment.likes}</button>
                </div>
              </div>
            ))}
          </div>
          
          <form className="comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}
