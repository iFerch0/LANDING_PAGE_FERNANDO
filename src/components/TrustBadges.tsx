"use client";
import React from 'react';

const TrustBadges = () => {
    return (
        <div className="trust-badges" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '16px'
        }}>
            <div className="trust-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-primary)',
                color: 'var(--color-btn-primary-text)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
            }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Certificado</span>
            </div>

            <div className="trust-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-success)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
            }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span>24h respuesta</span>
            </div>

            <div className="trust-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-warning)',
                color: 'var(--color-text)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
            }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <span>30 días garantía</span>
            </div>
        </div>
    );
};

export default TrustBadges;
