function SolutionsGrid() {
  const pillars = [
    { t: 'Criação', d: 'Desenvolvemos soluções inovadoras e funcionais para o teu negócio.', i: 'M4 7h16M4 12h10M4 17h16' },
    { t: 'Marketing', d: 'Impulsionamos o teu negócio de forma a maximizar resultados e engagement.', i: 'M3 3v18h18M7 14l4-4 4 4 5-5' },
    { t: 'Otimização', d: 'Melhoramos a visibilidade e conversão para resultados mais eficazes.', i: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' },
    { t: 'Expansão', d: 'Aceleramos o crescimento do teu negócio com integração em plataformas globais.', i: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a14 14 0 010 20M12 2a14 14 0 000 20' },
  ];
  return (
    <section className="k-section">
      <h2 className="k-section-title">A transformação digital do seu <span className="grad">negócio</span></h2>
      <div className="k-pillars">
        {pillars.map(p => (
          <div className="k-pillar" key={p.t}>
            <div className="k-pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={p.i} /></svg>
            </div>
            <h4>{p.t}</h4>
            <p>{p.d}</p>
            <button className="k-btn k-btn-primary" style={{ width: '100%', height: 35, fontSize: 14 }}>Saber mais</button>
          </div>
        ))}
      </div>
    </section>
  );
}
window.SolutionsGrid = SolutionsGrid;
