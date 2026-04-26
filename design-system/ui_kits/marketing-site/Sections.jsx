/* global React */
const { useState } = React;
function Clients() {
  const logos = [
    { src: '../../assets/client-utilinx.png', a: 'Utilinx' },
    { src: '../../assets/client-lissistemas.png', a: 'Lissistemas' },
    { src: '../../assets/client-auchan.png', a: 'Auchan' },
    { src: '../../assets/client-sahoco.png', a: 'Sahoco' },
    { src: '../../assets/client-amtools.png', a: 'Amtools' },
  ];
  return (
    <section className="k-section" style={{ paddingTop: 40 }}>
      <h2 className="k-section-title" style={{ color: '#fff', fontWeight: 400 }}>Casos de <b style={{ fontWeight: 700 }}>sucesso</b></h2>
      <p className="k-section-sub">Conheça em pormenor alguns casos, de empresas, onde as soluções KOONNECT foram implementadas com sucesso.</p>
      <div className="k-clients">
        {logos.map(l => (
          <div className="cell" key={l.a}><img src={l.src} alt={l.a} /></div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#fff', fontWeight: 500, cursor: 'pointer' }}>mais casos de sucesso →</div>
    </section>
  );
}

function News({ selected, onSelect }) {
  const items = [
    { tag: 'NOTÍCIAS', t: 'Vantagens de uma área reservada por comunicação com clientes', d: 'A Internet faz parte do nosso dia a dia e permite-nos agilizar muitas das nossas (…)', img: '../../assets/news-thumb-2.jpg' },
    { tag: 'ARTIGOS', t: 'Como criar uma loja online', d: 'Ter uma loja online poderá ser sinónimo de conquistar novos clientes, aumentar o volume de negócios, expandir para (…)', img: '../../assets/news-thumb-1.jpg' },
    { tag: 'NOTÍCIAS', t: 'Web summit: aqui vamos nós pela segunda vez', d: 'Depois de em 2018 termos estado presente no programa ALPHA, este ano repetimos (…)', img: '../../assets/news-thumb-3.png' },
  ];
  return (
    <section className="k-section" style={{ paddingTop: 40 }}>
      <h2 className="k-section-title" style={{ color: '#0093FC' }}>Notícias e <span className="grad">atualizações</span></h2>
      <div className="k-news-grid">
        {items.map((n, i) => (
          <div className={`k-news ${selected === i ? 'selected' : ''}`} key={i} onClick={() => onSelect(i)}>
            <div className="thumb" style={{ backgroundImage: `url(${n.img})` }} />
            <span className="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
            <span className="chip">{n.tag}</span>
            <h4>{n.t}</h4>
            <p>{n.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Press() {
  const logos = [
    { src: '../../assets/press-002.png', a: 'Press 1' },
    { src: '../../assets/press-beta.png', a: 'Beta-i' },
    { src: '../../assets/press-001.jpg', a: 'Press 2' },
    { src: '../../assets/press-jornal-negocios.jpg', a: 'Jornal de Negócios' },
  ];
  return (
    <section className="k-section" style={{ paddingTop: 40 }}>
      <h2 className="k-section-title" style={{ color: '#fff', fontWeight: 400 }}>Imprensa e <b style={{ fontWeight: 700 }}>reconhecimento</b></h2>
      <p className="k-section-sub">O que dizem de nós e onde já estivemos.</p>
      <div className="k-press">
        {logos.map(l => <div className="cell" key={l.a}><img src={l.src} alt={l.a} /></div>)}
      </div>
    </section>
  );
}

function Newsletter({ onSubscribe }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  return (
    <section className="k-newsletter">
      <h3>Registe-se para receber sempre informações em <span className="grad">primeira mão</span></h3>
      <div className="k-newsletter-form">
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <div className="sep" />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="k-btn-gold" onClick={() => onSubscribe({ name, email, consent })} style={{ border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'var(--koon-font)', padding: '0 26px' }}>Subscrever</button>
      </div>
      <small>
        <div className={`check ${consent ? 'on' : ''}`} onClick={() => setConsent(!consent)} style={{ cursor: 'pointer' }} />
        Consinto que Koonnect trate e utilize os meus dados pessoais fornecidos, para comunicações de marketing e promoções relacionadas com produtos e serviços, de acordo com o descrito nos Termos de uso e privacidade.
      </small>
    </section>
  );
}

window.Clients = Clients;
window.News = News;
window.Press = Press;
window.Newsletter = Newsletter;
