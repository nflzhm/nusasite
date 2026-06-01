import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PINK = "#FF00A8";
const PINK_BG = "#FFF0FA";
const DARK = "#111111";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; color: #111; }

  .ns-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%; height: 72px;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,0,168,0.12);
    box-shadow: 0 4px 32px rgba(255,0,168,0.06);
  }
  .ns-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .ns-logo-icon { width: 40px; height: 40px; background: ${PINK}; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 22px; color: #fff; }
  .ns-logo-text { font-size: 1.3rem; font-weight: 800; color: ${DARK}; letter-spacing: -0.03em; }
  .ns-logo-text span { color: ${PINK}; }
  .ns-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .ns-nav-links a { text-decoration: none; color: #555; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
  .ns-nav-links a:hover, .ns-nav-links a.active { color: ${PINK}; }
  .ns-nav-cta { background: ${PINK}; color: #fff; padding: 0.55rem 1.4rem; border-radius: 50px; font-size: 0.875rem; font-weight: 700; text-decoration: none; box-shadow: 0 4px 16px rgba(255,0,168,0.3); }

  .page-hero {
    padding: 140px 5% 80px;
    background: ${DARK};
    position: relative; overflow: hidden;
  }
  .page-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 80% at 70% 50%, rgba(255,0,168,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .page-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,0,168,0.12) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: radial-gradient(ellipse 100% 100% at 100% 50%, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 100% 100% at 100% 50%, black 0%, transparent 70%);
  }
  .page-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.4); }
  .breadcrumb a { color: ${PINK}; text-decoration: none; font-weight: 600; }
  .breadcrumb span { color: rgba(255,255,255,0.2); }
  .page-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,0,168,0.15); color: ${PINK}; border: 1px solid rgba(255,0,168,0.3); padding: 5px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .page-h1 { font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 800; color: #fff; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
  .page-h1 span { color: ${PINK}; }
  .page-sub { font-size: 1.1rem; color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 560px; }

  /* FILTER TABS */
  .portfolio-section { padding: 5rem 5%; background: #fff; }
  .portfolio-inner { max-width: 1200px; margin: 0 auto; }
  .filter-tabs { display: flex; gap: 0.75rem; margin-bottom: 3rem; flex-wrap: wrap; }
  .filter-tab { padding: 0.5rem 1.25rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1.5px solid #e0e0e0; background: #fff; color: #555; transition: all 0.2s; }
  .filter-tab:hover { border-color: ${PINK}; color: ${PINK}; }
  .filter-tab.active { background: ${PINK}; color: #fff; border-color: ${PINK}; }

  /* PORTFOLIO GRID */
  .portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .portfolio-card {
    border-radius: 20px; overflow: hidden; border: 1.5px solid #f0f0f0;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    cursor: pointer; background: #fff;
  }
  .portfolio-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,0.1); border-color: ${PINK}; }
  .portfolio-card-thumb {
    height: 200px; display: flex; align-items: center; justify-content: center;
    font-size: 3rem; position: relative; overflow: hidden;
  }
  .portfolio-card-thumb::after {
    content: 'Lihat Proyek →'; position: absolute; inset: 0; background: rgba(255,0,168,0.9);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 0.9rem; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    opacity: 0; transition: opacity 0.3s;
  }
  .portfolio-card:hover .portfolio-card-thumb::after { opacity: 1; }
  .portfolio-card-body { padding: 1.5rem; }
  .portfolio-card-cat { font-size: 0.7rem; font-weight: 700; color: ${PINK}; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .portfolio-card-name { font-size: 1.05rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.4rem; }
  .portfolio-card-desc { font-size: 0.8rem; color: #888; line-height: 1.5; margin-bottom: 1rem; }
  .portfolio-card-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .portfolio-tag { background: #f5f5f5; color: #666; padding: 3px 10px; border-radius: 50px; font-size: 0.7rem; font-weight: 600; }

  /* STATS BAR */
  .portfolio-stats { background: ${DARK}; padding: 3.5rem 5%; }
  .portfolio-stats-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .p-stat { text-align: center; padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.08); }
  .p-stat:last-child { border-right: none; }
  .p-stat-num { font-size: 2.5rem; font-weight: 800; color: ${PINK}; display: block; letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.4rem; }
  .p-stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.45); }

  /* CTA */
  .page-cta { margin: 4rem 5%; border-radius: 28px; background: ${DARK}; padding: 4rem 3rem; text-align: center; position: relative; overflow: hidden; }
  .page-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,0,168,0.18) 0%, transparent 70%); pointer-events: none; }
  .page-cta h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 1rem; position: relative; z-index: 1; }
  .page-cta h2 span { color: ${PINK}; }
  .page-cta p { font-size: 1rem; color: rgba(255,255,255,0.55); margin-bottom: 2rem; position: relative; z-index: 1; }
  .page-cta-btns { display: flex; gap: 1rem; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }
  .btn-pink { background: ${PINK}; color: #fff; padding: 0.85rem 2rem; border-radius: 50px; font-size: 0.95rem; font-weight: 700; text-decoration: none; box-shadow: 0 8px 24px rgba(255,0,168,0.4); transition: transform 0.2s; }
  .btn-pink:hover { transform: translateY(-2px); }
  .btn-ghost-light { border: 1.5px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); padding: 0.85rem 2rem; border-radius: 50px; font-size: 0.95rem; font-weight: 700; text-decoration: none; transition: border-color 0.2s, color 0.2s; }
  .btn-ghost-light:hover { border-color: ${PINK}; color: ${PINK}; }

  .ns-footer { background: #111; padding: 3rem 5% 1.5rem; }
  .ns-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); }
  .ns-footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
  .ns-footer-copy span { color: ${PINK}; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${PINK}; }

  @media (max-width: 768px) {
    .ns-nav-links { display: none; }
    .portfolio-grid { grid-template-columns: 1fr; }
    .portfolio-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .page-cta { padding: 3rem 1.5rem; }
  }
