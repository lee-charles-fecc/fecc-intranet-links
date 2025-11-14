import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { INTRANET_LINKS } from './data/links';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import LinkCard from './components/LinkCard';
import Login from './components/Login';
import './styles/App.css';

function App() {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, isLoading, login, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLinks = INTRANET_LINKS.filter(link =>
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="app-container theme-dark">
                <div className="loading-container">
                    <svg className="loading-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                </div>
            </div>
        );
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return <Login onLogin={login} />;
    }

    // Show main application if authenticated
    return (
        <div className={`app-container theme-${theme}`}>
            <div className="background-gradient"></div>

            <Header theme={theme} toggleTheme={toggleTheme} onLogout={logout} />

            <main className="main-content">
                <div className="content-wrapper">
                    <div className="search-section">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <p className="results-count">
                            {filteredLinks.length} {filteredLinks.length === 1 ? 'service' : 'services'} available
                        </p>
                    </div>

                    <div className="links-grid">
                        {filteredLinks.map(link => (
                            <LinkCard key={link.id} link={link} />
                        ))}
                    </div>

                    {filteredLinks.length === 0 && (
                        <div className="no-results">
                            <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <h3>No services found</h3>
                            <p>Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;