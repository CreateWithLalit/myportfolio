import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, Github, Linkedin, Twitter, MapPin, Briefcase, Code,
    Code2, Palette, Zap, Sparkles, ExternalLink, Send, CheckCircle,
    ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import { skills, technologies, projects, socialLinks } from '../mock.js';

/* ─── Icon map for dynamic lucide rendering ─────────────────── */
const ICON_MAP = { Code2, Palette, Zap, Sparkles, Github, Linkedin, Twitter };

function LucideIcon({ name, size = 24, style = {}, className = '' }) {
    const Icon = ICON_MAP[name];
    if (!Icon) return null;
    return <Icon size={size} style={style} className={className} />;
}

/* ─── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = ['home', 'about', 'skills', 'projects', 'contact'];

const ACCENT = 'var(--portfolio-accent)';
const MUTED = 'var(--portfolio-text-muted)';
const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID || "mojkqknj"; // Get this from formspree.io

/* ══════════════════════════════════════════════════════════════
   REUSABLE PROJECT CARD
══════════════════════════════════════════════════════════════ */
const ProjectCard = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const description = project.description || "";
    const isLong = description.length > 120;

    return (
        <div
            style={{
                backgroundColor: 'var(--portfolio-card-bg)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--portfolio-border)',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Image */}
            <div style={{
                height: '220px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'var(--portfolio-alt-bg)', // Base color for skeleton
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-shimmer 1.5s infinite linear'
            }}>
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease, opacity 0.3s ease',
                        opacity: 0, // Start hidden for fade-in
                    }}
                    onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
            </div>
            <style>{`
                @keyframes skeleton-shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

            {/* Body */}
            <div style={{ padding: '24px' }}>
                <h3 className="font-fraunces" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--portfolio-text)' }}>
                    {project.title}
                </h3>

                <div style={{ marginBottom: '16px' }}>
                    <p className="font-dm-sans" style={{
                        color: MUTED, fontSize: '0.875rem', lineHeight: 1.6,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: isExpanded ? 'unset' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {description}
                    </p>
                    {isLong && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: ACCENT,
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '4px 0',
                                marginTop: '4px',
                                textTransform: 'uppercase'
                            }}
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                    {project.tags.map((tag) => (
                        <span key={tag} style={{
                            backgroundColor: 'rgba(73,136,196,0.1)', color: ACCENT,
                            borderRadius: '6px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: 600,
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Link */}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: ACCENT, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                >
                    View Project <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   HORIZONTAL SCROLL PROJECTS
══════════════════════════════════════════════════════════════ */
const HorizontalScrollProjects = ({ projects }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = window.innerWidth > 768 ? scrollRef.current.clientWidth / 2 : scrollRef.current.clientWidth;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section id="projects" style={{ backgroundColor: 'var(--portfolio-bg)', padding: '96px 0', overflow: 'hidden' }}>
            <div className="container-custom">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
                    <div className="scroll-reveal" style={{ textAlign: 'left' }}>
                        <p style={{ color: ACCENT, fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
                            My Work
                        </p>
                        <h2 className="font-fraunces" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--portfolio-text)', marginBottom: 0 }}>
                            Projects
                        </h2>
                    </div>

                    {/* Navigation Buttons to hint at more content */}
                    <div className="scroll-reveal" style={{ display: 'flex', gap: '12px' }}>
                        <button 
                            onClick={() => scroll('left')}
                            style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '48px', height: '48px', borderRadius: '50%',
                                backgroundColor: 'var(--portfolio-card-bg)', border: '1px solid var(--portfolio-border)',
                                color: 'var(--portfolio-text)', cursor: 'pointer', transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--portfolio-border)'; e.currentTarget.style.color = 'var(--portfolio-text)'; }}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '48px', height: '48px', borderRadius: '50%',
                                backgroundColor: 'var(--portfolio-card-bg)', border: '1px solid var(--portfolio-border)',
                                color: 'var(--portfolio-text)', cursor: 'pointer', transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--portfolio-border)'; e.currentTarget.style.color = 'var(--portfolio-text)'; }}
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="projects-scroll-container" ref={scrollRef}>
                    {projects.map((project) => (
                        <div key={project.id} className="project-card-wrapper">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                <div className="scroll-reveal" style={{ textAlign: 'center', marginTop: '32px' }}>
                    <a
                        href="https://github.com/CreateWithLalit"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            border: `2px solid var(--portfolio-border)`, borderRadius: '10px',
                            padding: '13px 32px', fontSize: '0.95rem', fontWeight: 600,
                            color: 'var(--portfolio-text)', textDecoration: 'none',
                            transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--portfolio-border)'; e.currentTarget.style.color = 'var(--portfolio-text)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <Github size={18} /> View All on GitHub
                    </a>
                </div>
            </div>
            <style>{`
                .projects-scroll-container {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    gap: 28px;
                    padding-bottom: 32px;
                    -webkit-overflow-scrolling: touch;
                }
                .project-card-wrapper {
                    flex-shrink: 0;
                    scroll-snap-align: start;
                    /* Mobile: show 1 large item (85% of screen) */
                    width: 85vw;
                }
                
                /* Tablet: show 2 items at a time */
                @media (min-width: 768px) {
                    .project-card-wrapper {
                        width: calc(50% - 14px);
                    }
                }
                
                /* Desktop: show exactly 3 items at a time */
                @media (min-width: 1024px) {
                    .project-card-wrapper {
                        width: calc(33.333% - 18.66px);
                    }
                }

                .projects-scroll-container::-webkit-scrollbar {
                    height: 10px;
                }
                .projects-scroll-container::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 8px;
                }
                .projects-scroll-container::-webkit-scrollbar-thumb {
                    background: rgba(200, 200, 200, 0.15);
                    border-radius: 8px;
                }
                .projects-scroll-container::-webkit-scrollbar-thumb:hover {
                    background: rgba(200, 200, 200, 0.25);
                }
            `}</style>
        </section>
    );
};

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formErrors, setFormErrors] = useState({});
    const [formStatus, setFormStatus] = useState('idle');
    const [hoveredTech, setHoveredTech] = useState(null);

    /* ─── Scroll reveal observer ──────────────────────────────── */
    useEffect(() => {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );

        // Re-query to catch dynamic elements or elements rendered after mount
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => revealObserver.observe(el));

        return () => revealObserver.disconnect();
    }, [projects]); // Depend on projects to ensure it runs after list renders

    /* ─── Active section observer ─────────────────────────────── */
    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
            },
            { threshold: 0.6 }
        );
        NAV_LINKS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) sectionObserver.observe(el);
        });
        return () => sectionObserver.disconnect();
    }, []);

    /* ─── Scroll listener ─────────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ─── Mobile menu scroll-lock ────────────────────────────── */
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    /* ─── Helpers ─────────────────────────────────────────────── */
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required.';
        if (!formData.email.trim()) errors.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            errors.email = 'Please enter a valid email.';
        if (!formData.message.trim()) errors.message = 'Message is required.';
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

        setFormStatus('sending');

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('sent');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                alert("Something went wrong. Please check your Formspree ID or try again later.");
                setTimeout(() => setFormStatus('idle'), 3000);
            }
        } catch (err) {
            setFormStatus('error');
            console.error("Form submission error:", err);
            setTimeout(() => setFormStatus('idle'), 3000);
        }
    };

    /* ─── Input shared styles ─────────────────────────────────── */
    const inputBase = {
        width: '100%',
        border: '1.5px solid var(--portfolio-border)',
        borderRadius: '10px',
        padding: '12px 14px',
        fontSize: '0.95rem',
        fontFamily: "'DM Sans', sans-serif",
        color: 'var(--portfolio-text)',
        backgroundColor: 'var(--portfolio-card-bg)',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    };

    /* ══════════════════════════════════════════════════════════════
       RENDER
    ══════════════════════════════════════════════════════════════ */
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--portfolio-text)' }}>

            {/* ════════════════════════════════════
          NAVBAR
      ════════════════════════════════════ */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                backgroundColor: isScrolled ? 'var(--portfolio-bg)' : 'transparent',
                boxShadow: isScrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                transition: 'all 0.3s ease',
            }}>
                <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
                    {/* Logo */}
                    <div
                        onClick={() => scrollToSection('home')}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <img
                            src="/logo.png"
                            alt="Lalit Logo"
                            style={{
                                height: '40px',
                                width: 'auto',
                                borderRadius: '8px'
                            }}
                        />
                    </div>

                    {/* Desktop links */}
                    <ul className="desktop-only"
                        style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                        {NAV_LINKS.map((link) => (
                            <li key={link}>
                                <button
                                    onClick={() => scrollToSection(link)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500,
                                        color: activeSection === link ? ACCENT : 'var(--portfolio-text-muted)',
                                        textDecoration: activeSection === link ? 'underline' : 'none',
                                        textUnderlineOffset: '4px',
                                        transition: 'color 0.2s ease',
                                        textTransform: 'capitalize',
                                        padding: '4px 0',
                                    }}
                                    onMouseEnter={(e) => { if (activeSection !== link) e.target.style.color = ACCENT; }}
                                    onMouseLeave={(e) => { if (activeSection !== link) e.target.style.color = MUTED; }}
                                >
                                    {link.charAt(0).toUpperCase() + link.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile hamburger */}
                    <button
                        className="mobile-only"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            width: '40px', height: '40px', position: 'relative',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 60, padding: 0
                        }}
                        aria-label="Toggle menu"
                    >
                        <div style={{ width: '22px', height: '18px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <span style={{
                                width: '100%', height: '2px',
                                backgroundColor: 'var(--portfolio-text)', borderRadius: '2px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: isMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none'
                            }} />
                            <span style={{
                                width: '100%', height: '2px',
                                backgroundColor: 'var(--portfolio-text)', borderRadius: '2px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: isMenuOpen ? 0 : 1,
                                transform: isMenuOpen ? 'translateX(10px)' : 'none'
                            }} />
                            <span style={{
                                width: '100%', height: '2px',
                                backgroundColor: 'var(--portfolio-text)', borderRadius: '2px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: isMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'
                            }} />
                        </div>
                    </button>
                </div>

                {/* Mobile dropdown */}
                {isMenuOpen && (
                    <div style={{
                        backgroundColor: 'var(--portfolio-bg)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        borderTop: '1px solid var(--portfolio-border)',
                    }}>
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link}
                                onClick={() => scrollToSection(link)}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 500,
                                    color: activeSection === link ? ACCENT : 'var(--portfolio-text)',
                                    padding: '14px 24px',
                                    textTransform: 'capitalize',
                                    borderBottom: '1px solid var(--portfolio-border)',
                                }}
                            >
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
            <section id="home" style={{
                minHeight: '100vh', position: 'relative', overflow: 'hidden',
                backgroundColor: 'var(--portfolio-hero-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute', top: '10%', left: '-80px', width: '320px', height: '320px',
                    borderRadius: '50%', backgroundColor: ACCENT, opacity: 0.06, pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '8%', right: '-60px', width: '240px', height: '240px',
                    borderRadius: '50%', backgroundColor: ACCENT, opacity: 0.08, pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', top: '50%', right: '12%', width: '120px', height: '120px',
                    borderRadius: '50%', backgroundColor: ACCENT, opacity: 0.05, pointerEvents: 'none',
                }} />



                {/* Hero content */}
                <div style={{ maxWidth: '700px', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    {/* Available pill */}
                    <div className="animate-fade-in-up stagger-1"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                        <span style={{
                            border: `1.5px solid ${ACCENT}`, borderRadius: '999px', padding: '6px 16px',
                            color: ACCENT, fontSize: '0.875rem', fontWeight: 600,
                            backgroundColor: 'rgba(73,136,196,0.07)',
                        }}>
                            👋 Available for work
                        </span>
                    </div>

                    {/* H1 */}
                    <h1
                        className="font-fraunces animate-fade-in-up stagger-2"
                        style={{
                            fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 800,
                            color: 'var(--portfolio-text)', lineHeight: 1.1, marginBottom: '20px',
                            letterSpacing: '-1.5px',
                        }}
                    >
                        Hi, I'm Lalit
                        <span className="animate-blink" style={{ color: ACCENT, marginLeft: '4px' }}>|</span>
                    </h1>



                    {/* Bio */}
                    <p className="font-dm-sans animate-fade-in-up stagger-3"
                        style={{ fontSize: '1rem', color: MUTED, marginBottom: '40px', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px' }}>
                        I'm a Full Stack Developer specialising in Next.js, React, and TypeScript — building responsive, fast, and user-focused web applications.
                    </p>

                    {/* CTA buttons */}
                    <div className="animate-fade-in-up stagger-4"
                        style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
                        <a
                            href="/Lalit'sResume.pdf"
                            download="Lalit'sResume.pdf"
                            style={{
                                backgroundColor: ACCENT, color: '#fff',
                                border: `2px solid ${ACCENT}`, borderRadius: '10px',
                                padding: '13px 32px', fontSize: '0.95rem', fontWeight: 600,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(73,136,196,0.35)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            Download Resume
                        </a>
                        <a
                            href="/Lalit'sResume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: 'transparent', color: ACCENT,
                                border: `2px solid ${ACCENT}`, borderRadius: '10px',
                                padding: '13px 32px', fontSize: '0.95rem', fontWeight: 600,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                textDecoration: 'none',
                                transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            View Resume
                        </a>
                        <button
                            onClick={() => scrollToSection('contact')}
                            style={{
                                backgroundColor: 'transparent', color: ACCENT,
                                border: `2px solid ${ACCENT}`, borderRadius: '10px',
                                padding: '13px 32px', fontSize: '0.95rem', fontWeight: 600,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Scroll indicator */}
                    <div className="animate-bounce-slow" style={{ display: 'flex', justifyContent: 'center', color: MUTED }}>
                        <ChevronDown size={28} />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
          ABOUT
      ════════════════════════════════════ */}
            <section id="about" style={{ backgroundColor: 'var(--portfolio-bg)', padding: '96px 0' }}>
                <div className="container-custom scroll-reveal">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>

                        {/* Interactive Robot Avatar */}
                        <div
                            style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                perspective: '1000px', cursor: 'pointer'
                            }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = (e.clientX - rect.left) / rect.width - 0.5;
                                const y = (e.clientY - rect.top) / rect.height - 0.5;
                                e.currentTarget.style.setProperty('--mouse-x', x);
                                e.currentTarget.style.setProperty('--mouse-y', y);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.setProperty('--mouse-x', 0);
                                e.currentTarget.style.setProperty('--mouse-y', 0);
                            }}
                        >
                            <svg
                                width="300" height="300" viewBox="0 0 200 200"
                                style={{
                                    transform: 'rotateX(calc(var(--mouse-y, 0) * -15deg)) rotateY(calc(var(--mouse-x, 0) * 15deg))',
                                    transition: 'transform 0.1s ease-out'
                                }}
                            >
                                {/* Glow Effect */}
                                <defs>
                                    <radialGradient id="robotGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                        <stop offset="0%" style={{ stopColor: ACCENT, stopOpacity: 0.2 }} />
                                        <stop offset="100%" style={{ stopColor: ACCENT, stopOpacity: 0 }} />
                                    </radialGradient>
                                </defs>
                                <circle cx="100" cy="100" r="80" fill="url(#robotGlow)" />

                                {/* Robot Body */}
                                <rect x="60" y="110" width="80" height="60" rx="15" fill="var(--portfolio-card-bg)" stroke={ACCENT} strokeWidth="3" />
                                <rect x="85" y="100" width="30" height="15" fill="var(--portfolio-card-bg)" stroke={ACCENT} strokeWidth="2" />

                                {/* Robot Head Wrapper */}
                                <g style={{
                                    transform: 'translate(calc(var(--mouse-x, 0) * 15px), calc(var(--mouse-y, 0) * 15px))',
                                    transition: 'transform 0.1s ease-out'
                                }}>
                                    {/* Head Shape */}
                                    <rect x="55" y="45" width="90" height="70" rx="20" fill="var(--portfolio-bg)" stroke={ACCENT} strokeWidth="4" />

                                    {/* Antenna */}
                                    <line x1="100" y1="45" x2="100" y2="25" stroke={ACCENT} strokeWidth="3" />
                                    <circle cx="100" cy="20" r="5" fill={ACCENT} className="animate-pulse" />

                                    {/* Eyes (Glass) */}
                                    <rect x="75" y="65" width="50" height="25" rx="12" fill="rgba(73,136,196,0.1)" stroke={ACCENT} strokeWidth="2" />

                                    {/* Eye Pupils (Pupils follow cursor) */}
                                    <g style={{
                                        transform: 'translate(calc(var(--mouse-x, 0) * 10px), calc(var(--mouse-y, 0) * 6px))',
                                        transition: 'transform 0.1s ease-out'
                                    }}>
                                        <circle cx="88" cy="77" r="4" fill={ACCENT} />
                                        <circle cx="112" cy="77" r="4" fill={ACCENT} />
                                    </g>

                                    {/* Small Blinking Lights */}
                                    <circle cx="70" cy="100" r="2" fill={ACCENT} style={{ animation: 'blink 2s infinite' }} />
                                    <circle cx="130" cy="100" r="2" fill={ACCENT} style={{ animation: 'blink 2s infinite 1s' }} />
                                </g>

                                {/* Decorative Ring (Parallax) */}
                                <circle
                                    cx="100" cy="100" r="95"
                                    fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="8 8" opacity="0.3"
                                    style={{
                                        transform: 'translate(calc(var(--mouse-x, 0) * -10px), calc(var(--mouse-y, 0) * -10px))',
                                        transition: 'transform 0.1s ease-out'
                                    }}
                                />
                            </svg>
                            <style>{`
                                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                            `}</style>
                        </div>

                        {/* Text */}
                        <div>
                            <p style={{ color: ACCENT, fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
                                About Me
                            </p>
                            <h2 className="font-fraunces" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-0.5px', color: 'var(--portfolio-text)' }}>
                                Bridging Design & Engineering with Modern Web Solutions
                            </h2>
                            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: '16px', fontSize: '0.97rem' }}>
                                I'm Lalit, a results-driven Full Stack Developer based in Noida, India. With a solid foundation in modern web technologies, I have delivered responsive web applications for freelance clients, achieving a 100% on-time delivery rate and 4.9/5 client satisfaction rating.
                            </p>
                            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: '24px', fontSize: '0.97rem' }}>
                                I specialize in building scalable, high-performance web applications using JavaScript (ES6+), TypeScript, Next.js, React, and Supabase. I am passionate about optimizing web performance, achieving 90+ Lighthouse scores, and implementing cross-browser compatible solutions. I'm actively seeking a full-time frontend/full-stack role to contribute my technical expertise and drive user-focused solutions.
                            </p>
                            <div style={{
                                backgroundColor: 'rgba(73,136,196,0.05)',
                                borderLeft: `4px solid ${ACCENT}`,
                                padding: '16px 20px',
                                borderRadius: '8px',
                                marginBottom: '32px'
                            }}>
                                <p style={{ color: 'var(--portfolio-text)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>
                                    🚀 Open for Freelance Opportunities
                                </p>
                                <p style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                    Looking for a dedicated developer to bring your vision to life? I specialize in building
                                    premium landing pages, SaaS dashboards, and full-stack applications. **Let's connect and build something extraordinary together.**
                                </p>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    style={{
                                        marginTop: '16px', backgroundColor: ACCENT, color: '#fff',
                                        border: 'none', borderRadius: '8px', padding: '10px 20px',
                                        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                >
                                    Work With Me
                                </button>
                            </div>

                            {/* Info grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                {[
                                    { icon: MapPin, label: 'India' },
                                    { icon: Briefcase, label: 'Frontend Developer' },
                                    { icon: Code, label: 'React & Web Dev' },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                                        backgroundColor: 'var(--portfolio-hero-bg)', borderRadius: '12px', padding: '14px 8px',
                                        textAlign: 'center',
                                    }}>
                                        <Icon size={20} style={{ color: ACCENT }} />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--portfolio-text)' }}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
          SKILLS
      ════════════════════════════════════ */}
            <section id="skills" style={{ backgroundColor: 'var(--portfolio-alt-bg)', padding: '96px 0' }}>
                <div className="container-custom">
                    {/* Header */}
                    <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <p style={{ color: ACCENT, fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
                            What I Do
                        </p>
                        <h2 className="font-fraunces" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--portfolio-text)' }}>
                            Skills &amp; Expertise
                        </h2>
                    </div>

                    {/* Cards */}
                    <div className="scroll-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '56px' }}>
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                style={{
                                    backgroundColor: 'var(--portfolio-card-bg)', borderRadius: '18px', padding: '28px 24px',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                    cursor: 'default',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(73,136,196,0.18)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
                            >
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '14px',
                                    backgroundColor: 'rgba(73,136,196,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '18px',
                                }}>
                                    <LucideIcon name={skill.icon} size={28} style={{ color: ACCENT }} />
                                </div>
                                <h3 className="font-fraunces" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.2, color: 'var(--portfolio-text)' }}>
                                    {skill.title}
                                </h3>
                                <p className="font-dm-sans" style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.65 }}>
                                    {skill.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Technologies */}
                    <div className="scroll-reveal" style={{ textAlign: 'center' }}>
                        <p style={{ color: MUTED, fontWeight: 600, fontSize: '0.9rem', marginBottom: '20px' }}>
                            Technologies I work with
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                            {technologies.map((tech) => (
                                <span
                                    key={tech}
                                    onMouseEnter={() => setHoveredTech(tech)}
                                    onMouseLeave={() => setHoveredTech(null)}
                                    style={{
                                        border: `1.5px solid ${hoveredTech === tech ? ACCENT : 'var(--portfolio-border)'}`,
                                        borderRadius: '999px', padding: '8px 20px', fontSize: '0.88rem', fontWeight: 600,
                                        cursor: 'default',
                                        backgroundColor: hoveredTech === tech ? ACCENT : 'transparent',
                                        color: hoveredTech === tech ? '#fff' : 'var(--portfolio-text)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
          PROJECTS
      ════════════════════════════════════ */}
            <HorizontalScrollProjects projects={projects} />

            {/* ════════════════════════════════════
          CONTACT
      ════════════════════════════════════ */}
            <section id="contact" style={{ backgroundColor: 'var(--portfolio-alt-bg)', padding: '96px 0' }}>
                <div className="container-custom">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>

                        {/* Left col */}
                        <div className="scroll-reveal">
                            <p style={{ color: ACCENT, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                                Get In Touch
                            </p>
                            <h2 className="font-fraunces" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.5px', color: 'var(--portfolio-text)' }}>
                                Let's Work Together
                            </h2>
                            <p style={{ color: MUTED, lineHeight: 1.8, fontSize: '0.97rem', marginBottom: '36px' }}>
                                I'm always open to new opportunities, collaborations, or just a friendly chat about design and development.
                                Drop me a message and I'll get back to you within 24 hours.
                            </p>

                            {/* Social links */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                                            color: MUTED, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600,
                                            transition: 'color 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; }}
                                    >
                                        <LucideIcon name={social.icon} size={20} />
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right col — form */}
                        <div className="scroll-reveal">
                            <form onSubmit={handleFormSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                {/* Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        style={{ ...inputBase, borderColor: formErrors.name ? '#e53e3e' : 'var(--portfolio-border)' }}
                                        onFocus={(e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px rgba(73,136,196,0.15)`; }}
                                        onBlur={(e) => { e.target.style.borderColor = formErrors.name ? '#e53e3e' : 'var(--portfolio-border)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    {formErrors.name && <p style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '6px' }}>{formErrors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        style={{ ...inputBase, borderColor: formErrors.email ? '#e53e3e' : 'var(--portfolio-border)' }}
                                        onFocus={(e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px rgba(73,136,196,0.15)`; }}
                                        onBlur={(e) => { e.target.style.borderColor = formErrors.email ? '#e53e3e' : 'var(--portfolio-border)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    {formErrors.email && <p style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '6px' }}>{formErrors.email}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        style={{ ...inputBase, resize: 'vertical', borderColor: formErrors.message ? '#e53e3e' : 'var(--portfolio-border)' }}
                                        onFocus={(e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px rgba(73,136,196,0.15)`; }}
                                        onBlur={(e) => { e.target.style.borderColor = formErrors.message ? '#e53e3e' : 'var(--portfolio-border)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    {formErrors.message && <p style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '6px' }}>{formErrors.message}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending' || formStatus === 'sent'}
                                    style={{
                                        width: '100%', padding: '14px',
                                        backgroundColor: formStatus === 'sent' ? '#38a169' : ACCENT,
                                        color: '#fff', border: 'none', borderRadius: '10px',
                                        fontSize: '1rem', fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                        cursor: formStatus !== 'idle' ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        opacity: formStatus === 'sending' ? 0.75 : 1,
                                        transition: 'background-color 0.3s ease, opacity 0.3s ease, transform 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => { if (formStatus === 'idle') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    {formStatus === 'idle' && <><Send size={18} /> Send Message</>}
                                    {formStatus === 'sending' && <>Sending…</>}
                                    {formStatus === 'sent' && <><CheckCircle size={18} /> Message Sent ✓</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
            <footer style={{ borderTop: '1px solid var(--portfolio-border)', padding: '32px 0', backgroundColor: 'var(--portfolio-bg)' }}>
                <div
                    className="container-custom"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
                >
                    <p style={{ color: MUTED, fontSize: '0.875rem', textAlign: 'center', flexGrow: 1 }} className="md:text-left">
                        © {new Date().getFullYear()} Lalit · Built with React
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexGrow: 1 }} className="md:justify-end">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: MUTED, transition: 'color 0.2s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; }}
                            >
                                <LucideIcon name={social.icon} size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    );
}