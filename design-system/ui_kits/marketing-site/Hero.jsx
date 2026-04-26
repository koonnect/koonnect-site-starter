/* global React */
function Hero() {
  return (
    <div className="k-hero">
      <div className="k-hero-bg" />
      <div className="k-hero-inner">
        <h1 className="k-hero-title">Diferentes soluções para uma resposta diferenciada e adaptada</h1>
        <div className="k-hero-search">
          <div className="dot" />
          <input placeholder="Como podemos ajudar?" />
        </div>
      </div>
    </div>
  );
}
window.Hero = Hero;
