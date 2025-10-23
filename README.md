# CivicWatch - Political Accountability Platform

A Facebook-style social feed application that analyzes the consistency between legislators' voting records and their social media statements. The app integrates data models from OpenStates, api.congress.gov, and govinfo.gov to provide transparency in political accountability.

## Features

### 📊 Analysis Feed
- Real-time feed displaying analysis results comparing voting records with social media posts
- Metrics for honesty, consistency, bias, and vote-message alignment
- Interactive commenting and engagement features
- Like functionality for posts and comments

### 👥 Legislator Profiles
- Comprehensive profiles for U.S. Senators and Representatives
- Biography, committee assignments, and term information
- Historical analysis results for each legislator
- Data integration with OpenStates and Congress.gov

### 📈 Analysis Metrics
- **Honesty Score**: Measures how accurately statements reflect positions
- **Consistency Score**: Tracks alignment between past and current positions
- **Bias Score**: Evaluates partisan framing in messaging (lower is better)
- **Alignment Score**: Compares voting records with social media statements

### 💬 Social Engagement
- Comment on analysis results
- Like posts and comments
- View related social media posts from legislators

## Data Sources

The application uses data models compatible with:

1. **OpenStates API** - State legislative data and legislator information
2. **Congress.gov API** - Federal legislative data, bills, and voting records
3. **GovInfo.gov** - Official government publications and bill texts

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **date-fns** for date formatting
- Modern CSS with component-based styling

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:

```bash
npm run build
```

### Linting

Check code quality:

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Feed.tsx        # Main feed component
│   ├── AnalysisPost.tsx # Individual analysis post
│   ├── LegislatorList.tsx # Grid of legislators
│   └── LegislatorProfile.tsx # Detailed legislator page
├── types/              # TypeScript type definitions
│   └── index.ts        # Data models for APIs
├── data/               # Mock data
│   ├── mockLegislators.ts
│   ├── mockBills.ts
│   └── mockAnalysisResults.ts
├── services/           # API services
│   └── api.ts         # Service layer for data fetching
├── utils/              # Utility functions
│   └── helpers.ts     # Helper functions for formatting
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Data Models

### Legislator
Represents U.S. legislators with data from OpenStates and Congress.gov:
- Personal information and biography
- Party affiliation and district
- Committee assignments
- Term dates
- OpenStates and Congress.gov IDs

### Bill
Legislative bills from GovInfo.gov:
- Bill number and title
- Summary and status
- Sponsor information
- Links to full text

### VotingRecord
Records of legislator votes on bills:
- Vote type (yea/nay/present/not-voting)
- Date and roll call number

### AnalysisResult
Analysis comparing votes with social media:
- Legislator and bill information
- Related social media posts
- Calculated metrics (honesty, consistency, bias, alignment)
- Analysis description
- Comments and engagement data

## API Integration

The current implementation uses mock data, but the service layer is designed to easily integrate with real APIs:

```typescript
// Example: Replace mock data with real API calls
export const ApiService = {
  async getAnalysisResults(): Promise<AnalysisResult[]> {
    // Replace with real API call
    const response = await fetch('https://api.example.com/analysis');
    return response.json();
  },
  // ... other methods
};
```

### OpenStates API Integration
Replace mock data in `mockLegislators.ts` with calls to:
- `https://v3.openstates.org/people`
- `https://v3.openstates.org/bills`

### Congress.gov API Integration
Integrate with Congress.gov API for:
- Bill information
- Voting records
- Committee data

### GovInfo.gov Integration
Use GovInfo.gov for:
- Full bill texts
- Official documents
- Congressional records

## Future Enhancements

- [ ] Real API integration with OpenStates, Congress.gov, and GovInfo.gov
- [ ] User authentication and personalized feeds
- [ ] Advanced filtering and search
- [ ] Data visualization and charts
- [ ] Mobile app version
- [ ] Email notifications for new analysis
- [ ] Export analysis reports
- [ ] Compare multiple legislators side-by-side

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
