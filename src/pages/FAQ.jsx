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
    content: ''; position: absolute;
    top: -200px; left: -200px; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,168,0.1) 0%, transparent 70%);
  }
  .page-hero::after {
    content: ''; position: absolute;
    bottom: -100px; right: -100px; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,168,0.08) 0%, transparent 70%);
  }
  .page-hero-inner { max-width: 900px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.4); justify-content: center; }
  .breadcrumb a { color: ${PINK}; text-decoration: none; font-weight: 600; }
  .breadcrumb span { color: rgba(255,255,255,0.2); }
  .page-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,0,168,0.15); color: ${PINK}; border: 1px solid rgba(255,0,168,0.3); padding: 5px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }
  .page-h1 { font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 800; color: #fff; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
  .page-h1 span { color: ${PINK}; }
  .page-sub { font-size: 1.05rem; color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 520px; margin: 0 auto; }

  /* FAQ CONTENT */
  .faq-section { padding: 5rem 5%; max-width: 1200px; margin: 0 auto; }
  .faq-layout { display: grid; grid-template-columns: 260px 1fr; gap: 4rem; align-items: start; }

  /* CATEGORY NAV */
  .faq-cats { position: sticky; top: 100px; }
  .faq-cats-title { font-size: 0.75rem; font-weight: 700; color: #bbb; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1rem; }
  .faq-cat-btn { display: block; width: 100%; text-align: left; padding: 0.65rem 1rem; border-radius: 10px; border: none; background: transparent; font-size: 0.875rem; font-weight: 600; color: #888; cursor: pointer; margin-bottom: 4px; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
  .faq-cat-btn:hover { background: ${PINK_BG}; color: ${PINK}; }
  .faq-cat-btn.active { background: ${PINK_BG}; color: ${PINK}; }
  .faq-cat-btn .cat-count { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: rgba(255,0,168,0.15); color: ${PINK}; font-size: 0.65rem; font-weight: 700; float: right; margin-top: 1px; }

  /* FAQ ITEMS */
  .faq-list { display: flex; flex-direction: column; gap: 1rem; }
  .faq-group-label { font-size: 0.75rem; font-weight: 700; color: #bbb; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; margin-top: 1.5rem; }
  .faq-group-label:first-child { margin-top: 0; }
  .faq-item {
    background: #fff; border: 1.5px solid #f0f0f0; border-radius: 16px;
    overflow: hidden; transition: border-color 0.2s;
  }
  .faq-item.open { border-color: ${PINK}; box-shadow: 0 8px 32px rgba(255,0,168,0.08); }
  .faq-question {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
    padding: 1.25rem 1.5rem; cursor: pointer; background: none; border: none;
    width: 100%; text-align: left; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .faq-q-text { font-size: 0.95rem; font-weight: 700; color: ${DARK}; line-height: 1.4; }
  .faq-item.open .faq-q-text { color: ${PINK}; }
  .faq-toggle {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    background: #f5f5f5; display: flex; align-items: center; justify-content: center;
    font-size: 1rem; font-weight: 700; color: #999; transition: all 0.25s;
  }
  .faq-item.open .faq-toggle { background: ${PINK}; color: #fff; transform: rotate(45deg); }
  .faq-answer { padding: 0 1.5rem 1.5rem; }
  .faq-answer p { font-size: 0.9rem; color: #666; line-height: 1.7; }
  .faq-answer a { color: ${PINK}; font-weight: 600; text-decoration: none; }
  .faq-answer a:hover { text-decoration: underline; }

  /* STILL HAVE Q */
  .faq-contact-box {
    background: ${PINK_BG}; border: 1.5px solid rgba(255,0,168,0.2);
    border-radius: 20px; padding: 2.5rem; text-align: center; margin-top: 3rem;
  }
  .faq-contact-box h3 { font-size: 1.25rem; font-weight: 800; color: ${DARK}; margin-bottom: 0.5rem; }
  .faq-contact-box p { font-size: 0.9rem; color: #888; line-height: 1.6; margin-bottom: 1.5rem; }
  .faq-contact-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
  .btn-pink-sm { background: ${PINK}; color: #fff; padding: 0.7rem 1.5rem; border-radius: 50px; font-size: 0.875rem; font-weight: 700; text-decoration: none; box-shadow: 0 6px 20px rgba(255,0,168,0.35); transition: transform 0.2s; }
  .btn-pink-sm:hover { transform: translateY(-2px); }
  .btn-ghost-sm { border: 1.5px solid #e0e0e0; color: ${DARK}; padding: 0.7rem 1.5rem; border-radius: 50px; font-size: 0.875rem; font-weight: 700; text-decoration: none; transition: border-color 0.2s, color 0.2s; }
  .btn-ghost-sm:hover { border-color: ${PINK}; color: ${PINK}; }

  .ns-footer { background: #111; padding: 3rem 5% 1.5rem; margin-top: 5rem; }
  .ns-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); }
  .ns-footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
  .ns-footer-copy span { color: ${PINK}; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${PINK}; }

  @media (max-width: 768px) {
    .ns-nav-links { display: none; }
    .faq-layout { grid-template-columns: 1fr; gap: 2rem; }
    .faq-cats { position: static; display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .faq-cats-title { display: none; }
    .faq-cat-btn { width: auto; padding: 0.5rem 1rem; border: 1.5px solid #e0e0e0; border-radius: 50px; }
    .faq-cat-btn.active { border-color: ${PINK}; }
  }
`;

const faqData = [
  {
    cat: "Umum",
    items: [
      { q: "Apa itu NusaSite dan apa yang ditawarkan?", a: "NusaSite adalah jasa pembuatan website profesional berbasis di Bumiayu, melayani bisnis di seluruh Indonesia. Kami menawarkan layanan mulai dari landing page, company profile, toko online, hingga custom web application." },
      { q: "Apakah bisa konsultasi dulu sebelum order?", a: "Tentu! Konsultasi kami 100% gratis dan tanpa komitmen. Hubungi kami via WhatsApp atau email, ceritakan kebutuhan bisnis Anda, dan kami siap membantu merumuskan solusi terbaik." },
      { q: "Apakah NusaSite melayani klien dari luar Bumiayu?", a: "Ya, kami melayani klien dari seluruh Indonesia secara remote. Semua proses — dari diskusi, desain, revisi, hingga serah terima — bisa dilakukan online via WhatsApp, email, atau video call." },
    ]
  },
  {
    cat: "Harga & Pembayaran",
    items: [
      { q: "Berapa harga pembuatan website di NusaSite?", a: "Harga mulai dari Rp 1,5 juta untuk landing page hingga Rp 6 juta untuk toko online lengkap. Untuk proyek custom, kami berikan estimasi setelah konsultasi. Semua sudah termasuk hosting tahun pertama dan domain .com." },
      { q: "Bagaimana sistem pembayaran yang berlaku?", a: "Kami menerapkan sistem DP 50% di awal sebelum pengerjaan dimulai, dan pelunasan 50% setelah website selesai dan disetujui klien. Kami menerima transfer bank dan QRIS." },
      { q: "Apakah ada biaya tersembunyi setelah website jadi?", a: "Tidak ada. Semua biaya kami komunikasikan di awal sebelum proyek dimulai. Biaya hosting dan domain tahun berikutnya adalah tanggung jawab klien dan sudah kami jelaskan harganya sejak awal." },
      { q: "Apakah bisa cicil atau bayar bertahap?", a: "Untuk proyek di atas Rp 5 juta, kami bisa mendiskusikan skema pembayaran 3 termin. Silakan bicarakan dengan tim kami saat konsultasi." },
    ]
  },
  {
    cat: "Proses & Waktu",
    items: [
      { q: "Berapa lama proses pembuatan website?", a: "Landing page biasanya selesai dalam 1-2 minggu, company profile 3-4 minggu, dan toko online atau custom app 4-6 minggu. Waktu ini bergantung pada kompleksitas dan kecepatan feedback dari klien." },
      { q: "Bagaimana alur proses pengerjaan website?", a: "Prosesnya: (1) Konsultasi & diskusi kebutuhan, (2) Penandatanganan brief & DP, (3) Desain mockup & persetujuan, (4) Pengembangan website, (5) Review & revisi, (6) Serah terima & pelunasan, (7) Website live." },
      { q: "Berapa kali revisi yang diperbolehkan?", a: "Untuk paket Profesional ke atas, revisi tidak terbatas selama masih dalam lingkup proyek yang disepakati. Untuk paket Rintis, tersedia 3x revisi desain dan 2x revisi konten." },
    ]
  },
  {
    cat: "Teknis",
    items: [
      { q: "Teknologi apa yang digunakan untuk membangun website?", a: "Kami menggunakan teknologi modern seperti React.js, Next.js, atau WordPress tergantung kebutuhan. Semua website kami pastikan cepat, aman, dan SEO-friendly." },
      { q: "Apakah website yang dibuat mobile-friendly?", a: "Ya, 100%. Semua website yang kami bangun menggunakan pendekatan mobile-first, artinya tampilannya dioptimalkan untuk smartphone sejak awal sebelum desktop." },
      { q: "Apakah saya bisa update konten website sendiri?", a: "Ya. Kami menyediakan panel admin atau panduan lengkap agar Anda bisa update konten (teks, gambar, produk) sendiri tanpa perlu keahlian coding. Kami juga tersedia untuk pertanyaan susulan." },
      { q: "Apakah termasuk layanan SEO?", a: "Setiap website kami sudah mencakup SEO on-page dasar (meta tag, struktur URL, kecepatan halaman). Untuk paket Profesional ke atas, sudah termasuk riset kata kunci dan optimasi konten." },
    ]
  },
  {
    cat: "Support",
    items: [
      { q: "Apakah ada garansi setelah website selesai?", a: "Ya. Kami memberikan garansi bug gratis selama 30 hari setelah website live. Jika ada masalah teknis yang bukan disebabkan oleh perubahan dari klien, kami perbaiki tanpa biaya tambahan." },
      { q: "Bagaimana jika saya butuh bantuan setelah proyek selesai?", a: "Kami tersedia via WhatsApp untuk pertanyaan umum. Untuk kebutuhan maintenance jangka panjang, kami punya paket bulanan mulai Rp 300.000/bulan yang mencakup update konten dan pemantauan teknis." },
    ]
  },
];

const categories = ["Semua", ...faqData.map(g => g.cat)];

export default function FAQ() {
  const [activecat, setActivecat] = useState("Semua");
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const filtered = activecat === "Semua" ? faqData : faqData.filter(g => g.cat === activecat);
  const totalCounts = Object.fromEntries(faqData.map(g => [g.cat, g.items.length]));

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
          <li><a href="#" className="active">FAQ</a></li>
        </ul>
        <Link to="/#kontak" className="ns-nav-cta">Konsultasi Gratis →</Link>
      </nav>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Beranda</Link>
            <span>/</span>
            <span>FAQ</span>
          </div>
          <div className="page-tag">✦ Pertanyaan Umum</div>
          <h1 className="page-h1">Ada yang ingin Anda<br /><span>ketahui</span>?</h1>
          <p className="page-sub">Kumpulan pertanyaan yang paling sering kami terima — dijawab dengan jelas dan jujur.</p>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-layout">
          {/* SIDEBAR CATS */}
          <div className="faq-cats">
            <div className="faq-cats-title">Kategori</div>
            {categories.map((c, i) => (
              <button key={i} className={`faq-cat-btn${activecat === c ? " active" : ""}`} onClick={() => { setActivecat(c); setOpenIdx(null); }}>
                {c}
                {c !== "Semua" && <span className="cat-count">{totalCounts[c]}</span>}
              </button>
            ))}
          </div>

          {/* FAQ LIST */}
          <div>
            <div className="faq-list">
              {filtered.map((group, gi) => (
                <div key={gi}>
                  {activecat === "Semua" && <div className="faq-group-label">{group.cat}</div>}
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = openIdx === key;
                    return (
                      <div key={key} className={`faq-item${isOpen ? " open" : ""}`}>
                        <button className="faq-question" onClick={() => setOpenIdx(isOpen ? null : key)}>
                          <span className="faq-q-text">{item.q}</span>
                          <span className="faq-toggle">+</span>
                        </button>
                        {isOpen && (
                          <div className="faq-answer">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="faq-contact-box">
              <h3>Masih punya pertanyaan? 🙋</h3>
              <p>Tim kami siap membantu Anda. Hubungi kami langsung dan kami respons dalam 1 jam kerja.</p>
              <div className="faq-contact-btns">
                <a href="https://wa.me/082323360247" className="btn-pink-sm">Chat WhatsApp</a>
                <a href="mailto:nzazhemi@gmail.com" className="btn-ghost-sm">Kirim Email</a>
              </div>
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
            <Link to="/blog">Blog</Link>
            <Link to="/tentang-kami">Tentang</Link>
          </div>
        </div>
      </footer>
    </>
  );
}