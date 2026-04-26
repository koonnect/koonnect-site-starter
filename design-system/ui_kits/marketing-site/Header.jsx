/* global React */
const { useState } = React;

function Header({ onNav }) {
  const [mega, setMega] = useState(null);
  return (
    <>
      <div className="k-header">
        <div className="k-logo" />
        <div className="k-nav">
          <span className="k-nav-item" onClick={() => setMega(mega === 'sol' ? null : 'sol')}>Soluções <span className="caret" /></span>
          <span className="k-nav-item" onClick={() => setMega(mega === 'plat' ? null : 'plat')}>Plataforma <span className="caret" /></span>
          <span className="k-nav-item" onClick={() => onNav('cases')}>Casos de Sucesso</span>
          <span className="k-nav-item" onClick={() => onNav('partners')}>Parceiros</span>
          <span className="k-nav-item" onClick={() => onNav('pricing')}>Preços</span>
          <span className="k-nav-item" onClick={() => onNav('blog')}>Blog</span>
        </div>
        <div className="k-nav-cta">
          <div className="k-nav-pt"><span className="flag" />PT <span className="caret" style={{ background: 'rgb(199,199,199)' }} /></div>
          <button className="k-btn-demo" onClick={() => onNav('contact')}>Agendar Demo</button>
        </div>
      </div>
      {mega && <MegaMenu onClose={() => setMega(null)} />}
    </>
  );
}

function MegaMenu({ onClose }) {
  const pillars = [
    { title: 'Criação', color: '#0093FC', sub: 'Desenvolvimento de Loja Online · Design UX/UI · Catálogo Digital (PIM) · Aplicação Mobile' },
    { title: 'Marketing', color: '#0093FC', sub: 'Campanhas Performance · Social Commerce · Loyalty Programs' },
    { title: 'Otimização', color: '#0093FC', sub: 'SEO · SEM · PPC · Personalização · CRO' },
    { title: 'Expansão', color: '#0093FC', sub: 'Internacionalização · Marketplaces · Plataforma B2B' },
  ];
  return (
    <div className="k-mega open" onMouseLeave={onClose}>
      {pillars.map((p, i) => (
        <div className="k-mega-col" key={i}>
          <div className="k-mega-card">
            <div className="k-mega-title" style={{ color: p.color }}>
              {p.title}
              <span className="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
            </div>
            <div className="k-mega-sub">{p.sub}</div>
          </div>
        </div>
      ))}
      <div className="k-mega-col">
        <div className="k-mega-img">
          <div style={{ fontSize: 18, fontWeight: 500, color: '#FCC000', lineHeight: '20px' }}>Soluções diferenciadas de comércio digital</div>
          <div style={{ fontSize: 14, color: 'rgb(199,199,199)', marginTop: 12 }}>Plataformas digitais de comércio electrónico, B2C e B2B.</div>
        </div>
      </div>
    </div>
  );
}

window.Header = Header;
