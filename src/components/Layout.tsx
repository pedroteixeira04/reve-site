import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useCart } from '../cart';

export default function Layout() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const links: Array<[string, string]> = [
    ['/', 'Início'],
    ['/funcionalidades', 'Funcionalidades'],
    ['/comprar', 'Comprar'],
    ['/showroom', 'Showroom']
  ];

  return (
    <>
      <header className="nav">
        <Link to="/" className="logo" aria-label="revê — início">
          revê
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
        <nav className={open ? 'open' : ''}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
          <Link to="/comprar" className="cart-pill">
            Carrinho · {count}
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="logo small">revê</div>
        <p className="muted">O teu bem-estar, em todos os ciclos.</p>
        <p className="tiny">
          O Revê é um produto de bem-estar e não substitui uma avaliação clínica. Showroom em Guimarães, por marcação.
        </p>
        <p className="tiny">REVÊ / SLEEP / RECHARGE / REPEAT</p>
      </footer>
    </>
  );
}
