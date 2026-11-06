import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { features, premiumBenefits } from '../data';

const steps = [
  { icon: 'design' as const, title: 'Colocas a venda', text: 'A aplicação abre a tua playlist do Spotify e o som Dolby Atmos envolve-te.' },
  { icon: 'heart' as const, title: 'Mede o ritmo cardíaco', text: 'O sensor percebe quando estás em sono leve, normal ou profundo.' },
  { icon: 'power' as const, title: 'Desliga-se sozinho', text: 'Ao detetar sono profundo, o áudio desliga-se automaticamente.' },
  { icon: 'sleep' as const, title: 'Acorda-te no momento certo', text: 'O despertador acompanha os ciclos de sono para acordares de forma suave.' }
];

const benefits = [
  ['Menos coisas na cama', 'Já não precisas de auriculares, aplicações soltas ou do telemóvel aceso ao lado.'],
  ['Conforto que não aquece', 'Tecido que não aquece e capa lavável, para dormires sem calor nem marcas.'],
  ['Rotina simples', 'Uma só coisa, em vez de várias, para desligares a cabeça ao fim do dia.'],
  ['Acordar com suavidade', 'Sem alarme brusco: o despertar acompanha os teus ciclos de sono.'],
  ['Ambiente à tua medida', 'Calor ou frio com gel packs, aroma de lavanda e som que escolhes.'],
  ['Dados que percebes', 'Relatórios simples sobre o teu descanso, na aplicação.']
];

const faqs = [
  ['O Revê trata insónias?', 'Não. É um produto de bem-estar para te ajudar a relaxar e a perceber o teu sono. Não substitui uma avaliação clínica.'],
  ['O que está incluído na compra?', 'A venda Revê, uma capa lavável, dois gel packs e acesso às funções básicas da aplicação.'],
  ['O que muda com o plano Premium?', 'Acesso à biblioteca completa de meditações e a relatórios de sono detalhados.'],
  ['Preciso do Spotify?', 'Não é obrigatório, mas a ligação permite tocar as tuas playlists ao colocares a venda.'],
  ['Posso experimentar antes de comprar?', 'Sim, no showroom em Guimarães, por marcação.']
];

export default function Features() {
  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Funcionalidades e benefícios</p>
        <h1>Pensado para o teu descanso.</h1>
        <p className="lead narrow">Som, sono e bem-estar reunidos num único dispositivo.</p>
      </section>

      <section className="section">
        <div className="grid3">
          {features.map((f) => (
            <article key={f.title} className="card">
              <Icon name={f.icon} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <p className="eyebrow">Como funciona</p>
        <h2>Uma noite com o Revê.</h2>
        <ol className="timeline">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="num">{i + 1}</span>
              <Icon name={s.icon} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <p className="eyebrow">Benefícios</p>
        <h2>O que ganhas.</h2>
        <div className="grid3">
          {benefits.map(([t, d]) => (
            <article key={t} className="card">
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt split">
        <div>
          <p className="eyebrow">Aplicação</p>
          <h2>A tua noite, na aplicação.</h2>
          <p className="lead">
            Mede o ritmo cardíaco, analisa o sono, oferece meditações guiadas e liga-se ao Spotify. As funções básicas
            estão incluídas; o Premium vai mais longe.
          </p>
          <ul className="ticks">
            {premiumBenefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="phone" aria-hidden="true">
          <p className="tiny">Boa noite</p>
          <p className="big">7h 48m</p>
          <p className="tiny">Sono total</p>
          <div className="bars">
            {[3, 5, 4, 7, 9, 6, 8, 10, 7, 5, 6, 8, 4, 3, 6, 9, 7, 5].map((h, i) => (
              <span key={i} style={{ height: `${h * 7}%` }} />
            ))}
          </div>
          <p className="row">Meditação</p>
          <p className="row">Spotify</p>
          <p className="row">Relatório de sono</p>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2>Antes de decidires.</h2>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section cta">
        <h2>Pronto para reinventar a tua noite?</h2>
        <div className="actions center-actions">
          <Link to="/comprar" className="btn">
            Comprar
          </Link>
          <Link to="/showroom" className="btn ghost">
            Marcar showroom
          </Link>
        </div>
      </section>
    </>
  );
}
