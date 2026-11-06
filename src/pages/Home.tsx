import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import MaskArt from '../components/MaskArt';
import { eur, features, products } from '../data';
import { useCart } from '../cart';

export default function Home() {
  const { add } = useCart();
  const device = products[0];
  const accessories = products.slice(1);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Sono. Som. Bem-estar.</p>
          <h1>
            Mais do que uma venda.
            <br />É a tua noite, reinventada.
          </h1>
          <p className="lead">
            Tecnologia, conforto e bem-estar num só dispositivo. Para adormeceres mais rápido, dormires melhor e
            acordares como queres.
          </p>
          <div className="actions">
            <Link to="/comprar" className="btn">
              Comprar · {eur(device.price)}
            </Link>
            <Link to="/showroom" className="btn ghost">
              Experimentar no showroom
            </Link>
          </div>
        </div>
        <MaskArt className="hero-art" />
      </section>

      <section className="strip" aria-label="Destaques">
        {features.slice(0, 5).map((f) => (
          <div key={f.title} className="strip-item">
            <Icon name={f.icon} />
            <span className="caps">{f.title}</span>
            <span className="caps dim">{f.short}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <p className="eyebrow">Revê / Sleep / Recharge / Repeat</p>
        <h2>Um só objeto, em vez de quatro.</h2>
        <p className="lead narrow">
          Venda de olhos, auscultadores, aplicação de meditação e monitor de sono. Deixas de adormecer com auriculares
          desconfortáveis ou com o telemóvel na mesa de cabeceira.
        </p>
        <div className="grid3">
          {features.map((f) => (
            <article key={f.title} className="card">
              <Icon name={f.icon} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
        <p className="center">
          <Link to="/funcionalidades" className="link">
            Ver todas as funcionalidades e benefícios →
          </Link>
        </p>
      </section>

      <section className="section alt">
        <p className="eyebrow">Produtos</p>
        <h2>Tudo o que precisas. Num só lugar.</h2>
        <div className="product-hero card">
          <MaskArt className="product-art" />
          <div>
            <h3>{device.name}</h3>
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
        </div>
        <div className="grid3">
          {accessories.map((p) => (
            <article key={p.id} className="card">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p className="price small">{eur(p.price)}</p>
              <button className="btn ghost" onClick={() => add({ id: p.id, name: p.name, price: p.price })}>
                Adicionar
              </button>
            </article>
          ))}
        </div>
        <p className="center">
          <Link to="/comprar" className="link">
            Ir para a loja →
          </Link>
        </p>
      </section>

      <section className="section cta">
        <h2>Prefere experimentar primeiro?</h2>
        <p className="lead narrow">
          Marca uma visita ao showroom em Guimarães e sente o conforto, o som e a temperatura antes de decidires.
        </p>
        <Link to="/showroom" className="btn">
          Marcar showroom
        </Link>
      </section>
    </>
  );
}
