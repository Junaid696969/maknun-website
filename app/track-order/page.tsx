import Link from "next/link";

export default function TrackOrderPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 text-center px-6 border-t border-stone-200">
      <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-black mb-6">Track Your Order</h1>
      <p className="text-stone-500 max-w-md mb-8 font-light">
        Enter your Maknun Order ID and email address to receive real-time updates on your shipment.
      </p>
      
      <form className="w-full max-w-sm space-y-4 mb-8">
        <input type="text" placeholder="Order ID (e.g. MK-12345)" className="w-full border border-stone-300 p-4 text-sm outline-none focus:border-black transition" />
        <input type="email" placeholder="Email Address" className="w-full border border-stone-300 p-4 text-sm outline-none focus:border-black transition" />
        <button type="button" className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition">
          Track Now
        </button>
      </form>

      <Link href="/shop" className="text-xs uppercase tracking-widest text-stone-500 hover:text-black transition border-b border-transparent hover:border-black pb-1">
        Back to Shopping
      </Link>
    </div>
  );
}