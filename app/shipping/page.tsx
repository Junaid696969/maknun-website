import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 text-center px-6 border-t border-stone-200">
      <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-black mb-6">Shipping & Returns</h1>
      <p className="text-stone-500 max-w-lg mb-8 leading-relaxed font-light">
        We offer free standard shipping on all domestic orders. Deliveries typically take 5-7 business days. As our pieces are often made-to-order, returns are only accepted within 7 days of delivery for defective or damaged items.
      </p>
      <Link href="/shop">
        <button className="border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          Return to Shop
        </button>
      </Link>
    </div>
  );
}