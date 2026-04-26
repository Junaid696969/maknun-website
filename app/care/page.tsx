import Link from "next/link";

export default function CarePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 text-center px-6 border-t border-stone-200">
      <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-black mb-6">Fabric & Care</h1>
      <p className="text-stone-500 max-w-lg mb-8 leading-relaxed font-light">
        Our heritage pieces are delicate and crafted by hand. To maintain the integrity of the handwoven fabrics, zari, and embellishments, we highly recommend <strong className="text-black font-medium">Dry Clean Only</strong>. Store in a cool, dry place away from direct sunlight.
      </p>
      <Link href="/shop">
        <button className="border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          Return to Shop
        </button>
      </Link>
    </div>
  );
}