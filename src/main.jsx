import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/caveat/latin-400.css';
import './styles.css';

const benefits = [
  ['home', 'Udoban smeštaj', 'Siguran i prijatan prostor za odmor i igru.'],
  ['paw', 'Pažnja i ljubav', 'Psi su kod nas deo porodice, uz puno pažnje i nege.'],
  ['leaf', 'Priroda i sloboda', 'Veliko dvorište i boravak na svežem vazduhu.'],
  ['heart', 'Iskustvo i poverenje', 'Odgovoran pristup i zadovoljni vlasnici.'],
];
const information = {
  'O nama': 'Kod nas su psi više od gostiju – ovde su deo porodice.',
  Usluge: 'Udoban smeštaj, pažnja i ljubav, priroda i sloboda, iskustvo i poverenje.',
  Galerija: 'Galerija fotografija biće dostupna uskoro.',
  Kontakt: 'Kontakt podaci biće dostupni uskoro.',
  'Rezerviši termin': 'Ovo je privremeno mesto za rezervacije. Sistem rezervacija još nije dostupan i putem ovog prozora nije moguće rezervisati termin.',
};
function Icon({ name, ...props }) {
  const paths = {
    home: <><path d="m3 11 9-8 9 8M6 10v11h12V10M10 21v-7h4v7" /></>,
    heart: <path d="M12 21 3.7 12.7C-2 6.5 6 0 12 6c6-6 14 0.5 8.3 6.7Z" />,
    leaf: <><path d="M4 18C0 6 9 3 21 3c0 12-3 21-14 16M3 22 17 7M8 17l-1-7M12 13l7 1" /></>,
    paw: <><ellipse cx="5" cy="8" rx="2.5" ry="3.5" transform="rotate(-25 5 8)" /><ellipse cx="10" cy="4" rx="2" ry="3" /><ellipse cx="16" cy="5" rx="2" ry="3" /><ellipse cx="21" cy="10" rx="2" ry="3" transform="rotate(25 21 10)" /><path d="M6 18c0-3 4-4 5-7 1-2 3-2 4 0 1 3 5 4 5 7 0 5-5 2-7 2s-7 3-7-2Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6M17 2v6M3 10h18M7 14h2m3 0h2m3 0h1M7 17h2m3 0h2" /></>,
    arrow: <path d="m9 5 7 7-7 7" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  const navRef = useRef(null);
  const menuButton = useRef(null);
  const dialogRef = useRef(null);
  // Only use the owner's approved transparent original at this path.
  // Missing material is deliberately left out; no substitute image is shown.
  const dogAvailable = Object.keys(import.meta.glob('/public/assets/dog.png')).length > 0;
  useEffect(() => {
    const dismiss = (event) => {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      } else if (event.type === 'pointerdown' && !navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, []);
  useEffect(() => {
    if (active && !dialogRef.current.open) dialogRef.current.showModal();
  }, [active]);
  const openDialog = (title) => { setMenuOpen(false); setActive(title); };
  return <main className="homepage">
    {dogAvailable && <img className="dog" src="/assets/dog.png" alt="Pas HOTelDog pansiona sa roze lopticom" />}
    <nav className="navigation" aria-label="Glavna navigacija" ref={navRef}>
      <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'} aria-expanded={menuOpen} aria-controls="navigation-links" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
      {menuOpen && <div id="navigation-links" className="dropdown">
        {['O nama', 'Usluge', 'Galerija', 'Kontakt'].map((title) => <button key={title} onClick={() => openDialog(title)}>{title}</button>)}
      </div>}
    </nav>
    <div className="intro">
      <p className="eyebrow">PANSION ZA PSE<span /></p>
      <h1>Drugi dom<br /><span>za vaše ljubimce</span></h1>
      <p className="description">Kod nas su psi više od gostiju –<br className="desktop-break" /> ovde su deo porodice.</p>
      <button className="reservation" onClick={() => openDialog('Rezerviši termin')}><Icon name="calendar" /><span>Rezerviši termin</span><Icon name="arrow" /></button>
    </div>
    <div className="slogan"><p>Srećni psi,<br />bezbrižni vlasnici.</p><div className="slogan-decoration"><span /><div><Icon name="heart" /><Icon name="paw" /></div></div></div>
    <section className="benefits" aria-label="Prednosti HOTelDog pansiona">
      {benefits.map(([icon, title, description]) => <article key={title}>
        <span className="benefit-icon"><Icon name={icon} /></span>
        <h2>{title}</h2><p>{description}</p>
      </article>)}
    </section>
    <dialog ref={dialogRef} onCancel={() => setActive(null)} onClose={() => setActive(null)} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <div className="dialog-content"><h2 id="dialog-title">{active}</h2><p id="dialog-description">{information[active]}</p><button autoFocus onClick={() => dialogRef.current.close()}>Zatvori</button></div>
    </dialog>
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
