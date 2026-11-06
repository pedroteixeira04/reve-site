import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { eur } from '../data';

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

export default function Checkout() {
  const { lines, total, clear, openCart } = useCart();
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  function submit(e: FormEvent) {
    e.preventDefault();
    const err: Partial<Record<keyof Form, string>> = {};
    if (form.nome.trim().length < 2) err.nome = 'Indique o seu nome.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email inválido.';
    if (form.morada.trim().length < 5) err.morada = 'Indique a morada.';
    if (!/^\d{4}-\d{3}$/.test(form.codigoPostal)) err.codigoPostal = 'Formato 0000-000.';
    if (form.cidade.trim().length < 2) err.cidade = 'Indique a localidade.';
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
          Referência {orderRef}. Vai receber a confirmação por email. (Demonstração: ainda não existe ligação a um
          sistema de pagamento.)
        </p>
        <Link to="/" className="btn">
          Voltar ao início
        </Link>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="page-head">
        <p className="eyebrow">Finalizar encomenda</p>
        <h1>O carrinho está vazio.</h1>
        <Link to="/comprar" className="btn">
          Ver produtos
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Finalizar encomenda</p>
        <h1>Quase lá.</h1>
      </section>
      <div className="checkout">
        <div className="card">
          <ul className="lines ro">
            {lines.map((l) => (
              <li key={l.id}>
                <span>
                  {l.name} <span className="muted">× {l.qty}</span>
                </span>
                <span>{eur(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="total">
            <span>Total</span>
            <span>{eur(total)}</span>
          </p>
          <button type="button" className="link-btn" onClick={openCart}>
            Editar carrinho
          </button>
        </div>

        <form className="card" onSubmit={submit} noValidate>
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
          <button className="btn full" type="submit">
            Confirmar encomenda
          </button>
        </form>
      </div>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <em role="alert">{error}</em>}
    </label>
  );
}
