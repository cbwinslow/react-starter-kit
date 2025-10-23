# API Integration Guide

This document provides guidance on integrating real APIs from OpenStates, Congress.gov, and GovInfo.gov.

## Current Architecture

The application uses a service layer pattern (`src/services/api.ts`) that currently returns mock data. This design makes it easy to swap mock data with real API calls.

## API Sources

### 1. OpenStates API

**Purpose**: State and federal legislator information

**Base URL**: `https://v3.openstates.org`

**Key Endpoints**:
- `GET /people` - List legislators
- `GET /people/{id}` - Get specific legislator details
- `GET /bills` - List bills

**Authentication**: Requires API key (get from https://openstates.org/accounts/profile/)

**Example Integration**:
```typescript
// In src/services/api.ts
const OPENSTATES_API_KEY = process.env.VITE_OPENSTATES_API_KEY;

async getLegislators(): Promise<Legislator[]> {
  const response = await fetch('https://v3.openstates.org/people', {
    headers: {
      'X-API-Key': OPENSTATES_API_KEY,
    },
  });
  const data = await response.json();
  return data.results.map(transformOpenStatesLegislator);
}
```

**Data Mapping**:
- `id` → `openStatesId`
- `name` → `name`
- `party` → `party`
- `current_role.district` → `district`

### 2. Congress.gov API

**Purpose**: Federal bills, voting records, and committee information

**Base URL**: `https://api.congress.gov/v3`

**Key Endpoints**:
- `GET /member` - List members of Congress
- `GET /member/{bioguideId}` - Get specific member details
- `GET /bill` - List bills
- `GET /bill/{congress}/{billType}/{billNumber}` - Get bill details

**Authentication**: Requires API key (request from https://api.congress.gov/)

**Example Integration**:
```typescript
const CONGRESS_API_KEY = process.env.VITE_CONGRESS_API_KEY;

async getBill(billId: string): Promise<Bill> {
  const response = await fetch(
    `https://api.congress.gov/v3/bill/118/hr/${billId}?api_key=${CONGRESS_API_KEY}`
  );
  const data = await response.json();
  return transformCongressBill(data.bill);
}
```

**Data Mapping**:
- `bioguideId` → `congressGovId`
- `bill.title` → `title`
- `bill.summary` → `summary`
- `bill.introducedDate` → `introducedDate`

### 3. GovInfo.gov API

**Purpose**: Official government documents and full bill texts

**Base URL**: `https://api.govinfo.gov`

**Key Endpoints**:
- `GET /collections/BILLS/{congress}/{session}` - List bills
- `GET /packages/{packageId}` - Get package details
- `GET /packages/{packageId}/pdf` - Get PDF of bill

**Authentication**: Requires API key (request from https://api.govinfo.gov/docs/)

**Example Integration**:
```typescript
const GOVINFO_API_KEY = process.env.VITE_GOVINFO_API_KEY;

async getBillFullText(packageId: string): Promise<string> {
  const response = await fetch(
    `https://api.govinfo.gov/packages/${packageId}?api_key=${GOVINFO_API_KEY}`
  );
  const data = await response.json();
  return data.download.pdfLink;
}
```

**Data Mapping**:
- `packageId` → Used to construct `govInfoUrl`
- `download.pdfLink` → `fullTextUrl`

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPENSTATES_API_KEY=your_openstates_key_here
VITE_CONGRESS_API_KEY=your_congress_key_here
VITE_GOVINFO_API_KEY=your_govinfo_key_here
```

## Implementation Steps

### Step 1: Install HTTP Client (Optional)
```bash
npm install axios
```

### Step 2: Create API Configuration
```typescript
// src/config/api.ts
export const API_CONFIG = {
  openStates: {
    baseUrl: 'https://v3.openstates.org',
    apiKey: import.meta.env.VITE_OPENSTATES_API_KEY,
  },
  congress: {
    baseUrl: 'https://api.congress.gov/v3',
    apiKey: import.meta.env.VITE_CONGRESS_API_KEY,
  },
  govInfo: {
    baseUrl: 'https://api.govinfo.gov',
    apiKey: import.meta.env.VITE_GOVINFO_API_KEY,
  },
};
```

### Step 3: Create Transformer Functions
```typescript
// src/services/transformers.ts
import type { Legislator } from '../types';

export function transformOpenStatesLegislator(data: any): Legislator {
  return {
    id: data.id,
    name: data.name,
    party: data.party,
    state: data.jurisdiction.name,
    chamber: data.current_role?.type === 'upper' ? 'senate' : 'house',
    district: data.current_role?.district,
    photoUrl: data.image || '/default-avatar.png',
    biography: data.biography || '',
    openStatesId: data.id,
    congressGovId: data.identifiers?.find(i => i.scheme === 'bioguide')?.identifier,
    termStart: data.current_role?.start_date || '',
    termEnd: data.current_role?.end_date || '',
    committees: data.current_role?.committees || [],
  };
}
```

### Step 4: Update Service Methods
Replace mock implementations in `src/services/api.ts` with real API calls:

```typescript
import { API_CONFIG } from '../config/api';
import { transformOpenStatesLegislator } from './transformers';

export const ApiService = {
  async getLegislators(): Promise<Legislator[]> {
    const response = await fetch(`${API_CONFIG.openStates.baseUrl}/people`, {
      headers: {
        'X-API-Key': API_CONFIG.openStates.apiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch legislators');
    }
    
    const data = await response.json();
    return data.results.map(transformOpenStatesLegislator);
  },
  
  // Update other methods similarly...
};
```

## Rate Limiting

All three APIs have rate limits:
- **OpenStates**: ~1000 requests/hour (varies by tier)
- **Congress.gov**: Varies by plan
- **GovInfo.gov**: Varies by plan

**Recommendations**:
1. Implement caching with a state management library (Redux, Zustand)
2. Cache responses in localStorage for short periods
3. Debounce user-triggered requests
4. Consider implementing a backend proxy for better control

## Error Handling

```typescript
try {
  const legislators = await ApiService.getLegislators();
  setLegislators(legislators);
} catch (error) {
  console.error('Failed to load legislators:', error);
  // Show user-friendly error message
  setError('Unable to load legislators. Please try again later.');
}
```

## Testing

For development without API keys, the mock data will continue to work. Simply keep the mock implementations as a fallback:

```typescript
export const ApiService = {
  async getLegislators(): Promise<Legislator[]> {
    if (import.meta.env.DEV && !API_CONFIG.openStates.apiKey) {
      // Use mock data in development
      return mockLegislators;
    }
    
    // Real API call
    const response = await fetch(/* ... */);
    // ...
  },
};
```

## Resources

- [OpenStates API Documentation](https://docs.openstates.org/api-v3/)
- [Congress.gov API Documentation](https://api.congress.gov/)
- [GovInfo.gov API Documentation](https://api.govinfo.gov/docs/)
- [React Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
