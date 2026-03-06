import React, { useState, useEffect, createContext, useContext } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);
    const [accentColor, setAccentColor] = useState('#4988C4');

    const themeColors = [
        { name: 'Ocean Blue', value: '#4988C4' },
        { name: 'Royal Purple', value: '#7C3AED' },
        { name: 'Emerald', value: '#059669' },
        { name: 'Sunset Orange', value: '#EA580C' },
        { name: 'Rose Pink', value: '#DB2777' },
        { name: 'Teal', value: '#0D9488' },
    ];

    useEffect(() => {
        const root = document.documentElement;

        root.setAttribute('data-theme', isDark ? 'dark' : 'light');

        root.style.setProperty('--portfolio-accent', accentColor);
        root.style.setProperty('--portfolio-bg', isDark ? '#0f1117' : '#F7F8F0');
        root.style.setProperty('--portfolio-hero-bg', isDark ? '#1a1d2e' : '#F0F4FA');
        root.style.setProperty('--portfolio-alt-bg', isDark ? '#141720' : '#F0F4F9');
        root.style.setProperty('--portfolio-text', isDark ? '#f0f0f0' : '#1a1a1a');
        root.style.setProperty('--portfolio-text-muted', isDark ? '#9ca3af' : '#6b7280');
        root.style.setProperty('--portfolio-border', isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)');
        root.style.setProperty('--portfolio-card-bg', isDark ? '#1e2130' : '#ffffff');
    }, [isDark, accentColor]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, accentColor, setAccentColor, themeColors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
