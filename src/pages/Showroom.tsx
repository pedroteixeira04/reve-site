import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

const SLOTS = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const iso = (d: Date) => {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

interface Booking {
  nome: string;
  email: string;
  telefone: string;
  pessoas: number;
  data: string;
  hora: string;
  notas: string;
}

export default function Showroom() {
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return iso(d);
  }, []);

  const [b, setB] = useState<Booking>({ nome: '', email: '', telefone: '', pessoas: 1, data: '', hora: '', notas: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Booking | null>(null);

  const set = <K extends keyof Booking>(k: K, v: Booking[K]) => setB((x) => ({ ...x, [k]: v }));

  const isSunday = b.data !== '' && new Date(b.data + 'T12:00:00').getDay() === 0;

  function submit(e: FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (b.nome.trim().length < 2) err.nome = 'Indica o teu nome.';
    if (!/^\S+@\S+\.\S+$/.test(b.email)) err.email = 'Email inválido.';
    if (b.telefone && !/^\+?[\d\s]{9,15}$/.test(b.telefone)) err.telefone = 'Telefone inválido.';
    if (!b.data || b.data < minDate) err.data = 'Escolhe uma data a partir de amanhã.';
    else if (isSunday) err.data = 'O showroom não abre ao domingo.';
    if (!b.hora) err.hora = 'Escolhe um horário.';
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    // Enviar a marcação para o backend / serviço de email aqui.
    setDone(b);
  }

  if (done) {
    return (
      <section className="page-head">
        <p className="eyebrow">Marcação registada</p>
        <h1>Até breve, {done.nome.split(' ')[0]}.</h1>
        <p className="lead narrow">
          {new Date(done.data + 'T12:00:00').toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}{' '}
          às {done.hora}, para {done.pessoas} {done.pessoas === 1 ? 'pessoa' : 'pessoas'}. Enviaremos a confirmação para{' '}
          {done.email}. (Demonstração: ainda não existe envio real.)
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
        <p className="eyebrow">Showroom · Guimarães</p>
        <h1>Sente o Revê antes de decidires.</h1>
        <p className="lead narrow">
          Experimenta o conforto, o som Dolby Atmos e o controlo de temperatura. A visita é feita por marcação.
        </p>
      </section>

      <div className="shop">
        <form className="card booking" onSubmit={submit} noValidate>
          <div className="two">
            <label className="field">
              <span>Nome</span>
              <input value={b.nome} onChange={(e) => set('nome', e.target.value)} autoComplete="name" />
              {errors.nome && <em role="alert">{errors.nome}</em>}
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={b.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
              {errors.email && <em role="alert">{errors.email}</em>}
            </label>
          </div>
          <div className="two">
            <label className="field">
              <span>Telefone (opcional)</span>
              <input value={b.telefone} onChange={(e) => set('telefone', e.target.value)} autoComplete="tel" />
              {errors.telefone && <em role="alert">{errors.telefone}</em>}
            </label>
            <label className="field">
              <span>Pessoas</span>
              <select value={b.pessoas} onChange={(e) => set('pessoas', Number(e.target.value))}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="field">
            <span>Data</span>
            <input type="date" min={minDate} value={b.data} onChange={(e) => set('data', e.target.value)} />
            {errors.data && <em role="alert">{errors.data}</em>}
          </label>
          <fieldset>
            <legend>Horário</legend>
            <div className="slots">
              {SLOTS.map((s) => (
                <button type="button" key={s} className={b.hora === s ? 'on' : ''} onClick={() => set('hora', s)}>
                  {s}
                </button>
              ))}
            </div>
            {errors.hora && <em className="err" role="alert">{errors.hora}</em>}
          </fieldset>
          <label className="field">
            <span>Notas (opcional)</span>
            <textarea rows={3} value={b.notas} onChange={(e) => set('notas', e.target.value)} />
          </label>
          <button className="btn full" type="submit">
            Confirmar marcação
          </button>
        </form>

        <aside className="summary">
          <h2 className="h-sm">Visita ao showroom</h2>
          <ul className="ticks">
            <li>Experimenta o Revê e as diferentes capas</li>
            <li>Ouve o som Dolby Atmos</li>
            <li>Testa os gel packs e o aroma de lavanda</li>
            <li>Vê a aplicação em ação</li>
          </ul>
          <p className="tiny">Guimarães · Morada e horários a confirmar. A marcação é obrigatória.</p>
        </aside>
      </div>
    </>
  );
}
