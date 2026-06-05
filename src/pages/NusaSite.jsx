import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PINK = "#FF00A8";
const PINK_LIGHT = "#FF44C0";
const PINK_BG = "#FFF0FA";
const DARK = "#111111";
const WHITE = "#FFFFFF";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; color: #111; overflow-x: hidden; }

  .ns-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%; height: 72px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,0,168,0.12);
    transition: box-shadow 0.3s;
  }
  .ns-nav.scrolled { box-shadow: 0 4px 32px rgba(255,0,168,0.10); }
  .ns-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .ns-logo-icon {
    width: 40px; height: 40px; background: ${PINK}; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 900; font-size: 22px; color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: -2px;
  }
  .ns-logo-text { font-size: 1.3rem; font-weight: 800; color: ${DARK}; letter-spacing: -0.03em; line-height: 1; }
  .ns-logo-text span { color: ${PINK}; }
  .ns-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .ns-nav-links a { text-decoration: none; color: #555; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
  .ns-nav-links a:hover { color: ${PINK}; }
  .ns-nav-cta {
    background: ${PINK}; color: #fff; padding: 0.55rem 1.4rem;
    border-radius: 50px; font-size: 0.875rem; font-weight: 700;
    text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(255,0,168,0.3);
  }
  .ns-nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,0,168,0.4); }

  /* HERO */
  .ns-hero {
    min-height: 100vh; padding: 120px 5% 80px;
    display: flex; align-items: center;
    position: relative; overflow: hidden;
    background: #fff;
  }
  .ns-hero-bg {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse 60% 60% at 70% 40%, rgba(255,0,168,0.10) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255,0,168,0.06) 0%, transparent 70%);
  }
  .ns-hero-dots {
    position: absolute; top: 0; right: 0; width: 45%; height: 100%;
    background-image: radial-gradient(circle, rgba(255,0,168,0.15) 1.5px, transparent 1.5px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 80% 100% at 80% 50%, black 30%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 100% at 80% 50%, black 30%, transparent 100%);
  }
  .ns-hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; }
  .ns-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${PINK_BG}; color: ${PINK}; border: 1px solid rgba(255,0,168,0.2);
    padding: 6px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 700;
    margin-bottom: 1.75rem; letter-spacing: 0.04em; text-transform: uppercase;
  }
  .ns-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: ${PINK}; animation: blink 1.5s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .ns-h1 {
    font-size: clamp(2.4rem, 4.5vw, 4.2rem); font-weight: 800; line-height: 1.1;
    letter-spacing: -0.04em; color: ${DARK}; margin-bottom: 1.5rem;
  }
  .ns-h1 .hl { color: ${PINK}; position: relative; display: inline-block; }
  .ns-h1 .hl::after {
    content: ''; position: absolute; left: 0; bottom: -4px; width: 100%; height: 4px;
    background: ${PINK}; border-radius: 2px;
  }
  .ns-hero-sub { font-size: 1.1rem; color: #666; line-height: 1.7; margin-bottom: 2.5rem; max-width: 480px; }
  .ns-hero-btns { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  .btn-main {
    background: ${PINK}; color: #fff; padding: 0.85rem 2rem; border-radius: 50px;
    font-size: 1rem; font-weight: 700; text-decoration: none; display: inline-flex;
    align-items: center; gap: 8px; box-shadow: 0 8px 24px rgba(255,0,168,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-main:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(255,0,168,0.45); }
  .btn-outline {
    color: ${DARK}; padding: 0.85rem 2rem; border-radius: 50px;
    font-size: 1rem; font-weight: 600; text-decoration: none;
    border: 2px solid #e0e0e0; transition: border-color 0.2s, color 0.2s;
  }
  .btn-outline:hover { border-color: ${PINK}; color: ${PINK}; }
  .ns-hero-trust { display: flex; align-items: center; gap: 1.5rem; margin-top: 2.5rem; }
  .ns-avatars { display: flex; }
  .ns-avatar {
    width: 36px; height: 36px; border-radius: 50%; border: 2px solid #fff;
    margin-left: -8px; background: ${PINK}; color: #fff; font-size: 0.7rem;
    font-weight: 700; display: flex; align-items: center; justify-content: center;
  }
  .ns-avatar:first-child { margin-left: 0; }
  .ns-avatar.a2 { background: #222; }
  .ns-avatar.a3 { background: #ff6ec4; }
  .ns-avatar.a4 { background: #cc0088; }
  .ns-trust-text { font-size: 0.85rem; color: #888; }
  .ns-trust-text strong { color: ${DARK}; font-weight: 700; }

  /* HERO RIGHT */
  .ns-hero-right { position: relative; }
  .ns-mock-card {
    background: #fff; border-radius: 20px; padding: 1.5rem;
    box-shadow: 0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06);
    animation: floatUp 3.5s ease-in-out infinite;
    position: relative; z-index: 2;
  }
  @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  .ns-mock-topbar { display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; }
  .ns-mock-dot { width: 10px; height: 10px; border-radius: 50%; }
  .ns-mock-url { flex: 1; background: #f5f5f5; border-radius: 50px; height: 28px; display: flex; align-items: center; padding: 0 12px; font-size: 0.7rem; color: #999; }
  .ns-mock-hero-area { background: linear-gradient(135deg, ${PINK_BG} 0%, #fff 100%); border-radius: 12px; height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; border: 1px solid rgba(255,0,168,0.12); }
  .ns-mock-logo-preview { display: flex; align-items: center; gap: 8px; }
  .ns-mock-logo-icon { width: 30px; height: 30px; background: ${PINK}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 16px; }
  .ns-mock-logo-name { font-weight: 800; font-size: 1.1rem; color: ${DARK}; }
  .ns-mock-logo-name span { color: ${PINK}; }
  .ns-mock-lines { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
  .ns-mock-line { height: 8px; background: #f0f0f0; border-radius: 4px; }
  .ns-mock-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .ns-mock-block { height: 50px; border-radius: 8px; background: #f5f5f5; }
  .ns-mock-block.pink { background: ${PINK_BG}; border: 1px solid rgba(255,0,168,0.2); }
  .ns-floating-badge {
    position: absolute; top: -20px; right: -20px; z-index: 3;
    background: ${PINK}; color: #fff; border-radius: 16px; padding: 0.75rem 1rem;
    box-shadow: 0 8px 24px rgba(255,0,168,0.4); display: flex; gap: 8px; align-items: center;
    font-size: 0.8rem; font-weight: 700; white-space: nowrap;
    animation: popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.8s both;
  }
  @keyframes popIn { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
  .ns-floating-badge2 {
    position: absolute; bottom: -16px; left: -16px; z-index: 3;
    background: #fff; border-radius: 16px; padding: 0.75rem 1rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06);
    display: flex; gap: 8px; align-items: center; font-size: 0.8rem; font-weight: 700; white-space: nowrap;
    animation: popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 1.2s both;
  }

  /* STATS */
  .ns-stats {
    background: ${DARK}; padding: 3rem 5%; display: grid;
    grid-template-columns: repeat(4,1fr); gap: 0;
  }
  .ns-stat { text-align: center; padding: 1.5rem 1rem; border-right: 1px solid rgba(255,255,255,0.08); }
  .ns-stat:last-child { border-right: none; }
  .ns-stat-num { font-size: 2.4rem; font-weight: 800; color: ${PINK}; display: block; letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.5rem; }
  .ns-stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; }

  /* SERVICES */
  .ns-services { padding: 7rem 5%; background: #fff; }
  .ns-section-tag { display: inline-flex; align-items: center; gap: 8px; background: ${PINK_BG}; color: ${PINK}; padding: 5px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .ns-section-title { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; color: ${DARK}; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 0.75rem; }
  .ns-section-sub { font-size: 1rem; color: #888; line-height: 1.6; max-width: 500px; margin-bottom: 3.5rem; }
  .ns-services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
  .ns-service-card {
    background: #fff; border: 1.5px solid #f0f0f0; border-radius: 20px;
    padding: 2rem; cursor: pointer;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
  }
  .ns-service-card:hover { border-color: ${PINK}; transform: translateY(-6px); box-shadow: 0 20px 48px rgba(255,0,168,0.12); }
  .ns-service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: ${PINK}; transform: scaleX(0); transform-origin: left; transition: transform 0.3s; border-radius: 20px 20px 0 0; }
  .ns-service-card:hover::before { transform: scaleX(1); }
  .ns-service-icon { width: 52px; height: 52px; background: ${PINK_BG}; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.25rem; }
  .ns-service-num { font-size: 0.7rem; color: #ccc; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
  .ns-service-name { font-size: 1.15rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.6rem; }
  .ns-service-desc { font-size: 0.875rem; color: #777; line-height: 1.6; margin-bottom: 1.25rem; }
  .ns-service-price { font-size: 0.8rem; font-weight: 700; color: ${PINK}; display: inline-flex; align-items: center; gap: 4px; }

  /* PROCESS */
  .ns-process { padding: 7rem 5%; background: ${DARK}; }
  .ns-process .ns-section-tag { background: rgba(255,0,168,0.15); }
  .ns-process .ns-section-title { color: #fff; }
  .ns-process .ns-section-sub { color: rgba(255,255,255,0.5); }
  .ns-process-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; position: relative; margin-top: 4rem; }
  .ns-process-steps::before { content: ''; position: absolute; top: 30px; left: 10%; right: 10%; height: 1px; background: linear-gradient(to right, transparent, rgba(255,0,168,0.4), transparent); z-index: 0; }
  .ns-step { text-align: center; padding: 0 1.5rem; position: relative; z-index: 1; }
  .ns-step-num { width: 60px; height: 60px; border-radius: 50%; background: rgba(255,0,168,0.15); border: 1px solid rgba(255,0,168,0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 1.2rem; font-weight: 800; color: ${PINK}; }
  .ns-step-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.6rem; }
  .ns-step-desc { font-size: 0.8rem; color: rgba(255,255,255,0.45); line-height: 1.6; }

  /* PRICING */
  .ns-pricing { padding: 7rem 5%; background: #fafafa; }
  .ns-pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3.5rem; max-width: 1100px; margin-left: auto; margin-right: auto; }
  .ns-price-card { background: #fff; border: 1.5px solid #efefef; border-radius: 24px; padding: 2.5rem 2rem; transition: transform 0.25s, box-shadow 0.25s; position: relative; overflow: hidden; }
  .ns-price-card:hover { transform: translateY(-6px); box-shadow: 0 24px 56px rgba(0,0,0,0.08); }
  .ns-price-card.featured { background: ${DARK}; border-color: ${DARK}; }
  .ns-price-card.featured::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: ${PINK}; }
  .ns-price-popular { background: ${PINK}; color: #fff; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 50px; display: inline-block; margin-bottom: 1.5rem; }
  .ns-price-name { font-size: 1.2rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.3rem; }
  .ns-price-card.featured .ns-price-name { color: #fff; }
  .ns-price-amount { font-size: 2.8rem; font-weight: 800; color: ${DARK}; letter-spacing: -0.04em; line-height: 1.1; margin: 1rem 0 0.25rem; }
  .ns-price-card.featured .ns-price-amount { color: ${PINK}; }
  .ns-price-period { font-size: 0.8rem; color: #aaa; margin-bottom: 1.75rem; }
  .ns-price-list { list-style: none; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.6rem; }
  .ns-price-list li { font-size: 0.875rem; color: #555; display: flex; align-items: flex-start; gap: 10px; line-height: 1.4; }
  .ns-price-card.featured .ns-price-list li { color: rgba(255,255,255,0.65); }
  .ns-check { width: 18px; height: 18px; border-radius: 50%; background: ${PINK_BG}; color: ${PINK}; font-size: 0.65rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .ns-price-card.featured .ns-check { background: rgba(255,0,168,0.15); }
  .ns-price-btn-main { display: block; text-align: center; background: ${PINK}; color: #fff; padding: 0.85rem; border-radius: 50px; font-size: 0.9rem; font-weight: 700; text-decoration: none; box-shadow: 0 8px 20px rgba(255,0,168,0.35); transition: transform 0.2s, box-shadow 0.2s; }
  .ns-price-btn-main:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(255,0,168,0.45); }
  .ns-price-btn-ghost { display: block; text-align: center; border: 1.5px solid #e0e0e0; color: ${DARK}; padding: 0.85rem; border-radius: 50px; font-size: 0.9rem; font-weight: 700; text-decoration: none; transition: border-color 0.2s, color 0.2s; }
  .ns-price-btn-ghost:hover { border-color: ${PINK}; color: ${PINK}; }
  .ns-price-btn-ghost-dark { display: block; text-align: center; border: 1.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); padding: 0.85rem; border-radius: 50px; font-size: 0.9rem; font-weight: 700; text-decoration: none; transition: border-color 0.2s, color 0.2s; }
  .ns-price-btn-ghost-dark:hover { border-color: ${PINK}; color: ${PINK}; }

  /* TESTIMONIALS */
  .ns-testi { padding: 7rem 5%; background: #fff; }
  .ns-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3.5rem; }
  .ns-testi-card { background: #fafafa; border: 1.5px solid #f0f0f0; border-radius: 20px; padding: 2rem; transition: border-color 0.2s, transform 0.2s; }
  .ns-testi-card:hover { border-color: rgba(255,0,168,0.25); transform: translateY(-4px); }
  .ns-stars { color: ${PINK}; font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 1rem; }
  .ns-testi-text { font-size: 0.95rem; color: #444; line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
  .ns-testi-author { display: flex; align-items: center; gap: 12px; }
  .ns-testi-avatar { width: 42px; height: 42px; border-radius: 50%; background: ${PINK}; color: #fff; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; }
  .ns-testi-name { font-weight: 700; font-size: 0.9rem; color: ${DARK}; }
  .ns-testi-role { font-size: 0.75rem; color: #aaa; }

  /* CTA */
  .ns-cta {
    margin: 4rem 5% 4rem; border-radius: 28px; background: ${DARK};
    padding: 5rem 4rem; text-align: center; position: relative; overflow: hidden;
  }
  .ns-cta-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,0,168,0.18) 0%, transparent 70%); pointer-events: none; }
  .ns-cta h2 { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1rem; position: relative; z-index: 1; }
  .ns-cta h2 span { color: ${PINK}; }
  .ns-cta p { font-size: 1.05rem; color: rgba(255,255,255,0.55); margin-bottom: 2.5rem; max-width: 480px; margin-left: auto; margin-right: auto; position: relative; z-index: 1; line-height: 1.6; }
  .ns-cta-btns { display: flex; gap: 1rem; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }
  .btn-wa { background: #25D366; color: #fff; padding: 0.9rem 2rem; border-radius: 50px; font-size: 0.95rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 8px 24px rgba(37,211,102,0.35); transition: transform 0.2s; }
  .btn-wa:hover { transform: translateY(-2px); }
  .btn-white { background: #fff; color: ${DARK}; padding: 0.9rem 2rem; border-radius: 50px; font-size: 0.95rem; font-weight: 700; text-decoration: none; transition: transform 0.2s; }
  .btn-white:hover { transform: translateY(-2px); }

  /* FOOTER */
  .ns-footer { background: #111; padding: 4rem 5% 2rem; }
  .ns-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .ns-footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; text-decoration: none; }
  .ns-footer-logo-icon { width: 36px; height: 36px; background: ${PINK}; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 18px; }
  .ns-footer-logo-text { font-size: 1.2rem; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
  .ns-footer-logo-text span { color: ${PINK}; }
  .ns-footer-tagline { font-size: 0.875rem; color: rgba(255,255,255,0.4); line-height: 1.6; max-width: 260px; }
  .ns-footer-col h4 { font-size: 0.8rem; font-weight: 700; color: #fff; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.25rem; }
  .ns-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .ns-footer-col ul li a { font-size: 0.875rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .ns-footer-col ul li a:hover { color: ${PINK}; }
  .ns-footer-bottom { padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
  .ns-footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
  .ns-footer-copy span { color: ${PINK}; }
  .ns-socials { display: flex; gap: 1rem; }
  .ns-social { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4); font-size: 0.8rem; text-decoration: none; transition: background 0.2s, color 0.2s; font-weight: 700; }
  .ns-social:hover { background: ${PINK}; color: #fff; border-color: ${PINK}; }

  @media (max-width: 768px) {
    .ns-nav-links { display: none; }
    .ns-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
    .ns-hero-right { display: none; }
    .ns-stats { grid-template-columns: repeat(2,1fr); }
    .ns-services-grid { grid-template-columns: 1fr; }
    .ns-process-steps { grid-template-columns: 1fr 1fr; }
    .ns-pricing-grid { grid-template-columns: 1fr; }
    .ns-testi-grid { grid-template-columns: 1fr; }
    .ns-cta { padding: 3rem 2rem; }
    .ns-footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }
`;

const services = [
  { num: "01", icon: "🚀", name: "Landing Page", desc: "Halaman konversi tinggi untuk produk, event, atau promosi bisnis Anda.", price: "Mulai Rp 1,5 jt" },
  { num: "02", icon: "🏢", name: "Company Profile", desc: "Website resmi yang tampil profesional dan mudah ditemukan di Google.", price: "Mulai Rp 2,5 jt" },
  { num: "03", icon: "🛒", name: "Toko Online", desc: "E-commerce lengkap dengan payment gateway QRIS dan manajemen produk.", price: "Mulai Rp 5 jt" },
  { num: "04", icon: "⚙️", name: "Custom Web App", desc: "Sistem booking, dashboard admin, atau portal anggota sesuai kebutuhan.", price: "Harga custom" },
  { num: "05", icon: "🎨", name: "Redesign Website", desc: "Refresh tampilan website lama jadi modern, cepat, dan mobile-friendly.", price: "Mulai Rp 1,5 jt" },
  { num: "06", icon: "🔧", name: "Maintenance", desc: "Update konten, perbaikan bug, backup rutin agar website selalu prima.", price: "Rp 300rb/bln" },
];

const steps = [
  { num: "01", title: "Konsultasi", desc: "Ceritakan kebutuhan bisnis Anda. Gratis, tanpa komitmen." },
  { num: "02", title: "Desain", desc: "Kami buat mockup tampilan yang sesuai brand Anda." },
  { num: "03", title: "Develop", desc: "Website dibangun cepat dengan kualitas production-grade." },
  { num: "04", title: "Launch 🎉", desc: "Website live, kami dampingi hingga Anda puas." },
];

const testimonials = [
  { stars: 5, text: "NusaSite bantu toko online saya jadi jauh lebih profesional. Pesanan naik 3x setelah website baru live!", name: "Rina Kartika", role: "Owner Batik Nusantara", initials: "RK", color: PINK },
  { stars: 5, text: "Responsif, cepat, dan hasilnya melampaui ekspektasi. Tim-nya sabar dan komunikatif.", name: "Budi Santoso", role: "Direktur CV Maju Jaya", initials: "BS", color: "#333" },
  { stars: 5, text: "Proses kerja rapi, tepat waktu, dan harga bersaing. Sudah rekomendasikan ke 5 teman!", name: "Dewi Rahayu", role: "Freelancer & Blogger", initials: "DR", color: "#cc0088" },
];

const pricingPlans = [
  {
    name: "Rintis", label: null, price: "Rp 1,5 jt", period: "bayar sekali · selesai 3 minggu kerja", featured: false,
    features: ["Landing page 1 halaman","Desain custom","Mobile responsive","Form kontak","SSL & domain .com","Hosting 1 tahun"],
  },
  {
    name: "Profesional", label: "Paling Diminati", price: "Rp 3,5 jt", period: "bayar sekali · selesai 1 bulan kerja", featured: true,
    features: ["Company profile 5–8 halaman","Desain premium custom","Blog & artikel","WhatsApp widget","SEO on-page dasar","Google Analytics","Revisi tak terbatas","Support 3 bulan"],
  },
  {
    name: "Toko Online", label: null, price: "Rp 6 jt", period: "bayar sekali · selesai 1 bulan kerja", featured: false,
    features: ["Toko online penuh","Payment gateway QRIS","Manajemen produk mudah","Order & stok otomatis","Dashboard admin","SEO on-page penuh","Support 6 bulan"],
  },
];

export default function NusaSite() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`ns-nav${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="ns-logo">
          <div className="ns-logo-icon">N</div>
          <div className="ns-logo-text">nusa<span>site.</span></div>
        </Link>
        <ul className="ns-nav-links">
          <li><a href="#layanan">Layanan</a></li>
          <li><a href="#proses">Proses</a></li>
          <li><a href="#harga">Harga</a></li>
          <li><a href="#testimoni">Testimoni</a></li>
        </ul>
        <a href="#kontak" className="ns-nav-cta">Konsultasi Gratis →</a>
      </nav>

      {/* HERO */}
      <section className="ns-hero">
        <div className="ns-hero-bg" />
        <div className="ns-hero-dots" />
        <div className="ns-hero-inner">
          <div className="ns-hero-left">
            <div className="ns-pill">
              <span className="ns-pill-dot" />
              Buka & Aktif Menerima Proyek
            </div>
            <h1 className="ns-h1">
              Website yang <span className="hl">menghasilkan</span>,<br />bukan sekadar ada.
            </h1>
            <p className="ns-hero-sub">
              NusaSite merancang dan membangun website profesional mulai dari landing page hingga toko online yang memperkuat brand dan mengubah pengunjung jadi pelanggan.
            </p>
            <div className="ns-hero-btns">
              <a href="#harga" className="btn-main">Lihat Paket Harga →</a>
              <a href="#layanan" className="btn-outline">Layanan Kami</a>
            </div>
            <div className="ns-hero-trust">
              <div className="ns-avatars">
                {["RK","BS","DR","YP"].map((init, i) => (
                  <div key={i} className={`ns-avatar a${i+1}`}>{init}</div>
                ))}
              </div>
              <p className="ns-trust-text">
                <strong>50+ klien</strong> sudah percayakan website mereka ke NusaSite
              </p>
            </div>
          </div>

          <div className="ns-hero-right">
            <div className="ns-floating-badge">Lebih dari 30+ Proyek selesai tepat waktu</div>
            <div className="ns-mock-card">
              <div className="ns-mock-topbar">
                <div className="ns-mock-dot" style={{background:"#ff5f57"}}/>
                <div className="ns-mock-dot" style={{background:"#febc2e"}}/>
                <div className="ns-mock-dot" style={{background:"#28c840"}}/>
                <div className="ns-mock-url">nusasite.id</div>
              </div>
              <div className="ns-mock-hero-area">
                <div className="ns-mock-logo-preview">
                  <div className="ns-mock-logo-icon">N</div>
                  <div className="ns-mock-logo-name">nusa<span>site.</span></div>
                </div>
              </div>
              <div className="ns-mock-lines">
                <div className="ns-mock-line" style={{width:"70%"}}/>
                <div className="ns-mock-line" style={{width:"90%"}}/>
                <div className="ns-mock-line" style={{width:"55%"}}/>
              </div>
              <div className="ns-mock-grid">
                <div className="ns-mock-block pink"/>
                <div className="ns-mock-block"/>
                <div className="ns-mock-block pink"/>
              </div>
            </div>
            <div className="ns-floating-badge2">
              <span>Selesai dalam <strong>3 Minggu</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="ns-stats">
        {[
          { num: "50+", label: "Proyek Selesai" },
          { num: "98%", label: "Klien Puas" },
          { num: "3 Minggu", label: "Rata-rata Delivery" },
          { num: "24/7", label: "Support Aktif" },
        ].map((s, i) => (
          <div key={i} className="ns-stat">
            <span className="ns-stat-num">{s.num}</span>
            <span className="ns-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section className="ns-services" id="layanan">
        <div className="ns-section-tag">✦ Layanan Kami</div>
        <h2 className="ns-section-title">Semua yang dibutuhkan<br />bisnis Anda, tersedia.</h2>
        <p className="ns-section-sub">Dari landing page sederhana hingga aplikasi web kompleks — kami tangani dari desain hingga live.</p>
        <div className="ns-services-grid">
          {services.map((s, i) => (
            <div key={i} className="ns-service-card">
              <div className="ns-service-icon">{s.icon}</div>
              <div className="ns-service-num">{s.num}</div>
              <h3 className="ns-service-name">{s.name}</h3>
              <p className="ns-service-desc">{s.desc}</p>
              <span className="ns-service-price">→ {s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="ns-process" id="proses">
        <div className="ns-section-tag">✦ 4 Cara Kerja</div>
        <h2 className="ns-section-title">Proses simpel,<br />hasil maksimal.</h2>
        <div className="ns-process-steps">
          {steps.map((s, i) => (
            <div key={i} className="ns-step">
              <div className="ns-step-num">{s.num}</div>
              <h3 className="ns-step-title">{s.title}</h3>
              <p className="ns-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="ns-pricing" id="harga">
        <div style={{textAlign:"center"}}>
          <div className="ns-section-tag" style={{display:"inline-flex"}}>✦ Paket Harga</div>
          <h2 className="ns-section-title">Transparan. Tanpa biaya<br />tersembunyi.</h2>
          <p className="ns-section-sub" style={{margin:"0 auto 0"}}>Semua paket sudah termasuk hosting tahun pertama dan domain .com</p>
        </div>
        <div className="ns-pricing-grid">
          {pricingPlans.map((p, i) => (
            <div key={i} className={`ns-price-card${p.featured ? " featured" : ""}`}>
              {p.label && <div className="ns-price-popular">{p.label}</div>}
              {!p.label && <div style={{height:"28px", marginBottom:"0.5rem"}}/>}
              <h3 className="ns-price-name">{p.name}</h3>
              <div className="ns-price-amount">{p.price}</div>
              <p className="ns-price-period">{p.period}</p>
              <ul className="ns-price-list">
                {p.features.map((f, j) => (
                  <li key={j}><span className="ns-check">✓</span>{f}</li>
                ))}
              </ul>
              {p.featured
                ? <a href="#kontak" className="ns-price-btn-main">Pilih Paket Ini</a>
                : <a href="#kontak" className="ns-price-btn-ghost">Pilih Paket Ini</a>
              }
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ns-testi" id="testimoni">
        <div className="ns-section-tag">✦ Testimoni</div>
        <h2 className="ns-section-title">Kata klien kami.</h2>
        <div className="ns-testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="ns-testi-card">
              <div className="ns-stars">{"★".repeat(t.stars)}</div>
              <p className="ns-testi-text">"{t.text}"</p>
              <div className="ns-testi-author">
                <div className="ns-testi-avatar" style={{background: t.color}}>{t.initials}</div>
                <div>
                  <div className="ns-testi-name">{t.name}</div>
                  <div className="ns-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ns-cta" id="kontak">
        <div className="ns-cta-bg" />
        <h2>Siap punya website yang <span>benar-benar</span> bekerja?</h2>
        <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda dan kami siapkan solusi terbaik.</p>
        <div className="ns-cta-btns">
          <a href="https://wa.me/6282323360247?text=Halo%20saya%20ingin%20bertanya" className="btn-wa">Chat via WhatsApp</a>
          <a href="mailto:nzazhemi@gmail.com" className="btn-white">Kirim Email</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ns-footer">
        <div className="ns-footer-top">
          <div className="ns-footer-brand">
            <Link to="/" className="ns-footer-logo">
              <div className="ns-footer-logo-icon">N</div>
              <div className="ns-footer-logo-text">nusa<span>site.</span></div>
            </Link>
            <p className="ns-footer-tagline">Jasa pembuatan website profesional untuk bisnis Indonesia yang ingin tumbuh.</p>
          </div>
          <div className="ns-footer-col">
            <h4>Layanan</h4>
            <ul>
              <li><a href="#layanan">Landing Page</a></li>
              <li><a href="#layanan">Company Profile</a></li>
              <li><a href="#layanan">Toko Online</a></li>
              <li><a href="#layanan">Custom Web App</a></li>
              <li><a href="#layanan">Maintenance</a></li>
            </ul>
          </div>
          <div className="ns-footer-col">
            <h4>Info</h4>
            <ul>
              <li><Link to="/tentang-kami" style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:"0.875rem",transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#FF00A8"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.4)"}>Tentang Kami</Link></li>
              <li><Link to="/portfolio" style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:"0.875rem",transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#FF00A8"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.4)"}>Portfolio</Link></li>
              <li><Link to="/blog" style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:"0.875rem",transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#FF00A8"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.4)"}>Blog</Link></li>
              <li><Link to="/faq" style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:"0.875rem",transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#FF00A8"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.4)"}>FAQ</Link></li>
            </ul>
          </div>
          <div className="ns-footer-col">
            <h4>Kontak</h4>
            <ul>
              <li>
                <a href="https://wa.me/6282323360247?text=Halo%20saya%20ingin%20bertanya">
                    WhatsApp
                </a>
            </li>
              <li><a href="#">Instagram</a></li>
              <li><a href="mailto:nzazhemi@gmail.com">Email</a></li>
              <li><a href="#">Bumiayu, Indonesia</a></li>
            </ul>
          </div>
        </div>
        <div className="ns-footer-bottom">
          <p className="ns-footer-copy">© 2026 <span>NusaSite</span>. All rights reserved.</p>
          <div className="ns-socials">
            <a className="ns-social" href="#">IG</a>
            <a className="ns-social" href="#">WA</a>
            <a className="ns-social" href="#">TW</a>
          </div>
        </div>
      </footer>
    </>
  );
}