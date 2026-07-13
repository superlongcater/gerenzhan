import { useEffect, useRef } from 'react';
import { TbBrain, TbCode, TbDeviceLaptop, TbFileText, TbUsers, TbAutomation } from 'react-icons/tb';
import { gsap, ScrollTrigger, EASE } from '../animations/gsap';

const STRENGTHS = [
  {
    icon: <TbBrain size={28} />,
    title: 'AI 编程加速',
    description: '熟练借助 Cursor、Codex、Claude 等 AI 工具进行代码编写、排错与重构，大幅提升项目迭代效率。',
  },
  {
    icon: <TbCode size={28} />,
    title: '全栈落地能力',
    description: '独立完成从模型训练到 Web 系统部署的完整闭环，具备 Python + Vue / React 的前后端串联能力。',
  },
  {
    icon: <TbAutomation size={28} />,
    title: '视觉 AI 工程化',
    description: '有 YOLOv8 模型训练、数据增强、多源图像实时推理的实战经验，能构建端到端的视觉检测系统。',
  },
  {
    icon: <TbDeviceLaptop size={28} />,
    title: '基础运维能力',
    description: '掌握 Linux 基础命令，熟悉 MySQL / SQLite 的 CRUD、条件查询与批量数据处理。',
  },
  {
    icon: <TbFileText size={28} />,
    title: '技术文档能力',
    description: '能够撰写清晰的技术说明文档，具备基础功能自测与简易故障排查的实操经验。',
  },
  {
    icon: <TbUsers size={28} />,
    title: '团队协作意识',
    description: '中共党员，严谨负责，具备良好的沟通与配合能力，可配合团队完成开发协助与文档编撰。',
  },
];

export default function Strengths() {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark
      gsap.fromTo(watermarkRef.current,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.08, opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1,
          duration: 1.3, ease: EASE.inOut,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      // Header
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: EASE.out,
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // Cards stagger — scale up from 0.92
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0, scale: 0.92 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.75, ease: EASE.out, stagger: 0.1,
            scrollTrigger: { trigger: cards[0], start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="strengths" style={{
      position: 'relative', padding: '120px 0 140px',
    }}>
      <div className="dot-grid" />
      <div className="glow-orb" style={{
        width: 550, height: 550,
        background: 'rgba(91, 141, 239, 0.06)',
        top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Watermark */}
        <div ref={watermarkRef} style={{ position: 'absolute', top: -40, right: 0, zIndex: 0 }}>
          <span className="section-watermark">/STRENGTHS</span>
        </div>

        <div ref={headerRef} style={{ position: 'relative', zIndex: 1, marginBottom: 56, opacity: 0 }}>
          <span className="section-label">/ 个人优势</span>
          <h2 className="section-title">核心竞争力</h2>
          <p className="section-desc">
            应届毕业生中最独特的标签：AI 编程能力 + 完整项目落地经验
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {STRENGTHS.map((item, idx) => (
            <div
              key={item.title}
              ref={el => { cardRefs.current[idx] = el; }}
              className="card-base"
              style={{ padding: '36px 32px' }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(91,141,239,0.12), rgba(167,139,250,0.12))',
                border: '1px solid rgba(91,141,239,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', marginBottom: 24,
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.1rem',
                fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 10,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7,
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
