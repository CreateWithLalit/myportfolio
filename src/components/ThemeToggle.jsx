import React, { useState } from 'react';
import { Palette, X, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

const slideUpKeyframes = `
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export default function ThemeToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDark, setIsDark, accentColor, setAccentColor, themeColors } = useTheme();

    return (
        <>
            <style>{slideUpKeyframes}</style>

            {/* Fixed container */}
            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>

                {/* Settings panel */}
                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        bottom: 64,
                        right: 0,
                        width: 220,
                        background: 'var(--portfolio-card-bg)',
                        border: '1px solid var(--portfolio-border)',
                        borderRadius: 16,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        padding: 20,
                        animation: 'slideUp 0.25s ease forwards',
                    }}>

                        {/* A) Dark Mode */}
                        <div style={{
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            color: 'var(--portfolio-text-muted)',
                            marginBottom: 12,
                        }}>
                            Appearance
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Left label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Moon size={16} color="var(--portfolio-text)" />
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--portfolio-text)' }}>
                                    Dark Mode
                                </span>
                            </div>

                            {/* Right: Custom toggle switch */}
                            <div
                                onClick={() => setIsDark(!isDark)}
                                style={{
                                    width: 44,
                                    height: 24,
                                    borderRadius: 999,
                                    background: isDark ? 'var(--portfolio-accent)' : '#d1d5db',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s',
                                    position: 'relative',
                                    flexShrink: 0,
                                }}
                            >
                                <div style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: '50%',
                                    background: 'white',
                                    position: 'absolute',
                                    top: '50%',
                                    transform: `translate(${isDark ? '22px' : '2px'}, -50%)`,
                                    transition: 'transform 0.3s ease',
                                }} />
                            </div>
                        </div>

                        {/* B) Divider */}
                        <div style={{ height: 1, background: 'var(--portfolio-border)', margin: '16px 0' }} />

                        {/* C) Theme Colors */}
                        <div style={{
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            color: 'var(--portfolio-text-muted)',
                            marginBottom: 12,
                        }}>
                            Accent Color
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 10,
                        }}>
                            {themeColors.map((color) => {
                                const isActive = accentColor === color.value;
                                return (
                                    <div
                                        key={color.value}
                                        title={color.name}
                                        onClick={() => setAccentColor(color.value)}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            background: color.value,
                                            cursor: 'pointer',
                                            border: isActive ? '3px solid var(--portfolio-text)' : '3px solid transparent',
                                            boxShadow: isActive ? `0 0 0 2px ${color.value}` : 'none',
                                            transition: 'all 0.2s ease',
                                            margin: '0 auto',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Main toggle button */}
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        background: 'var(--portfolio-accent)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.1)' : 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
                >
                    {isOpen ? <X size={20} /> : <Palette size={20} />}
                </button>
            </div>
        </>
    );
}
