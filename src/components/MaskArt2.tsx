export default function MaskArt2({ className = "" }: { className?: string }) {
  return (
    <img
      className={`product-img ${className}`}
      src="/images/reve_frente.png"
      alt="Venda de olhos Revê em tecido cinzento escuro, com o logótipo revê"
      width={1200}
      height={800}
      loading="eager"
    />
  );
}
