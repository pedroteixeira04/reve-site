// Converte o tratamento por "tu" para "você" (3.ª pessoa, português europeu).
// Uso, na raiz do projeto:  node tu-para-voce.mjs
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const phrases = [
  // Início
  ['É a tua noite, reinventada.', 'É a sua noite, reinventada.'],
  ['Para adormeceres mais rápido, dormires melhor e', 'Para adormecer mais rápido, dormir melhor e'],
  ['acordares como queres.', 'acordar como quiser.'],
  ['Deixas de adormecer', 'Deixa de adormecer'],
  ['Tudo o que precisas.', 'Tudo o que precisa.'],
  ['Marca uma visita ao showroom em Guimarães e sente o conforto, o som e a temperatura antes de decidires.',
   'Marque uma visita ao showroom em Guimarães e sinta o conforto, o som e a temperatura antes de decidir.'],
  // Dados e funcionalidades
  ['Troca-a e personaliza o', 'Troque-a e personalize o'],
  ['uma qualidade de som que te envolve.', 'uma qualidade de som que o envolve.'],
  ['Ajustas a temperatura', 'Ajusta a temperatura'],
  ['Carregas de dia e esqueces-te dela à noite.', 'Carrega de dia e esquece-se dela à noite.'],
  ['ao colocares a venda', 'ao colocar a venda'],
  ['quando estás em', 'quando está em'],
  // Funcionalidades (página)
  ["title: 'Colocas a venda'", "title: 'Coloca a venda'"],
  ['envolve-te.', 'envolve-o.'],
  ["title: 'Acorda-te no momento certo'", "title: 'Acorda-o no momento certo'"],
  ['para acordares de forma suave', 'para acordar de forma suave'],
  ['Já não precisas de', 'Já não precisa de'],
  ['para dormires sem calor', 'para dormir sem calor'],
  ['para desligares a cabeça', 'para desligar a cabeça'],
  ['som que escolhes.', 'som que escolhe.'],
  ['Dados que percebes', 'Dados que percebe'],
  ['para te ajudar a relaxar', 'para o ajudar a relaxar'],
  ['O que ganhas.', 'O que ganha.'],
  ['Antes de decidires.', 'Antes de decidir.'],
  // Loja, checkout e showroom
  ['Experimenta primeiro no showroom, se preferires.', 'Experimente primeiro no showroom, se preferir.'],
  ['Vais receber a confirmação', 'Vai receber a confirmação'],
  ["'Indica o teu nome.'", "'Indique o seu nome.'"],
  ["'Indica a morada.'", "'Indique a morada.'"],
  ["'Indica a localidade.'", "'Indique a localidade.'"],
  ["'Escolhe uma data", "'Escolha uma data"],
  ["'Escolhe um horário.'", "'Escolha um horário.'"],
  ['Sente o Revê antes de decidires.', 'Sinta o Revê antes de decidir.'],
  ['Experimenta o conforto,', 'Experimente o conforto,'],
  ['<li>Experimenta o Revê', '<li>Experimente o Revê'],
  ['<li>Ouve o som', '<li>Oiça o som'],
  ['<li>Testa os gel packs', '<li>Teste os gel packs']
];

const possessives = [
  [/\bteus\b/g, 'seus'], [/\btuas\b/g, 'suas'], [/\bteu\b/g, 'seu'], [/\btua\b/g, 'sua'],
  [/\bTeus\b/g, 'Seus'], [/\bTuas\b/g, 'Suas'], [/\bTeu\b/g, 'Seu'], [/\bTua\b/g, 'Sua']
];

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(p) ? [p] : [];
  });
}

let total = 0;
for (const file of walk('src')) {
  const before = readFileSync(file, 'utf8');
  let s = before;
  for (const [a, b] of phrases) s = s.split(a).join(b);
  for (const [re, b] of possessives) s = s.replace(re, b);
  if (s !== before) {
    writeFileSync(file, s);
    total++;
    console.log('alterado:', file);
  }
}
console.log(`Concluído: ${total} ficheiro(s) alterado(s).`);
