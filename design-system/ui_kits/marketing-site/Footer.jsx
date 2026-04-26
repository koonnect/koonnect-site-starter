function Footer() {
  return (
    <footer className="k-footer">
      <div className="k-footer-top">
        <div>
          <div className="k-foot-brand">
            <div className="mark" />
            <div>
              <div className="word">KOONNECT</div>
              <div className="tag">Software E-Commerce</div>
            </div>
          </div>
          <button className="k-btn k-btn-grad k-foot-cta">Agendar Demonstração</button>
        </div>
        <div className="k-foot-col">
          <h5>Apoio ao cliente</h5>
          <ul>
            <li><a>Contactos</a></li>
            <li><a>Quem somos</a></li>
            <li><a>Termos de uso e privacidade</a></li>
          </ul>
          <div className="k-foot-contact" style={{ marginTop: 24 }}>
            <b>Telefone</b>(+351) 244 108 310
          </div>
          <div className="k-foot-contact" style={{ marginTop: 10 }}>
            <b>E-mail</b>info@koonnect.com
          </div>
        </div>
        <div className="k-foot-col">
          <h5>Mais informações</h5>
          <ul>
            <li><a>Casos de sucesso</a></li>
            <li><a>Parceiros</a></li>
            <li><a>Preços</a></li>
            <li><a>Quem somos</a></li>
            <li><a>Conteúdos</a></li>
            <li><a>Contactos</a></li>
          </ul>
        </div>
        <div className="k-foot-col">
          <h5>Plataforma</h5>
          <ul>
            <li><a>E-commerce Framework</a></li>
            <li><a>Canais de Venda</a></li>
            <li><a>Marketing & Vendas</a></li>
            <li><a>Inteligência Artificial</a></li>
            <li><a>Operações</a></li>
          </ul>
        </div>
        <div className="k-foot-col">
          <h5>Soluções</h5>
          <ul>
            <li><a>Criação</a></li>
            <li><a>Marketing</a></li>
            <li><a>Otimização</a></li>
            <li><a>Expansão</a></li>
            <li><a>Gestão</a></li>
          </ul>
          <div style={{ marginTop: 20, fontSize: 12, color: 'rgb(199,199,199)' }}>Siga-nos nas redes!</div>
          <div className="k-foot-social">
            <a aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7c0-1 .5-2 2-2h2V1h-3c-3 0-5 2-5 5v4H6v4h3v8h4z"/></svg></a>
            <a aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          </div>
        </div>
      </div>
      <div className="k-foot-bottom">
        <div>© 2025 Todos os direitos reservados — Havidanainternet, Lda (NIPC: 509856446)</div>
        <div>zenn.</div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
