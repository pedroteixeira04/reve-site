import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { eur, premiumBenefits, products, subscription } from '../data';

type Payment = 'mbway' | 'multibanco' | 'cartao';

interface Form {
  nome: string;
  email: string;
  morada: string;
  codigoPostal: string;
  cidade: string;
  pagamento: Payment;
}

const empty: Form = { nome: '', email: '', morada: '', codigoPostal: '', cidade: '', pagamento: 'mbway' };

export default function Shop() {
  const { lines, total, add, setQty, clear } = useCart();
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const chosen = subscription[plan];

  function submit(e: FormEvent) {
    e.preventDefault();
    const err: Partial<Record<keyof Form, string>> = {};
    if (form.nome.trim().length < 2) err.nome = 'Indica o teu nome.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email inválido.';
    if (form.morada.trim().length < 5) err.morada = 'Indica a morada.';
    if (!/^\d{4}-\d{3}$/.test(form.codigoPostal)) err.codigoPostal = 'Formato 0000-000.';
    if (form.cidade.trim().length < 2) err.cidade = 'Indica a localidade.';
    setErrors(err);
    if (Object.keys(err).length > 0 || lines.length === 0) return;
    // Integrar aqui o serviço de pagamentos (MB WAY, Multibanco, cartão).
    setOrderRef('RV-' + Math.random().toString(36).slice(2, 8).toUpperCase());
    clear();
    setForm(empty);
  }

  if (orderRef) {
    return (
      <section className="page-head">
        <p className="eyebrow">Encomenda registada</p>
        <h1>Obrigado.</h1>
        <p className="lead narrow">
          Referência {orderRef}. Vais receber a confirmação por email. (Demonstração: ainda não existe ligação a um
          sistema de pagamento.)
        </p>
        <Link to="/" className="btn">
          Voltar ao início
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Loja</p>
        <h1>Comprar o Revê.</h1>
        <p className="lead narrow">Envio nacional. Experimenta primeiro no showroom, se preferires.</p>
      </section>

      <div className="shop">
        <div>
          <h2 className="h-sm">Produtos</h2>
          <div className="shop-list">
            {products.map((p) => (
              <article key={p.id} className="card row-card">
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  {p.includes && <p className="tiny">Inclui: {p.includes.join(' · ')}</p>}
                </div>
                <div className="buy">
                  <p className="price small">{eur(p.price)}</p>
                  <button className="btn" onClick={() => add({ id: p.id, name: p.name, price: p.price })}>
                    Adicionar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <h2 className="h-sm">Aplicação Premium</h2>
          <article className="card">
            <div className="toggle" role="group" aria-label="Plano">
              <button className={plan === 'monthly' ? 'on' : ''} onClick={() => setPlan('monthly')}>
                Mensal
              </button>
              <button className={plan === 'yearly' ? 'on' : ''} onClick={() => setPlan('yearly')}>
                Anual
              </button>
            </div>
            <p className="price small">
              {eur(chosen.price)} <span className="muted">{chosen.unit}</span>
            </p>
            <ul className="ticks">
              {premiumBenefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <button className="btn ghost" onClick={() => add({ id: chosen.id, name: chosen.name, price: chosen.price })}>
              Adicionar Premium
            </button>
          </article>
        </div>

        <aside className="summary">
          <h2 className="h-sm">O teu carrinho</h2>
          {lines.length === 0 ? (
            <p className="muted">Ainda não adicionaste nada.</p>
          ) : (
            <ul className="lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <span>{l.name}</span>
                  <span className="qty">
                    <button aria-label={`Menos ${l.name}`} onClick={() => setQty(l.id, l.qty - 1)}>
                      −
                    </button>
                    {l.qty}
                    <button aria-label={`Mais ${l.name}`} onClick={() => setQty(l.id, l.qty + 1)}>
                      +
                    </button>
                  </span>
                  <span>{eur(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="total">
            <span>Total</span>
            <span>{eur(total)}</span>
          </p>

          <form onSubmit={submit} noValidate>
            <Field label="Nome" error={errors.nome}>
              <input value={form.nome} onChange={(e) => set('nome', e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
            </Field>
            <Field label="Morada" error={errors.morada}>
              <input value={form.morada} onChange={(e) => set('morada', e.target.value)} autoComplete="street-address" />
            </Field>
            <div className="two">
              <Field label="Código postal" error={errors.codigoPostal}>
                <input value={form.codigoPostal} onChange={(e) => set('codigoPostal', e.target.value)} placeholder="0000-000" autoComplete="postal-code" />
              </Field>
              <Field label="Localidade" error={errors.cidade}>
                <input value={form.cidade} onChange={(e) => set('cidade', e.target.value)} autoComplete="address-level2" />
              </Field>
            </div>
            <fieldset>
              <legend>Pagamento</legend>
              {(
                [
                  ['mbway', 'MB WAY'],
                  ['multibanco', 'Multibanco'],
                  ['cartao', 'Cartão']
                ] as Array<[Payment, string]>
              ).map(([v, l]) => (
                <label key={v} className="radio">
                  <input type="radio" name="pagamento" checked={form.pagamento === v} onChange={() => set('pagamento', v)} />
                  {l}
                </label>
              ))}
            </fieldset>
            <button className="btn full" type="submit" disabled={lines.length === 0}>
              Finalizar encomenda
            </button>
          </form>
        </aside>
      </div>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <em role="alert">{error}</em>}
    </label>
  );
}
