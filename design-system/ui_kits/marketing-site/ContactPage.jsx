/* global React */
function ContactPage({ onBack }) {
  const { useState } = React;
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', msg: '', consent: false });
  const [sent, setSent] = useState(false);
  const F = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });
  return (
    <div style={{ background: '#202020' }}>
      <div style={{ position: 'relative', height: 523, background: 'url(../../assets/hero-bg-dark.jpg) center/cover' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgb(51,51,51), rgba(51,51,51,.4))' }} />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: '180px 40px 0' }}>
          <div style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#FCC000' }}>Agende já a sua demo</div>
          <h1 style={{ fontSize: 44, lineHeight: '55px', color: '#fff', fontWeight: 400, marginTop: 18 }}>Estamos sempre prontos para o ajudar.</h1>
        </div>
      </div>
      <div style={{ maxWidth: 1140, margin: '-200px auto 0', position: 'relative', background: '#202020', borderRadius: 15, boxShadow: '0 0 20px #000', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 592, overflow: 'hidden' }}>
        <div style={{ background: '#333', padding: '50px 52px', display: 'flex', flexDirection: 'column', gap: 26 }}>
          <h3 style={{ fontSize: 24, fontWeight: 500, color: '#fff', margin: 0 }}>Como nos contactar</h3>
          <ContactRow icon="phone" label="Contacto:" value={<>+351 244 108 310<br /><small style={{ color: 'rgb(199,199,199)', fontSize: 12 }}>(Chamada para a rede fixa nacional)</small></>} />
          <ContactRow icon="mail" label="E-mail:" value="info@koonnect.com" />
          <ContactRow icon="map" label="Onde nos encontrar" value="Rua Dr. José Gonçalves, 61 — Piso 0, Loja 5 — 2410-121 Leiria, PORTUGAL" />
          <ContactRow icon="clock" label="Quando o podemos atender:" value={<>2.ª a 6.ª feira<br />9:00 às 13:00 e das 14:00 às 18:00</>} />
        </div>
        <div style={{ padding: '50px 52px' }}>
          <div style={{ fontSize: 16, color: '#fff' }}>Alguma questão adicional, não hesite em contactar-nos.</div>
          <div style={{ fontSize: 14, color: 'rgb(199,199,199)', marginTop: 8, marginBottom: 20 }}>Deixe a sua mensagem e entraremos em contacto o mais breve possível.</div>
          <Field placeholder="Nome*" {...F('name')} />
          <Field placeholder="Introduza o seu email*" {...F('email')} />
          <Field placeholder="Telefone" {...F('phone')} />
          <Field placeholder="Onde trabalha?" {...F('company')} />
          <textarea placeholder="Descreva o seu pedido, dúvida, questão" {...F('msg')} style={{ width: '100%', marginTop: 10, padding: 14, background: '#333', border: 'none', borderRadius: 10, color: '#fff', fontFamily: 'var(--koon-font)', fontSize: 14, minHeight: 60, resize: 'vertical' }} />
          <label style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} style={{ marginTop: 2 }} />
            <small style={{ fontSize: 12, color: 'rgb(199,199,199)', lineHeight: '16px', opacity: .8 }}>Consinto que a Koonnect, trate e utilize os meus dados pessoais fornecidos, de acordo com o descrito nos Termos de privacidade</small>
          </label>
          <button className="k-btn k-btn-primary" style={{ width: '100%', marginTop: 18, height: 36, fontSize: 14, fontWeight: 500 }} onClick={() => setSent(true)}>{sent ? 'Pedido enviado ✓' : 'Enviar pedido'}</button>
        </div>
      </div>
      <div style={{ marginTop: 100, cursor: 'pointer', padding: '30px 140px', fontSize: 14, color: '#0093FC' }} onClick={onBack}>← Voltar</div>
    </div>
  );
}

function Field(props) {
  return <input {...props} style={{ width: '100%', height: 38, padding: '0 16px', background: '#333', border: 'none', borderRadius: 10, color: '#fff', fontFamily: 'var(--koon-font)', fontSize: 14, marginTop: 10, outline: 'none' }} />;
}

function ContactRow({ icon, label, value }) {
  const icons = {
    phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
    mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 7 8-7',
    map: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z',
    clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v5l3 2',
  };
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
      <div style={{ width: 35, height: 35, background: '#0093FC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d={icons[icon]} /></svg>
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>{label}</div>
        <div style={{ fontSize: 14, color: 'rgb(199,199,199)', marginTop: 4, lineHeight: 1.5 }}>{value}</div>
      </div>
    </div>
  );
}

window.ContactPage = ContactPage;
