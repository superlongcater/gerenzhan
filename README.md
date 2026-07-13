# 王明辉 — AI 编程工程师 · 个人作品集

> 计算机科学与技术专业 · 熟练运用 AI 工具加速全栈开发

## 简介

个人简历/作品集网站，展示教育背景、技术栈、项目经验与个人优势。使用 React + Vite 构建，GSAP 驱动动效，Framer Motion 处理交互过渡。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + Vite 8 |
| 动画 | GSAP (ScrollTrigger) + Framer Motion |
| 图标 | react-icons |
| 构建 | Oxlint (lint) |

## 本地运行

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run preview  # 预览构建产物
```

## 项目结构

```
src/
├── animations/      # GSAP 动画工具函数
│   └── gsap.js
├── components/      # 页面组件
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Strengths.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```
