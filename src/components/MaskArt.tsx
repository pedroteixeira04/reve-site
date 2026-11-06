export default function MaskArt({ className = "" }: { className?: string }) {
  return (
    <img
      className={`product-img ${className}`}
      src="/images/reve_lado.png"
      alt="Venda de olhos Revê em tecido cinzento escuro, com o logótipo revê"
      width={1300}
      height={800}
      loading="eager"
    />
  );
}
