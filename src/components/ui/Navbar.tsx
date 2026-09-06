import React, { useState, useEffect, useRef } from 'react';
import { withBase } from '../../lib/site';
import { icons, type IconName } from '../../lib/icons';
import '../../styles/portfolio.css';
const items = [['Proyectos', 'projects'], ['Sobre mí', 'about'], ['Enfoque', 'architecture']];
const NavIcon = ({ name, size = 18 }: { name: IconName; size?: number }) => (
  <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: icons[name] }} />
);
export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    };
    const resize = () => { if (window.innerWidth > 720) setOpen(false); };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [open]);
  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Navegación principal">
        <a className="wordmark" href={withBase('/')} aria-label="Dreamcoder, inicio">
          <span className="brand-seal"><NavIcon name="mark" size={30}/></span>
          dreamcoder<span className="wordmark-dot">.</span>
        </a>
        <div className="desktop-nav">
          {items.map(([label, id]) => <a key={id} href={withBase('/#' + id)}>{label}</a>)}
          <a className="nav-contact" href={withBase('/#connect')}>Hablemos <NavIcon name="arrow" size={16}/></a>
        </div>
        <button ref={toggle} className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          <NavIcon name={open ? 'close' : 'menu'} size={24}/>
        </button>
      </nav>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" hidden={!open}>
        {[...items, ['Hablemos', 'connect']].map(([label, id]) => <a key={id} href={withBase('/#' + id)} onClick={() => setOpen(false)}>{label}<NavIcon name="arrow" size={17}/></a>)}
      </nav>
    </header>
  );
};
