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

  /* PAGE HERO */
  .page-hero {
    padding: 140px 5% 80px;
    background: linear-gradient(135deg, #fff 0%, ${PINK_BG} 100%);
    position: relative; overflow: hidden;
  }
  .page-hero::before {
    content: ''; position: absolute; top: -100px; right: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,168,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .page-hero-inner { max-width: 1200px; margin: 0 auto; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; font-size: 0.8rem; color: #aaa; }
  .breadcrumb a { color: ${PINK}; text-decoration: none; font-weight: 600; }
  .breadcrumb span { color: #ddd; }
  .page-tag { display: inline-flex; align-items: center; gap: 8px; background: ${PINK_BG}; color: ${PINK}; border: 1px solid rgba(255,0,168,0.2); padding: 5px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .page-h1 { font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 800; color: ${DARK}; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
  .page-h1 span { color: ${PINK}; }
  .page-sub { font-size: 1.1rem; color: #666; line-height: 1.7; max-width: 580px; }

  /* ABOUT CONTENT */
  .about-story { padding: 6rem 5%; background: #fff; }
  .about-story-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
  .about-story-text h2 { font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 800; color: ${DARK}; letter-spacing: -0.03em; margin-bottom: 1.25rem; line-height: 1.2; }
  .about-story-text h2 span { color: ${PINK}; }
  .about-story-text p { font-size: 1rem; color: #666; line-height: 1.8; margin-bottom: 1rem; }
  .about-story-visual { position: relative; }
  .about-card-main { background: ${DARK}; border-radius: 24px; padding: 2.5rem; position: relative; overflow: hidden; }
  .about-card-main::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,0,168,0.15); }
  .about-card-year { font-size: 5rem; font-weight: 800; color: ${PINK}; letter-spacing: -0.05em; line-height: 1; margin-bottom: 0.5rem; }
  .about-card-label { font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 500; margin-bottom: 1.5rem; }
  .about-card-desc { font-size: 1rem; color: rgba(255,255,255,0.75); line-height: 1.6; }
  .about-float { position: absolute; bottom: -20px; right: -20px; background: #fff; border-radius: 16px; padding: 1rem 1.25rem; box-shadow: 0 12px 40px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 10px; }
  .about-float-icon { font-size: 1.5rem; }
  .about-float-text strong { display: block; font-size: 0.9rem; font-weight: 800; color: ${DARK}; }
  .about-float-text span { font-size: 0.75rem; color: #aaa; }

  /* VALUES */
  .about-values { padding: 6rem 5%; background: #fafafa; }
  .about-values-inner { max-width: 1200px; margin: 0 auto; }
  .section-tag { display: inline-flex; align-items: center; gap: 8px; background: ${PINK_BG}; color: ${PINK}; padding: 5px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .section-title { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; color: ${DARK}; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 0.75rem; }
  .section-sub { font-size: 1rem; color: #888; line-height: 1.6; margin-bottom: 3rem; }
  .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .value-card { background: #fff; border: 1.5px solid #f0f0f0; border-radius: 20px; padding: 2rem; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s; }
  .value-card:hover { border-color: ${PINK}; transform: translateY(-6px); box-shadow: 0 20px 48px rgba(255,0,168,0.1); }
  .value-icon { font-size: 2rem; margin-bottom: 1rem; }
  .value-name { font-size: 1.1rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.5rem; }
  .value-desc { font-size: 0.875rem; color: #777; line-height: 1.6; }

  /* TEAM */
  .about-team { padding: 6rem 5%; background: #fff; }
  .about-team-inner { max-width: 1200px; margin: 0 auto; }
  .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem; }
  .team-card { background: #fafafa; border: 1.5px solid #f0f0f0; border-radius: 20px; padding: 2rem; text-align: center; transition: border-color 0.25s, transform 0.25s; }
  .team-card:hover { border-color: rgba(255,0,168,0.3); transform: translateY(-4px); }
  .team-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 800; color: #fff; }
  .team-name { font-size: 1.05rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.25rem; }
  .team-role { font-size: 0.8rem; color: ${PINK}; font-weight: 700; margin-bottom: 0.75rem; }
  .team-bio { font-size: 0.85rem; color: #888; line-height: 1.6; }

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

  /* FOOTER */
  .ns-footer { background: #111; padding: 3rem 5% 1.5rem; }
  .ns-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); }
  .ns-footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
  .ns-footer-copy span { color: ${PINK}; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${PINK}; }

  @media (max-width: 992px) {
    .team-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .ns-nav-links { display: none; }
    .about-story-inner { grid-template-columns: 1fr; gap: 3rem; }
    .values-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr; }
    .page-cta { padding: 3rem 1.5rem; }
  }
`;

const values = [
  { name: "Kualitas Tanpa Kompromi", desc: "Setiap baris kode dan piksel desain kami kerjakan dengan standar produksi yang tinggi." },
  { name: "Tepat Waktu, Selalu", desc: "Kami menghargai waktu Anda. Deadline adalah janji, bukan sekadar estimasi." },
  { name: "Transparan & Jujur", desc: "Tidak ada biaya tersembunyi. Kami komunikasikan semua proses secara terbuka." },
  { name: "Fokus pada Hasil", desc: "Website yang kami bangun dirancang untuk menghasilkan, bukan sekadar terlihat bagus." },
  { name: "Mobile-First", desc: "Lebih dari 70% pengunjung datang dari HP — setiap proyek kami optimalkan untuk mobile." },
  { name: "Terus Berkembang", desc: "Kami terus belajar teknologi terbaru agar klien selalu mendapat solusi terdepan." },
];

const team = [
  { initials: "NZ", color: PINK, name: "Nifail Zazhemi, S. Kom.", role: "Founder & Lead Developer", bio: "Full-stack developer dengan pengalaman membangun produk digital untuk bisnis Indonesia." },
  { initials: "AM", color: "#cc0088", name: "Al Pacino Centaury Milano, S. Kom.", role: "Manager Departemen Web Development", bio: "Memimpin tim pengembangan web mulai dari perencanaan teknis hingga proyek siap rilis." },
  { initials: "AN", color: "#333", name: "Azam Nabkhan, S.I.Kom.", role: "Manager Departemen Marketing", bio: "Mengelola strategi pemasaran untuk memperluas jangkauan dan pertumbuhan klien NusaSite." },
  { initials: "AR", color: "#7a1f5c", name: "Arief Rakhman Hakim, S.I.Kom.", role: "Manager Departemen Humas", bio: "Menjaga komunikasi dan hubungan baik dengan klien serta mitra NusaSite." },
];

export default function TentangKami() {
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
          <li><a href="#" className="active">Tentang</a></li>
        </ul>
        <Link to="/#kontak" className="ns-nav-cta">Konsultasi Gratis →</Link>
      </nav>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Beranda</Link>
            <span>/</span>
            <span>Tentang Kami</span>
          </div>
          <div className="page-tag">✦ Tentang NusaSite</div>
          <h1 className="page-h1">Kami membangun website<br />yang <span>benar-benar bekerja</span>.</h1>
          <p className="page-sub">Lahir dari Bumiayu, melayani bisnis Indonesia di seluruh nusantara. Kami bukan sekadar jasa website — kami mitra digital pertumbuhan bisnis Anda.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="about-story-inner">
          <div className="about-story-text">
            <h2>Dari kode ke <span>kepercayaan</span> klien.</h2>
            <p>NusaSite lahir dari frustrasi melihat banyak bisnis lokal yang punya produk luar biasa, tapi kehilangan peluang karena website mereka tidak mewakili kualitas mereka.</p>
            <p>Kami percaya bahwa bisnis sekecil apapun berhak tampil profesional di dunia digital. Mulai dari pedagang batik hingga konsultan korporat — semua layak punya website yang menghasilkan.</p>
            <p>Dengan pengalaman 3+ tahun dan 50+ proyek selesai, kami terus tumbuh bersama klien yang mempercayai kami.</p>
          </div>
          <div className="about-story-visual">
            <div className="about-card-main">
              <div className="about-card-year">2023</div>
              <div className="about-card-label">Tahun berdiri</div>
              <div className="about-card-desc">Dimulai dari satu laptop dan semangat untuk membantu bisnis lokal tumbuh secara digital.</div>
            </div>
            <div className="about-float">
              <div className="about-float-icon">🏆</div>
              <div className="about-float-text">
                <strong>50+ Proyek</strong>
                <span>selesai tepat waktu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="about-values-inner">
          <div className="section-tag">✦ Nilai Kami</div>
          <h2 className="section-title">Prinsip yang menggerakkan<br />setiap proyek.</h2>
          <p className="section-sub">Bukan sekadar kata-kata — ini adalah standar yang kami pegang dalam setiap pekerjaan.</p>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <h3 className="value-name">{v.name}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <div className="about-team-inner">
          <div className="section-tag">✦ Tim Kami</div>
          <h2 className="section-title">Orang-orang di balik<br />setiap proyek.</h2>
          <div className="team-grid">
            {team.map((t, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar" style={{background: t.color}}>{t.initials}</div>
                <h3 className="team-name">{t.name}</h3>
                <div className="team-role">{t.role}</div>
                <p className="team-bio">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <h2>Siap berkolaborasi dengan <span>tim kami</span>?</h2>
        <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis Anda.</p>
        <div className="page-cta-btns">
          <a href="https://wa.me/082323360247" className="btn-pink">Chat via WhatsApp</a>
          <Link to="/portfolio" className="btn-ghost-light">Lihat Portfolio →</Link>
        </div>
      </section>

      <footer className="ns-footer">
        <div className="ns-footer-bottom">
          <p className="ns-footer-copy">© 2026 <span>NusaSite</span>. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/">Beranda</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </>
  );
}