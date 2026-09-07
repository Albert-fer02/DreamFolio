import React, { useState, useEffect, useRef } from 'react';
import { withBase } from '../../lib/site';
import { icons, type IconName } from '../../lib/icons';
import '../../styles/portfolio.css';
const THEME_KEY = 'dreamfolio-theme';
const items = [['Proyectos', 'projects'], ['Sobre mí', 'about'], ['Enfoque', 'architecture']];
const NavIcon = ({ name, size = 18 }: { name: IconName; size?: number }) => (
  <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: icons[name] }} />
);
export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  // Defaults to dark (light === false) to match the SSR-rendered markup; the mount-time
  // effect below reads the real value the no-flash inline script already applied, which
  // may produce a one-frame icon swap and an expected React hydration-mismatch warning
  // (icon glyph only, not FOUC-critical — surface/text colors are unaffected).
  const [isLight, setIsLight] = useState(false);
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
  useEffect(() => {
    setIsLight(document.documentElement.dataset.theme === 'light');
  }, []);
  const toggleTheme = () => {
    const next = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#f3eadc' : '#080909');
    setIsLight(next === 'light');
  };
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
        <div className="nav-controls">
          <button className="theme-toggle" aria-label={isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'} aria-pressed={isLight} onClick={toggleTheme}>
            <NavIcon name={isLight ? 'sun' : 'moon'} size={20}/>
          </button>
          <button ref={toggle} className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            <NavIcon name={open ? 'close' : 'menu'} size={24}/>
          </button>
        </div>
      </nav>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" hidden={!open}>
        {[...items, ['Hablemos', 'connect']].map(([label, id]) => <a key={id} href={withBase('/#' + id)} onClick={() => setOpen(false)}>{label}<NavIcon name="arrow" size={17}/></a>)}
      </nav>
    </header>
  );
};
