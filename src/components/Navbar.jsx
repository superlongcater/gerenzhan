import { useState, useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap';

const NAV_LINKS = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Opening animation — navbar slides down
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power4.out' }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '10px 0' : '20px 0',
        background: scrolled ? 'rgba(6, 6, 14, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: 0,
      }}
    >
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{
          fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.35rem',
          fontWeight: 700, letterSpacing: '-0.02em',
          background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          MH.Wang
        </a>

        <ul style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                fontSize: '0.85rem', fontWeight: 500,
                color: l.href === '#contact' ? 'var(--accent)' : 'var(--text-secondary)',
                letterSpacing: '0.03em', transition: 'color 0.25s', padding: '6px 0',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = l.href === '#contact' ? 'var(--accent)' : 'var(--text-secondary)'; }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
