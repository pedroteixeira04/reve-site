import { useState } from 'react';
import ProductImage from '../components/ProductImage';
import { useCart } from '../cart';
import { eur, premiumBenefits, products, subscription } from '../data';

export default function Shop() {
  const { add } = useCart();
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const device = products[0];
  const accessories = products.slice(1);
  const chosen = subscription[plan];

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Loja</p>
        <h1>Comprar o Revê.</h1>
        <p className="lead narrow">Envio nacional. Experimente primeiro no showroom, se preferir.</p>
      </section>

      <section className="shop-wide">
        <article className="card device-card">
          <ProductImage id={device.id} name={device.name} />
          <div className="body">
            <h2>{device.name}</h2>
            <p>{device.description}</p>
            <ul className="ticks">
              {device.includes?.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="price">{eur(device.price)}</p>
            <button className="btn" onClick={() => add({ id: device.id, name: device.name, price: device.price })}>
              Adicionar ao carrinho
            </button>
          </div>
        </article>

        <h2 className="h-sm">Acessórios e recargas</h2>
        <div className="grid3 product-grid">
          {accessories.map((p) => (
            <article key={p.id} className="card pcard">
              <ProductImage id={p.id} name={p.name} />
              <div className="body">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="buy">
                  <span className="price small">{eur(p.price)}</span>
                  <button className="btn ghost" onClick={() => add({ id: p.id, name: p.name, price: p.price })}>
                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <h2 className="h-sm">Aplicação Premium</h2>
        <article className="card device-card">
          <ProductImage id="premium" name="Aplicação Revê Premium" />
          <div className="body">
            <div className="toggle" role="group" aria-label="Plano">
              <button type="button" className={plan === 'monthly' ? 'on' : ''} onClick={() => setPlan('monthly')}>
                Mensal
              </button>
              <button type="button" className={plan === 'yearly' ? 'on' : ''} onClick={() => setPlan('yearly')}>
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
          </div>
        </article>
      </section>
    </>
  );
}
