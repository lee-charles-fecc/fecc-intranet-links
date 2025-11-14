import React, { useState } from 'react';
import '../styles/linkcard.css';

const LinkCard = ({ link }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <a href={link.url} className="link-card" target="_blank" rel="noopener noreferrer">
            <div className="link-card-inner">
                <div className="link-card-header">
                    <div className="link-icon-container">
                        {!imgError ? (
                            <img
                                src={link.icon}
                                alt={`${link.name} icon`}
                                className="link-icon"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="link-icon-fallback">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="link-card-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </div>
                </div>
                <div className="link-card-content">
                    <h3 className="link-card-title">{link.name}</h3>
                    <p className="link-card-description">{link.description}</p>
                </div>
                <div className="link-card-footer">
                    <span className="link-url">{new URL(link.url).hostname}</span>
                </div>
            </div>
        </a>
    );
};

export default LinkCard;