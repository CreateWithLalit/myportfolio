import React, { useState, useEffect } from 'react';
import {
    Menu, X, Github, Linkedin, Twitter, MapPin, Briefcase, Code,
    Code2, Palette, Zap, Sparkles, ExternalLink, Send, CheckCircle,
    ChevronDown,
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
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.scroll-reveal').forEach((el) => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, []);

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
        setFormStatus('sending');
        setTimeout(() => setFormStatus('sent'), 1500);
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
                    <span
                        className="font-fraunces"
                        onClick={() => scrollToSection('home')}
                        style={{ fontSize: '1.5rem', color: ACCENT, cursor: 'pointer', fontWeight: 700, letterSpacing: '-0.5px' }}
                    >
                        Lalit.
                    </span>

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
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--portfolio-text)', padding: 4 }}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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

                    {/* Tagline */}
                    <p className="font-dm-sans animate-fade-in-up stagger-3"
                        style={{ fontSize: '1.25rem', color: MUTED, marginBottom: '16px', fontWeight: 500 }}>
                        Creative Developer &amp; Designer
                    </p>

                    {/* Bio */}
                    <p className="font-dm-sans animate-fade-in-up stagger-3"
                        style={{ fontSize: '1rem', color: MUTED, marginBottom: '40px', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px' }}>
                        I'm a frontend developer specialising in React — building fast, beautiful, and accessible web experiences that users love.
                    </p>

                    {/* CTA buttons */}
                    <div className="animate-fade-in-up stagger-4"
                        style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
                        <button
                            onClick={() => scrollToSection('projects')}
                            style={{
                                backgroundColor: ACCENT, color: '#fff',
                                border: `2px solid ${ACCENT}`, borderRadius: '10px',
                                padding: '13px 32px', fontSize: '0.95rem', fontWeight: 600,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(73,136,196,0.35)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            View Projects
                        </button>
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

                        {/* Avatar */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '280px', height: '280px', borderRadius: '50%',
                                background: `linear-gradient(135deg, ${ACCENT} 0%, #7eb8e8 60%, #b8d8f5 100%)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 24px 64px rgba(73,136,196,0.25)`,
                                position: 'relative', flexShrink: 0,
                            }}>
                                <span className="font-fraunces" style={{ fontSize: '7rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>L</span>
                                {/* Decorative ring */}
                                <div style={{
                                    position: 'absolute', inset: '-12px', borderRadius: '50%',
                                    border: `2px dashed rgba(73,136,196,0.3)`,
                                    animation: 'spin 20s linear infinite',
                                }} />
                            </div>
                            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                        </div>

                        {/* Text */}
                        <div>
                            <p style={{ color: ACCENT, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                                About Me
                            </p>
                            <h2 className="font-fraunces" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-0.5px', color: 'var(--portfolio-text)' }}>
                                Passionate about crafting digital experiences
                            </h2>
                            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: '16px', fontSize: '0.97rem' }}>
                                I'm Lalit, a frontend developer based in India with a strong passion for building
                                visually compelling and performant web applications. With React as my primary tool,
                                I bridge the gap between design and engineering to deliver products people enjoy using.
                            </p>
                            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: '32px', fontSize: '0.97rem' }}>
                                I care deeply about clean code, pixel-perfect design, and intuitive user experiences.
                                When I'm not coding, I'm exploring new design trends, contributing to open-source projects,
                                or sketching wireframes for side projects that never quite ship — but always teach me something new.
                            </p>

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
                        <p style={{ color: ACCENT, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
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
            <section id="projects" style={{ backgroundColor: 'var(--portfolio-bg)', padding: '96px 0' }}>
                <div className="container-custom">
                    {/* Header */}
                    <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <p style={{ color: ACCENT, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                            My Work
                        </p>
                        <h2 className="font-fraunces" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--portfolio-text)' }}>
                            Featured Projects
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="scroll-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '28px', marginBottom: '48px' }}>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                style={{
                                    backgroundColor: 'var(--portfolio-card-bg)', borderRadius: '18px', overflow: 'hidden',
                                    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                    border: '1px solid var(--portfolio-border)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(73,136,196,0.16)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)'; }}
                            >
                                {/* Image */}
                                <div style={{ overflow: 'hidden', height: '192px', backgroundColor: 'var(--portfolio-hero-bg)' }}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        style={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            transition: 'transform 0.5s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                    />
                                </div>

                                {/* Body */}
                                <div style={{ padding: '24px' }}>
                                    <h3 className="font-fraunces" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--portfolio-text)' }}>
                                        {project.title}
                                    </h3>
                                    <p className="font-dm-sans" style={{
                                        color: MUTED, fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '16px',
                                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                    }}>
                                        {project.description}
                                    </p>

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
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: ACCENT, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                                    >
                                        View Project <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* GitHub CTA */}
                    <div className="scroll-reveal" style={{ textAlign: 'center' }}>
                        <a
                            href="#"
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
            </section>

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
                        {[Github, Linkedin].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                style={{ color: MUTED, transition: 'color 0.2s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; }}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    );
}