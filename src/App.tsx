import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Feed from './components/Feed';
import LegislatorList from './components/LegislatorList';
import LegislatorProfile from './components/LegislatorProfile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/legislators" element={<LegislatorList />} />
            <Route path="/legislator/:id" element={<LegislatorProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
