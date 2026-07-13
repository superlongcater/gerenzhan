import { useEffect, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import { gsap, EASE } from '../animations/gsap';

const LINE1 = '用 AI 思维';
const LINE2 = '构建';
const LINE3 = ' 智能未来';

export default function Hero() {
  const sectionRef = useRef(null);
  const pinyinRef = useRef(null);
  const labelRef = useRef(null);
  const line1CharsRef = useRef([]);
  const line2CharsRef = useRef([]);
  const line3CharsRef = useRef([]);
  const descRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      // 0.15s - Pinyin background text: clip reveal from bottom
      tl.fromTo(pinyinRef.current,
        { clipPath: 'inset(0 0 100% 0)', y: 40 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.4, ease: EASE.inOut },
        0.15
      );

      // 0.5s - Label: clip reveal from right
      tl.fromTo(labelRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9 },
        0.5
      );

      // 0.7s - Line 1 characters: y reveal stagger
      const l1 = line1CharsRef.current.filter(Boolean);
      const l2 = line2CharsRef.current.filter(Boolean);
      const l3 = line3CharsRef.current.filter(Boolean);

      if (l1.length) {
        tl.to(l1, {
          y: '0%', duration: 0.7, stagger: 0.04, ease: EASE.out,
        }, 0.7);
      }

      // 1.0s - Line 2 + Line 3 (gradient) characters
      if (l2.length) {
        tl.to(l2, {
          y: '0%', duration: 0.7, stagger: 0.04, ease: EASE.out,
        }, 1.0);
      }
      if (l3.length) {
        tl.to(l3, {
          y: '0%', duration: 0.7, stagger: 0.04, ease: EASE.out,
        }, 1.0);
      }

      // 1.55s - Description paragraph
      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.55
      );

      // 1.85s - Buttons: scale stagger
      tl.fromTo([btn1Ref.current, btn2Ref.current].filter(Boolean),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: EASE.out },
        1.85
      );

      // 2.3s - Scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 }, { opacity: 1, duration: 1 }, 2.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Render char spans for a string, collecting refs
  const renderChars = (text, refArr) =>
    [...text].map((char, i) => (
      <span
        key={i}
        ref={el => { refArr.current[i] = el; }}
        className="hero-char"
        style={{
          transform: 'translateY(120%)',
          whiteSpace: char === ' ' ? 'pre' : 'normal',
        }}
      >
        {char}
      </span>
    ));

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      height: '100vh',
      minHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, rgba(6,6,14,0.5) 60%, rgba(6,6,14,0.85) 100%)',
        pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ zIndex: 1 }} />

      {/* Ambient orbs */}
      <div className="glow-orb" style={{
        width: 700, height: 700,
        background: 'var(--accent-glow)',
        top: '15%', left: '10%', zIndex: 0,
      }} />
      <div className="glow-orb" style={{
        width: 500, height: 500,
        background: 'rgba(167, 139, 250, 0.12)',
        bottom: '10%', right: '8%', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Pinyin name — clip revealed */}
        <div ref={pinyinRef} style={{
          position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 'clamp(6rem, 14vw, 16rem)', fontWeight: 800,
          lineHeight: 0.9, letterSpacing: '-0.03em',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(91,141,239,0.3) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          pointerEvents: 'none', userSelect: 'none', textAlign: 'right',
        }}>
          WANG<br />MINGHUI
        </div>

        <div>
          {/* Label */}
          <div ref={labelRef} style={{ display: 'inline-block', marginBottom: 16 }}>
            <span className="section-label" style={{ fontSize: '0.77rem', display: 'block' }}>
              AI 编程工程师
            </span>
          </div>

          {/* Heading with character-level stagger */}
          <h1 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', fontWeight: 700,
            lineHeight: 1.06, letterSpacing: '-0.025em',
            marginBottom: 24, maxWidth: 900,
          }}>
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              {renderChars(LINE1, line1CharsRef)}
            </span>
            <br />
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              {renderChars(LINE2, line2CharsRef)}
            </span>
            <span style={{
              display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom',
              background: 'linear-gradient(135deg, #5b8def 0%, #a78bfa 50%, #22d3a0 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {renderChars(LINE3, line3CharsRef)}
            </span>
          </h1>

          <p ref={descRef} style={{
            color: 'var(--text-secondary)', fontSize: '1.08rem',
            maxWidth: 540, lineHeight: 1.75, marginBottom: 40, opacity: 0,
          }}>
            计算机科学与技术专业，熟练运用 AI 工具加速全栈开发。
            <br />
            从视觉检测系统到视频平台，用代码把想法落地为产品。
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a ref={btn1Ref} href="#projects" className="btn btn-primary" style={{ opacity: 0 }}>
              查看作品 <FiArrowDown size={15} />
            </a>
            <a ref={btn2Ref} href="#contact" className="btn btn-outline" style={{ opacity: 0 }}>
              取得联系
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0,
        }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            向下滚动
          </span>
          <div style={{ animation: 'bob 2s ease-in-out infinite' }}>
            <FiArrowDown size={18} color="var(--text-muted)" />
          </div>
        </div>
      </div>
    </section>
  );
}
