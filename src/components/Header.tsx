import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <h1>Civic<span>Watch</span></h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Feed</Link>
          <Link to="/legislators" className="nav-link">Legislators</Link>
        </nav>
      </div>
    </header>
  );
}