`;

const allProjects = [
  { cat: "Landing Page", emoji: "🚀", bg: "linear-gradient(135deg, #FFF0FA, #ffe0f5)", name: "Batik Nusantara", client: "Rina Kartika", desc: "Landing page produk batik dengan integrasi WhatsApp dan galeri produk.", tags: ["React", "WhatsApp API", "SEO"] },
  { cat: "Toko Online", emoji: "🛒", bg: "linear-gradient(135deg, #f0f8ff, #e0efff)", name: "Warung Segar Online", client: "Pak Sutrisno", desc: "E-commerce sayur & buah dengan QRIS, manajemen stok, dan notifikasi otomatis.", tags: ["Next.js", "QRIS", "Admin Dashboard"] },
  { cat: "Company Profile", emoji: "🏢", bg: "linear-gradient(135deg, #f5fff0, #e0ffe8)", name: "CV Maju Jaya", client: "Budi Santoso", desc: "Website resmi perusahaan konstruksi dengan portofolio proyek dan kontak terintegrasi.", tags: ["WordPress", "SEO", "Mobile-first"] },
  { cat: "Custom Web App", emoji: "⚙️", bg: "linear-gradient(135deg, #fffaf0, #fff3e0)", name: "Sistem Booking Klinik", client: "Klinik Sehat Sejahtera", desc: "Sistem reservasi online dengan notifikasi WhatsApp dan dashboard dokter.", tags: ["React", "Node.js", "MySQL"] },
  { cat: "Landing Page", emoji: "🎯", bg: "linear-gradient(135deg, #fff0f8, #ffe8f5)", name: "Event Workshop Kreatif", client: "Studio Kreasi", desc: "Landing page event dengan countdown timer, form pendaftaran, dan payment.", tags: ["React", "Midtrans", "Email Auto"] },
  { cat: "Redesign", emoji: "🎨", bg: "linear-gradient(135deg, #f8f0ff, #f0e8ff)", name: "Toko Elektronik Pratama", client: "Yogi Pratama", desc: "Redesign total dari website lama ke tampilan modern, kecepatan naik 3x.", tags: ["Redesign", "Performance", "Mobile"] },
  { cat: "Company Profile", emoji: "📐", bg: "linear-gradient(135deg, #f0fff8, #e0fff0)", name: "Arsitek Nusantara", client: "Ahmad Fauzi", desc: "Portfolio arsitek profesional dengan galeri proyek 3D dan kalkulasi estimasi.", tags: ["React", "3D Gallery", "PDF Export"] },
  { cat: "Toko Online", emoji: "☕", bg: "linear-gradient(135deg, #fff8f0, #fff0e0)", name: "Kopi Aroma Bumiayu", client: "Siti Aminah", desc: "Toko kopi online dengan sistem membership, poin reward, dan langganan bulanan.", tags: ["E-commerce", "Membership", "QRIS"] },
  { cat: "Custom Web App", emoji: "📊", bg: "linear-gradient(135deg, #f0f4ff, #e8efff)", name: "Dashboard Laporan UMKM", client: "Dinas UMKM", desc: "Portal pelaporan digital untuk UMKM dengan chart analitik dan export Excel.", tags: ["React", "Chart.js", "Excel Export"] },
];

const categories = ["Semua", "Landing Page", "Toko Online", "Company Profile", "Custom Web App", "Redesign"];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const filtered = activeFilter === "Semua"
    ? allProjects
    : allProjects.filter(p => p.cat === activeFilter);

  return (
    <>
      <style>{styles}</style>

      <nav className="ns-nav">
        <Link to="/" className="ns-logo">
          <div className="ns-logo-icon">N</div>
          <div className="ns-logo-text">nusa<span>site.</span></div>
        </Link>
        <ul className="ns-nav-links">
          <li><Link to="/#layanan" style={{textDecoration:"none",color:"#555",fontWeight:500}}>Layanan</Link></li>
          <li><Link to="/#harga" style={{textDecoration:"none",color:"#555",fontWeight:500}}>Harga</Link></li>
          <li><a href="#" className="active">Portfolio</a></li>
          <li><Link to="/tentang-kami" style={{textDecoration:"none",color:"#555",fontWeight:500}}>Tentang</Link></li>
        </ul>
        <Link to="/#kontak" className="ns-nav-cta">Konsultasi Gratis →</Link>
      </nav>

      <section className="page-hero">
        <div className="page-hero-dots" />
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Beranda</Link>
            <span>/</span>
            <span>Portfolio</span>
          </div>
          <div className="page-tag">✦ Karya Kami</div>
          <h1 className="page-h1">50+ Proyek yang<br />sudah <span>kami selesaikan</span>.</h1>
          <p className="page-sub">Dari landing page sederhana hingga sistem web kompleks — setiap proyek adalah bukti komitmen kami terhadap kualitas.</p>
        </div>
      </section>

      {/* STATS */}
      <div className="portfolio-stats">
        <div className="portfolio-stats-inner">
          {[
            { num: "50+", label: "Total Proyek" },
            { num: "5", label: "Kategori Layanan" },
            { num: "98%", label: "Klien Puas" },
            { num: "3 Mgg", label: "Rata-rata Selesai" },
          ].map((s, i) => (
            <div key={i} className="p-stat">
              <span className="p-stat-num">{s.num}</span>
              <span className="p-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section className="portfolio-section">
        <div className="portfolio-inner">
          <div className="filter-tabs">
            {categories.map((c, i) => (
              <button key={i} className={`filter-tab${activeFilter === c ? " active" : ""}`} onClick={() => setActiveFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="portfolio-grid">
            {filtered.map((p, i) => (
              <div key={i} className="portfolio-card">
                <div className="portfolio-card-thumb" style={{background: p.bg}}>
                  <span style={{fontSize:"3rem"}}>{p.emoji}</span>
                </div>
                <div className="portfolio-card-body">
                  <div className="portfolio-card-cat">{p.cat}</div>
                  <h3 className="portfolio-card-name">{p.name}</h3>
                  <p className="portfolio-card-desc">{p.desc}</p>
                  <div className="portfolio-card-tags">
                    {p.tags.map((t, j) => <span key={j} className="portfolio-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <h2>Proyek Anda bisa jadi<br /><span>yang berikutnya</span>.</h2>
        <p>Konsultasikan kebutuhan Anda sekarang, gratis dan tanpa komitmen.</p>
        <div className="page-cta-btns">
          <a href="https://wa.me/082323360247" className="btn-pink">Mulai Proyek Sekarang</a>
          <Link to="/#harga" className="btn-ghost-light">Lihat Paket Harga →</Link>
        </div>
      </section>

      <footer className="ns-footer">
        <div className="ns-footer-bottom">
          <p className="ns-footer-copy">© 2026 <span>NusaSite</span>. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/">Beranda</Link>
            <Link to="/tentang-kami">Tentang</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </>
  );
}