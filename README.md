# Revê — website

Vite + React + TypeScript + React Router.

    npm install
    npm run dev      # desenvolvimento
    npm run build    # verifica tipos e gera /dist

Páginas: `/` (início), `/funcionalidades`, `/comprar`, `/showroom`.

- Dados de produtos e preços: `src/data.ts`
- Carrinho (estado em memória): `src/cart.tsx`
- Cores e tipografia: variáveis no topo de `src/styles.css`
- Imagens reais: coloca-as em `public/images` e substitui `src/components/MaskArt.tsx`
- Checkout e marcação do showroom são demonstrações (sem backend); ver os comentários "Integrar aqui".
