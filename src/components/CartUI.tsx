import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart";
import { eur } from "../data";

export function CartToast() {
  const { toast, dismissToast, openCart } = useCart();
  return (
    <div className="toast-wrap" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.key}>
          <span className="toast-dot" aria-hidden="true" />
          <span className="toast-text">{toast.text}</span>
          <button
            type="button"
            onClick={() => {
              dismissToast();
              openCart();
            }}
          >
            Ver carrinho
          </button>
        </div>
      )}
    </div>
  );
}

export function CartDrawer() {
  const { drawerOpen, closeCart, lines, total, setQty } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeCart]);

  return (
    <>
      <div
        className={`overlay${drawerOpen ? " show" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`drawer${drawerOpen ? " open" : ""}`}
        aria-label="Carrinho"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-head">
          <h2 className="h-sm">O seu carrinho</h2>
          <button
            type="button"
            className="close"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="muted">Ainda não adicionou nada.</p>
            <Link to="/comprar" className="btn ghost" onClick={closeCart}>
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <ul className="lines drawer-lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <span>{l.name}</span>
                  <span className="qty">
                    <button
                      type="button"
                      aria-label={`Menos ${l.name}`}
                      onClick={() => setQty(l.id, l.qty - 1)}
                    >
                      −
                    </button>
                    {l.qty}
                    <button
                      type="button"
                      aria-label={`Mais ${l.name}`}
                      onClick={() => setQty(l.id, l.qty + 1)}
                    >
                      +
                    </button>
                  </span>
                  <span>{eur(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <p className="total">
                <span>Total</span>
                <span>{eur(total)}</span>
              </p>
              <Link to="/checkout" className="btn full" onClick={closeCart}>
                Finalizar encomenda
              </Link>
              <button
                type="button"
                className="btn ghost full"
                onClick={closeCart}
              >
                Continuar a comprar
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
