import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

export default function App() {
    return (
        <ThemeProvider>
            <ThemeToggle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}