import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { TbBug, TbBrandYoutube } from 'react-icons/tb';
import { gsap, ScrollTrigger, EASE } from '../animations/gsap';

const PROJECTS = [
  {
    icon: <TbBug size={26} />,
    title: '农业害虫智能检测与生态决策支持系统',
    subtitle: '基于 YOLOv8 的 Web 应用',
    description: '基于 YOLOv8 训练水稻、小麦专项害虫检测模型，经数据增强优化后检测精度显著提升。使用 Flask + Vue3 搭建 B/S 架构 Web 系统，实现图片、视频、摄像头多源图像实时检测。内置结构化农学知识库与分层规则决策引擎，支持 DeepSeek 大模型辅助通俗解读。',
    tech: ['YOLOv8', 'PyTorch', 'Flask', 'Vue3', 'DeepSeek API'],
    link: 'https://github.com/superlongcater/yolo-agri-pest-detection-system',
    color: '#22d3a0',
  },
  {
    icon: <TbBrandYoutube size={26} />,
    title: 'SealionHub 视频分享网站',
    subtitle: '仿主流视频平台的全栈应用',
    description: '基于 Vue3 + FastAPI 构建前后端分离应用。前端采用 Pinia、Vite 实现响应式深色主题界面，完成视频列表、播放、搜索、分类、评论点赞、上传分享等核心功能。后端基于 FastAPI、SQLAlchemy 与 SQLite 设计 RESTful 接口，实现视频数据管理、文件上传、播放量统计、用户头像与观看历史等模块。',
    tech: ['Vue3', 'Vite', 'Pinia', 'FastAPI', 'SQLAlchemy', 'SQLite'],
    link: 'https://github.com/superlongcater/SealionHub',
    color: '#a78bfa',
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

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
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: EASE.out,
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );

      // Cards — clip reveal from bottom (like a card flipping up)
      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { clipPath: 'inset(0 0 100% 0)', y: 25, opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1,
            duration: 0.6, ease: EASE.inOut, delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 94%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" style={{
      position: 'relative', padding: '120px 0 140px',
    }}>
      <div className="dot-grid" />
      <div className="glow-orb" style={{
        width: 600, height: 600,
        background: 'rgba(167, 139, 250, 0.06)',
        bottom: '10%', right: '5%',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Watermark */}
        <div ref={watermarkRef} style={{ position: 'absolute', top: -40, right: 0, zIndex: 0 }}>
          <span className="section-watermark">/PROJECTS</span>
        </div>

        <div ref={headerRef} style={{ position: 'relative', zIndex: 1, marginBottom: 56, opacity: 0 }}>
          <span className="section-label">/ 精选项目</span>
          <h2 className="section-title">作品集</h2>
          <p className="section-desc">
            独立设计并开发的项目，从 AI 视觉到全栈 Web 应用
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {PROJECTS.map((project, idx) => {
            const isExpanded = expanded === idx;
            return (
              <div
                key={project.title}
                ref={el => { cardRefs.current[idx] = el; }}
                style={{
                  borderRadius: 24,
                  background: 'var(--bg-card)',
                  border: isExpanded ? `1px solid ${project.color}33` : '1px solid var(--border)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  boxShadow: isExpanded ? `0 0 80px ${project.color}15, 0 8px 40px rgba(0,0,0,0.3)` : 'none',
                }}
                onClick={() => setExpanded(isExpanded ? null : idx)}
                onMouseEnter={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                {/* Header row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 24,
                  padding: isExpanded ? '40px 44px 28px' : '36px 44px',
                  transition: 'padding 0.35s ease',
                }}>
                  <div style={{
                    flexShrink: 0, width: 60, height: 60, borderRadius: 16,
                    background: `${project.color}15`, border: `1px solid ${project.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: project.color,
                  }}>
                    {project.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.4rem',
                      fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4,
                    }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: project.color }}>{project.subtitle}</p>
                  </div>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} style={{
                        padding: '4px 12px', borderRadius: 100,
                        background: `${project.color}0d`, border: `1px solid ${project.color}1a`,
                        fontSize: '0.72rem', fontFamily: '"JetBrains Mono", monospace', color: project.color,
                      }}>
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span style={{
                        padding: '4px 10px', borderRadius: 100, background: 'transparent',
                        border: '1px solid var(--border)', fontSize: '0.72rem',
                        fontFamily: '"JetBrains Mono", monospace', color: 'var(--text-muted)',
                      }}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronRight size={20} color={isExpanded ? project.color : 'var(--text-muted)'} />
                    </motion.div>
                    <div style={{
                      fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap',
                      opacity: isExpanded ? 0 : 1, transition: 'opacity 0.3s',
                      fontFamily: '"JetBrains Mono", monospace',
                    }}>
                      点击查看详情
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '0 44px 40px', borderTop: `1px solid ${project.color}10`, paddingTop: 28,
                  }}>
                    <p style={{
                      fontSize: '0.95rem', color: 'var(--text-secondary)',
                      lineHeight: 1.75, marginBottom: 28, maxWidth: 780,
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                      {project.tech.map(t => (
                        <span key={t} style={{
                          padding: '5px 14px', borderRadius: 100,
                          background: `${project.color}0d`, border: `1px solid ${project.color}1a`,
                          fontSize: '0.75rem', fontFamily: '"JetBrains Mono", monospace', color: project.color,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link} target="_blank" rel="noopener noreferrer"
                      className="btn"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}dd, ${project.color})`,
                        color: '#000', padding: '12px 28px', fontSize: '0.85rem',
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      访问项目 <FiExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
