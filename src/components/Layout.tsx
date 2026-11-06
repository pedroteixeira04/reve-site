import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useCart } from "../cart";
import { CartDrawer, CartToast } from "./CartUI";

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export default function Layout() {
  const { count, openCart, closeCart } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    closeCart();
    window.scrollTo(0, 0);
  }, [pathname, closeCart]);

  const links: Array<[string, string]> = [
    ["/", "Início"],
    ["/funcionalidades", "Funcionalidades"],
    ["/comprar", "Comprar"],
    ["/showroom", "Showroom"],
  ];

  return (
    <>
      <header className="nav">
        <Link to="/" className="logo-link" aria-label="revê — início">
          <img
            className="logo-img"
            src="/images/reve_logo.png"
            alt=""
            height={48}
          />
        </Link>
        <nav className={open ? "open" : ""}>
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            aria-label={`Abrir carrinho, ${count} artigos`}
          >
            <CartIcon />
            <span className="cart-label">Carrinho</span>
            <span className="cart-count" key={count}>
              {count}
            </span>
          </button>
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <img
          className="logo-img footer-logo"
          src="/images/reve_logo.png"
          alt="revê"
          height={32}
        />
        <p className="muted">O seu bem-estar, em todos os ciclos.</p>
        <p className="tiny">
          O Revê é um produto de bem-estar e não substitui uma avaliação
          clínica. Showroom em Guimarães, por marcação.
        </p>
        <p className="tiny">REVÊ / SLEEP / RECHARGE / REPEAT</p>
      </footer>
      <CartToast />
      <CartDrawer />
    </>
  );
}
