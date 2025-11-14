import React from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/header.css';

const Header = ({ theme, toggleTheme, onLogout }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <div className="logo-container">
                        <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="header-title">Intranet Portal</h1>
                        <p className="header-subtitle">Internal Services & Tools</p>
                    </div>
                </div>
                <div className="header-right">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    {onLogout && (
                        <button className="logout-button" onClick={onLogout} aria-label="Logout">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span className="logout-text">Logout</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;