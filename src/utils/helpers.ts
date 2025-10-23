import { formatDistanceToNow } from 'date-fns';

/**
 * Format a timestamp to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (timestamp: string): string => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

/**
 * Get color for a metric score
 */
export const getMetricColor = (score: number): string => {
  if (score >= 80) return '#22c55e'; // green
  if (score >= 60) return '#eab308'; // yellow
  if (score >= 40) return '#f97316'; // orange
  return '#ef4444'; // red
};

/**
 * Get label for a metric score
 */
export const getMetricLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

/**
 * Get party color
 */
export const getPartyColor = (party: string): string => {
  switch (party.toLowerCase()) {
    case 'democrat':
      return '#3b82f6'; // blue
    case 'republican':
      return '#ef4444'; // red
    case 'independent':
      return '#8b5cf6'; // purple
    default:
      return '#6b7280'; // gray
  }
};

/**
 * Truncate text to a certain length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
