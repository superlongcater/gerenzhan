import { useEffect, useRef } from 'react';
import { FiMail, FiPhone, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { gsap, ScrollTrigger, EASE } from '../animations/gsap';

export default function Contact() {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark
      gsap.fromTo(watermarkRef.current,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.04, opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1,
          duration: 0.8, ease: EASE.inOut,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      // Header
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: EASE.out,
          scrollTrigger: { trigger: headerRef.current, start: 'top 86%', toggleActions: 'play none none none' },
        }
      );

      // Contact cards stagger
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, ease: EASE.out, stagger: 0.08,
            scrollTrigger: { trigger: cards[0], start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      }

      // CTA buttons
      gsap.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: EASE.out,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 94%', toggleActions: 'play none none none' },
        }
      );

      // Footer
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: footerRef.current, start: 'top 98%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,141,239,0.06) 0%, transparent 70%)',
      }} />
      <div className="dot-grid" />

      <div className="glow-orb" style={{
        width: 500, height: 500, background: 'rgba(91, 141, 239, 0.1)',
        top: '25%', left: '10%',
      }} />
      <div className="glow-orb" style={{
        width: 400, height: 400, background: 'rgba(167, 139, 250, 0.08)',
        bottom: '20%', right: '10%',
      }} />
      <div className="glow-orb" style={{
        width: 300, height: 300, background: 'rgba(34, 211, 160, 0.06)',
        top: '55%', left: '60%',
      }} />

      <div className="container" style={{
        position: 'relative', zIndex: 2, width: '100%',
        textAlign: 'center', padding: '100px 0',
      }}>
        {/* Watermark */}
        <div ref={watermarkRef} style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
          <span className="section-watermark">/CONTACT</span>
        </div>

        <div ref={headerRef} style={{ position: 'relative', zIndex: 1, opacity: 0 }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>/ 保持联系</span>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700,
            letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 16,
          }}>
            让我们一起
            <br />
            用 AI 改变<span style={{
              background: 'linear-gradient(135deg, #5b8def, #a78bfa, #22d3a0)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}> 世界</span>
          </h2>

          <p style={{
            color: 'var(--text-secondary)', fontSize: '1.05rem',
            maxWidth: 480, margin: '0 auto 56px', lineHeight: 1.7,
          }}>
            期待每一次连接与交流，一起探索 AI 编程的更多可能
          </p>
        </div>

        {/* Contact cards */}
        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 80,
        }}>
          {[
            { icon: <FiMail size={22} />, label: '邮箱', value: 'minghui031122@163.com', href: 'mailto:minghui031122@163.com' },
            { icon: <FiPhone size={22} />, label: '电话', value: '17766326016', href: 'tel:17766326016' },
            { icon: <HiOutlineMapPin size={22} />, label: '所在地', value: '江苏省无锡市', href: null },
            { icon: <FiGithub size={22} />, label: 'GitHub', value: 'github.com/superlongcater', href: 'https://github.com/superlongcater' },
          ].map((item, idx) => {
            const card = (
              <div ref={el => { cardsRef.current[idx] = el; }} className="card-base" key={item.label} style={{
                padding: '32px 36px', minWidth: 220, textAlign: 'left',
                display: 'flex', alignItems: 'flex-start', gap: 16,
              }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(91,141,239,0.12), rgba(167,139,250,0.12))',
                  border: '1px solid rgba(91,141,239,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {item.value}
                  </div>
                </div>
              </div>
            );

            if (item.href) {
              return <a key={item.label} href={item.href} style={{ display: 'block' }}>{card}</a>;
            }
            return card;
          })}
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}>
          <a href="mailto:minghui031122@163.com" className="btn btn-primary" style={{ padding: '16px 40px' }}>
            发送邮件 <FiArrowUpRight size={16} />
          </a>
          <a href="#" className="btn btn-outline" style={{ padding: '16px 40px' }}>
            下载简历
          </a>
        </div>

        {/* Footer */}
        <div ref={footerRef} style={{
          marginTop: 100, paddingTop: 32, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16, opacity: 0,
        }}>
          <div style={{
            fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.1rem', fontWeight: 700,
            background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            MH.Wang
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 王明辉. Built with React + Vite.
          </div>
        </div>
      </div>
    </section>
  );
}
