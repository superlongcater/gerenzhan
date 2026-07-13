import { useEffect, useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { SiPython, SiFlask, SiMysql, SiLinux, SiPytorch } from 'react-icons/si';
import { TbBrain, TbDeviceLaptop, TbCertificate } from 'react-icons/tb';
import { gsap, ScrollTrigger, EASE } from '../animations/gsap';

const STATS = [
  { value: '3.45', label: 'GPA', suffix: '' },
  { value: '6', label: '荣誉奖项', suffix: '' },
  { value: '2', label: '完整项目', suffix: '+' },
  { value: '4', label: '持证证书', suffix: '个' },
];

const SKILL_TAGS = [
  { icon: <SiPython size={15} />, label: 'Python' },
  { icon: <SiFlask size={15} />, label: 'Flask / FastAPI' },
  { icon: <SiMysql size={15} />, label: 'MySQL / SQLite' },
  { icon: <SiLinux size={15} />, label: 'Linux' },
  { icon: <SiPytorch size={15} />, label: 'YOLOv8 / PyTorch' },
  { icon: <TbBrain size={16} />, label: 'AI 辅助开发' },
  { icon: <TbDeviceLaptop size={16} />, label: 'Vue3 / React' },
];

const CERTIFICATES = [
  { name: '全国计算机等级考试二级证书', org: '教育部教育考试院' },
  { name: '大学英语四级 (CET-4)', org: '全国大学英语四六级考试委员会' },
  { name: 'C1 驾驶证', org: '中华人民共和国公安部' },
  { name: '普通话水平测试二级甲等', org: '国家语言文字工作委员会' },
];

const HONORS = [
  { name: '校级一等奖学金', img: '/honors/校级一等奖学金.jpg' },
  { name: '优秀共青团员', img: '/honors/优秀共青团员.jpg' },
  { name: '党员先锋模范奖', img: '/honors/党员先锋模范奖.jpg' },
  { name: '优秀学生干部', img: '/honors/优秀学生干部.jpg' },
  { name: '优秀毕业生', img: '/honors/优秀毕业生.jpg' },
  { name: '挑战杯 · 银奖', img: '/honors/挑战杯·银奖.jpg' },
];

const CONTACT_ITEMS = [
  { icon: <FiPhone size={15} />, label: '17766326016', href: 'tel:17766326016' },
  { icon: <FiMail size={15} />, label: 'minghui031122@163.com', href: 'mailto:minghui031122@163.com' },
];

export default function About() {
  const [hoveredHonor, setHoveredHonor] = useState(null);
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const profileRowRef = useRef(null);
  const eduRef = useRef(null);
  const skillsRef = useRef(null);
  const honorsRef = useRef(null);
  const certsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section watermark — large "/ABOUT" clip reveal from right
      gsap.fromTo(watermarkRef.current,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.08, opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1,
          duration: 1.3, ease: EASE.inOut,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      // Header label + title
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: EASE.out,
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // Profile row (photo + stats card)
      gsap.fromTo(profileRowRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: EASE.out,
          scrollTrigger: { trigger: profileRowRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );

      // Sub-sections stagger
      const subSections = [eduRef.current, skillsRef.current, honorsRef.current, certsRef.current].filter(Boolean);
      subSections.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.75, ease: EASE.out,
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{
      position: 'relative', padding: '140px 0 120px',
    }}>
      <div className="dot-grid" />
      <div className="glow-orb" style={{
        width: 500, height: 500,
        background: 'rgba(91, 141, 239, 0.08)',
        top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section watermark — "/ABOUT" */}
        <div ref={watermarkRef} style={{
          position: 'absolute', top: -40, right: 0, zIndex: 0,
        }}>
          <span className="section-watermark">/ABOUT</span>
        </div>

        <div ref={headerRef} style={{ position: 'relative', zIndex: 1, opacity: 0 }}>
          <span className="section-label">/ 个人经历</span>
          <h2 className="section-title">关于我</h2>
        </div>

        {/* Photo + Stats + Contact */}
        <div ref={profileRowRef} style={{
          display: 'flex', gap: 28, alignItems: 'stretch', marginTop: 56, opacity: 0,
        }}>
          <div style={{
            flexShrink: 0, width: 160, aspectRatio: '3/4', borderRadius: 16,
            overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)',
            position: 'relative', alignSelf: 'stretch',
          }}>
            <img src="/photo.png" alt="王明辉"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="card-base" style={{
            flex: 1, padding: '28px 32px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20,
          }}>
            <div style={{ display: 'flex', gap: 32 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.75rem', fontWeight: 700,
                    background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    lineHeight: 1, marginBottom: 4,
                  }}>
                    {s.value}<span style={{ fontSize: '0.95rem' }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '0.82rem', color: 'var(--accent2)',
                background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
                padding: '3px 12px', borderRadius: 100,
              }}>
                中共党员
              </div>
              {CONTACT_ITEMS.map(item => (
                <a key={item.label} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: '0.84rem', color: 'var(--text-secondary)', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {item.icon}{item.label}
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                <FiMapPin size={15} />江苏省无锡市
              </div>
            </div>
          </div>
        </div>

        {/* Sub-sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 48 }}>
          {/* Education */}
          <div ref={eduRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <HiOutlineAcademicCap size={20} color="var(--accent)" />
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em' }}>教育背景</h3>
            </div>
            <div className="card-base" style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: '1rem' }}>西北民族大学</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: '"JetBrains Mono", monospace' }}>2022.09 — 2026.06</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
                计算机科学与技术 · 本科 · GPA 3.45
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                主修：高等数学、线性代数、数据结构与算法、C语言程序设计、Python程序设计
              </div>
            </div>
          </div>

          {/* Skill Tags */}
          <div ref={skillsRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <TbBrain size={20} color="var(--accent)" />
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em' }}>技术栈</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {SKILL_TAGS.map(skill => (
                <span key={skill.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px', borderRadius: 100,
                  background: 'rgba(91, 141, 239, 0.08)', border: '1px solid rgba(91, 141, 239, 0.15)',
                  fontSize: '0.82rem', color: 'var(--text-secondary)',
                  transition: 'all 0.25s', cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(91, 141, 239, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(91, 141, 239, 0.35)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(91, 141, 239, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(91, 141, 239, 0.15)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {skill.icon}{skill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Honors */}
          <div ref={honorsRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <TbCertificate size={20} color="var(--accent)" />
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em' }}>荣誉奖项</h3>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {HONORS.map((honor) => {
                const isHovered = hoveredHonor === honor.name;
                const anyHovered = hoveredHonor !== null;

                return (
                  <div
                    key={honor.name}
                    onMouseEnter={() => setHoveredHonor(honor.name)}
                    onMouseLeave={() => setHoveredHonor(null)}
                    style={{
                      flex: isHovered ? 2.2 : 1, minWidth: 0, height: 160,
                      borderRadius: 14,
                      background: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                      border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border)',
                      cursor: 'default', overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                      opacity: anyHovered && !isHovered ? 0.5 : 1,
                      boxShadow: isHovered ? '0 0 40px rgba(91,141,239,0.12)' : 'none',
                      display: 'flex', flexDirection: 'row', alignItems: 'center',
                    }}
                  >
                    <div style={{
                      flexShrink: 0,
                      width: isHovered ? 'auto' : '100%', minWidth: isHovered ? 0 : 'auto',
                      height: '100%', display: 'flex', flexDirection: 'column',
                      alignItems: isHovered ? 'flex-start' : 'center', justifyContent: 'center',
                      padding: isHovered ? '0 20px' : '0 8px', whiteSpace: 'nowrap',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    }}>
                      <div style={{
                        flexShrink: 0, width: isHovered ? 36 : 40, height: isHovered ? 36 : 40,
                        borderRadius: isHovered ? 8 : 12,
                        background: isHovered
                          ? 'linear-gradient(135deg, rgba(91,141,239,0.15), rgba(167,139,250,0.15))'
                          : 'linear-gradient(135deg, rgba(91,141,239,0.12), rgba(167,139,250,0.12))',
                        border: '1px solid rgba(91,141,239,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: isHovered ? 10 : 6,
                        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                        boxShadow: isHovered ? '0 0 10px rgba(91,141,239,0.25)' : 'none',
                      }}>
                        <svg width={isHovered ? 15 : 18} height={isHovered ? 15 : 18} viewBox="0 0 24 24" fill="none"
                          stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                          opacity={0.7}
                        >
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                      </div>
                      <div style={{
                        fontSize: isHovered ? '0.92rem' : '0.78rem', fontWeight: isHovered ? 600 : 500,
                        color: 'var(--text-primary)', textAlign: isHovered ? 'left' : 'center',
                        lineHeight: 1.3, transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                        whiteSpace: isHovered ? 'normal' : 'nowrap',
                      }}>
                        {honor.name}
                      </div>
                      <div style={{
                        fontSize: '0.68rem', color: 'var(--text-muted)',
                        fontFamily: '"JetBrains Mono", monospace', marginTop: 6,
                        opacity: isHovered ? 0.7 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.05s',
                      }}>
                        荣誉证书
                      </div>
                    </div>

                    <div style={{
                      flex: 1, height: '100%',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.05s',
                      background: honor.img
                        ? `url(${honor.img}) right center/contain no-repeat`
                        : 'linear-gradient(135deg, rgba(91,141,239,0.06), rgba(167,139,250,0.06))',
                      borderRadius: '0 14px 14px 0', marginRight: -1,
                    }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificates */}
          <div ref={certsRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <TbCertificate size={20} color="var(--accent)" />
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em' }}>持有证书</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              {CERTIFICATES.map(cert => (
                <div key={cert.name} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '20px 22px', borderRadius: 14,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  transition: 'all 0.3s', cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(91,141,239,0.15), rgba(167,139,250,0.15))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(91,141,239,0.2)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15C15.866 15 19 12.5376 19 9.5C19 6.46243 15.866 4 12 4C8.13401 4 5 6.46243 5 9.5C5 12.5376 8.13401 15 12 15Z" />
                      <path d="M5 9.5V14.5C5 17.5376 8.13401 20 12 20C15.866 20 19 17.5376 19 14.5V9.5" />
                      <path d="M16 12.5L19 14.5V9.5" />
                      <path d="M8 12.5L5 14.5V9.5" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {cert.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
