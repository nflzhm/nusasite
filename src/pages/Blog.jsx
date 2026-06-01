import { useEffect } from "react";
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
    background: linear-gradient(135deg, #fff 0%, ${PINK_BG} 100%);
    position: relative; overflow: hidden;
  }
  .page-hero::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 40%; height: 100%;
    background-image: radial-gradient(circle, rgba(255,0,168,0.12) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    mask-image: radial-gradient(ellipse at 80% 50%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at 80% 50%, black 20%, transparent 80%);
  }
  .page-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; font-size: 0.8rem; color: #aaa; }
  .breadcrumb a { color: ${PINK}; text-decoration: none; font-weight: 600; }
  .breadcrumb span { color: #ddd; }
  .page-tag { display: inline-flex; align-items: center; gap: 8px; background: ${PINK_BG}; color: ${PINK}; border: 1px solid rgba(255,0,168,0.2); padding: 5px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .page-h1 { font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 800; color: ${DARK}; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
  .page-h1 span { color: ${PINK}; }
  .page-sub { font-size: 1.1rem; color: #666; line-height: 1.7; max-width: 560px; }

  /* FEATURED POST */
  .blog-section { padding: 5rem 5%; }
  .blog-inner { max-width: 1200px; margin: 0 auto; }
  .featured-post {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
    background: ${DARK}; border-radius: 24px; padding: 3rem; margin-bottom: 4rem;
    position: relative; overflow: hidden;
  }
  .featured-post::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 100% at 100% 50%, rgba(255,0,168,0.12) 0%, transparent 70%);
  }
  .featured-label { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,0,168,0.2); color: ${PINK}; padding: 4px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .featured-title { font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 1rem; letter-spacing: -0.02em; }
  .featured-excerpt { font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 1.5rem; }
  .featured-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .featured-author { display: flex; align-items: center; gap: 8px; }
  .featured-avatar { width: 32px; height: 32px; border-radius: 50%; background: ${PINK}; color: #fff; font-size: 0.7rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
  .featured-author-name { font-size: 0.8rem; color: rgba(255,255,255,0.6); font-weight: 600; }
  .featured-date { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .featured-read-btn { display: inline-flex; align-items: center; gap: 6px; background: ${PINK}; color: #fff; padding: 0.7rem 1.5rem; border-radius: 50px; font-size: 0.875rem; font-weight: 700; text-decoration: none; box-shadow: 0 6px 20px rgba(255,0,168,0.4); transition: transform 0.2s; }
  .featured-read-btn:hover { transform: translateY(-2px); }
  .featured-visual { position: relative; z-index: 1; }
  .featured-card-mock { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; }
  .featured-card-emoji { font-size: 4rem; text-align: center; display: block; margin-bottom: 1rem; }
  .featured-card-bars { display: flex; flex-direction: column; gap: 8px; }
  .featured-bar { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.1); }
  .featured-bar.pink { background: rgba(255,0,168,0.4); }

  /* BLOG GRID */
  .blog-grid-title { font-size: 1.5rem; font-weight: 800; color: ${DARK}; letter-spacing: -0.02em; margin-bottom: 2rem; }
  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .blog-card { background: #fff; border: 1.5px solid #f0f0f0; border-radius: 20px; overflow: hidden; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s; cursor: pointer; }
  .blog-card:hover { border-color: ${PINK}; transform: translateY(-6px); box-shadow: 0 20px 48px rgba(255,0,168,0.1); }
  .blog-card-thumb { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
  .blog-card-body { padding: 1.25rem; }
  .blog-card-cat { font-size: 0.7rem; font-weight: 700; color: ${PINK}; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .blog-card-title { font-size: 1rem; font-weight: 800; color: ${DARK}; line-height: 1.3; margin-bottom: 0.5rem; }
  .blog-card-excerpt { font-size: 0.8rem; color: #888; line-height: 1.5; margin-bottom: 1rem; }
  .blog-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .blog-card-date { font-size: 0.75rem; color: #bbb; }
  .blog-card-read { font-size: 0.75rem; color: ${PINK}; font-weight: 700; }

  /* NEWSLETTER */
  .newsletter-section { margin: 2rem 0; background: ${PINK_BG}; border-radius: 24px; padding: 4rem 3rem; text-align: center; border: 1.5px solid rgba(255,0,168,0.15); }
  .newsletter-section h2 { font-size: 1.8rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
  .newsletter-section p { font-size: 1rem; color: #777; margin-bottom: 2rem; }
  .newsletter-form { display: flex; gap: 0.75rem; max-width: 480px; margin: 0 auto; }
  .newsletter-input { flex: 1; padding: 0.85rem 1.25rem; border: 1.5px solid rgba(255,0,168,0.2); border-radius: 50px; font-size: 0.9rem; font-family: inherit; outline: none; background: #fff; transition: border-color 0.2s; }
  .newsletter-input:focus { border-color: ${PINK}; }
  .newsletter-btn { background: ${PINK}; color: #fff; padding: 0.85rem 1.5rem; border-radius: 50px; font-size: 0.9rem; font-weight: 700; border: none; cursor: pointer; white-space: nowrap; transition: transform 0.2s; box-shadow: 0 6px 20px rgba(255,0,168,0.35); }
  .newsletter-btn:hover { transform: translateY(-2px); }

  .ns-footer { background: #111; padding: 3rem 5% 1.5rem; margin-top: 5rem; }
  .ns-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); }
  .ns-footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
  .ns-footer-copy span { color: ${PINK}; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${PINK}; }

  @media (max-width: 768px) {
    .ns-nav-links { display: none; }
    .featured-post { grid-template-columns: 1fr; gap: 2rem; }
    .featured-visual { display: none; }
    .blog-grid { grid-template-columns: 1fr; }
    .newsletter-form { flex-direction: column; }
  }
`;

const posts = [
  { cat: "Tips & Trik", emoji: "💡", bg: "linear-gradient(135deg, #FFF0FA, #ffe8f5)", title: "7 Kesalahan Fatal Website Bisnis yang Bikin Pengunjung Kabur", excerpt: "Dari loading lambat hingga CTA yang membingungkan — ini kesalahan yang sering kami temui.", date: "15 Mei 2026", read: "5 mnt baca" },
  { cat: "Tutorial", emoji: "🔍", bg: "linear-gradient(135deg, #f0fff8, #e0fff0)", title: "Cara Optimalkan Website untuk Google dengan Budget Minim", excerpt: "SEO tidak harus mahal. Pelajari teknik dasar yang bisa langsung Anda terapkan hari ini.", date: "8 Mei 2026", read: "8 mnt baca" },
  { cat: "Bisnis Digital", emoji: "📈", bg: "linear-gradient(135deg, #fff8f0, #fff0e0)", title: "Kenapa UMKM Wajib Punya Website di Era 2026?", excerpt: "Data terbaru menunjukkan 78% konsumen riset produk online sebelum beli. Apakah bisnis Anda terlihat?", date: "1 Mei 2026", read: "6 mnt baca" },
  { cat: "Desain", emoji: "🎨", bg: "linear-gradient(135deg, #f8f0ff, #f0e8ff)", title: "Tren Desain Web Indonesia 2026: Apa yang Perlu Diketahui", excerpt: "Minimalis, dark mode, dan micro-interaction sedang mendominasi pasar digital Indonesia.", date: "25 Apr 2026", read: "7 mnt baca" },
  { cat: "E-Commerce", emoji: "🛒", bg: "linear-gradient(135deg, #f0f4ff, #e8efff)", title: "QRIS vs Transfer Bank: Mana yang Lebih Baik untuk Toko Online?", excerpt: "Panduan memilih metode pembayaran yang tepat agar checkout rate toko online Anda meningkat.", date: "18 Apr 2026", read: "5 mnt baca" },
  { cat: "Pengalaman", emoji: "🏆", bg: "linear-gradient(135deg, #f5fff0, #e0ffe8)", title: "Bagaimana Website Baru Bantu Penjualan Batik Naik 3x Lipat", excerpt: "Studi kasus nyata: perjalanan Batik Nusantara dari website lama ke omset yang melejit.", date: "10 Apr 2026", read: "10 mnt baca" },
];

export default function Blog() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

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
          <li><Link to="/portfolio" style={{textDecoration:"none",color:"#555",fontWeight:500}}>Portfolio</Link></li>
          <li><a href="#" className="active">Blog</a></li>
        </ul>
        <Link to="/#kontak" className="ns-nav-cta">Konsultasi Gratis →</Link>
      </nav>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Beranda</Link>
            <span>/</span>
            <span>Blog</span>
          </div>
          <div className="page-tag">✦ Tips & Insight</div>
          <h1 className="page-h1">Baca, pelajari, dan<br /><span>tumbuhkan</span> bisnis Anda.</h1>
          <p className="page-sub">Tips SEO, desain web, e-commerce, dan strategi digital untuk bisnis Indonesia — ditulis oleh tim NusaSite.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-inner">

          {/* FEATURED */}
          <div className="featured-post">
            <div style={{position:"relative", zIndex:1}}>
              <div className="featured-label">📌 Artikel Pilihan</div>
              <h2 className="featured-title">Website adalah Investasi, Bukan Pengeluaran: Cara Hitung ROI-nya</h2>
              <p className="featured-excerpt">Banyak pemilik bisnis ragu investasi website karena tidak tahu cara mengukur manfaatnya. Artikel ini membahas cara konkret menghitung return on investment dari website bisnis Anda.</p>
              <div className="featured-meta">
                <div className="featured-author">
                  <div className="featured-avatar">NZ</div>
                  <span className="featured-author-name">Nzazhemi</span>
                </div>
                <span className="featured-date">22 Mei 2026 · 12 mnt baca</span>
              </div>
              <a href="#" className="featured-read-btn">Baca Artikel →</a>
            </div>
            <div className="featured-visual">
              <div className="featured-card-mock">
                <span className="featured-card-emoji">💰</span>
                <div className="featured-card-bars">
                  <div className="featured-bar" style={{width:"90%"}}/>
                  <div className="featured-bar pink" style={{width:"70%"}}/>
                  <div className="featured-bar" style={{width:"85%"}}/>
                  <div className="featured-bar pink" style={{width:"55%"}}/>
                  <div className="featured-bar" style={{width:"75%"}}/>
                </div>
              </div>
            </div>
          </div>

          {/* ARTICLES */}
          <h2 className="blog-grid-title">Artikel Terbaru</h2>
          <div className="blog-grid">
            {posts.map((p, i) => (
              <div key={i} className="blog-card">
                <div className="blog-card-thumb" style={{background: p.bg}}>{p.emoji}</div>
                <div className="blog-card-body">
                  <div className="blog-card-cat">{p.cat}</div>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-date">{p.date}</span>
                    <span className="blog-card-read">{p.read} →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NEWSLETTER */}
          <div className="newsletter-section" style={{marginTop:"4rem"}}>
            <h2>Dapat insight mingguan di inbox Anda.</h2>
            <p>Tips website, SEO, dan bisnis digital — gratis, tanpa spam.</p>
            <div className="newsletter-form">
              <input type="email" className="newsletter-input" placeholder="email@bisnis.com" />
              <button className="newsletter-btn">Subscribe →</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="ns-footer">
        <div className="ns-footer-bottom">
          <p className="ns-footer-copy">© 2026 <span>NusaSite</span>. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/">Beranda</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/tentang-kami">Tentang</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </>
  );
}