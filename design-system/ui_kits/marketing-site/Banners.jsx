function TransformBanner() {
  return (
    <section className="k-banner">
      <div className="k-banner-rails">
        <div className="k-banner-img left" />
        <div className="k-banner-center">
          <h2>Coloque o seu negócio na nova era da<br /><b>TRANSFORMAÇÃO DIGITAL</b></h2>
          <p>O nosso leque de soluções, poderosas e flexíveis, escalam para responder às necessidades específicas da sua empresa, oferecendo uma valiosa ferramenta para a desmaterialização do seu negócio.</p>
          <button className="k-btn k-btn-outline">Mais informações</button>
        </div>
        <div className="k-banner-img right" />
      </div>
    </section>
  );
}

function DemoCTA({ onClick }) {
  return (
    <section className="k-section" style={{ paddingTop: 20 }}>
      <div className="k-panel">
        <h3>Soluções mais eficientes para o seu negócio. <b>Vamos falar?</b></h3>
        <button className="k-btn k-btn-primary" onClick={onClick}>Agendar uma demo</button>
      </div>
    </section>
  );
}

window.TransformBanner = TransformBanner;
window.DemoCTA = DemoCTA;
