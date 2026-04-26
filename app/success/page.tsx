import Link from "next/link";

export default function SuccessPage({ searchParams }: { searchParams: { order_id?: string } }) {
  // NEW: Catches the exact receipt number from the URL
  const orderId = searchParams.order_id || "Processing...";

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center bg-stone-50">
      
      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      
      <h1 className="font-serif text-3xl md:text-4xl text-black mb-4 uppercase tracking-widest">
        Order Confirmed
      </h1>
      
      <p className="text-stone-500 max-w-md mb-6 text-sm leading-relaxed">
        Thank you for shopping with Maknun. Your heritage piece is being carefully prepared for dispatch.
      </p>

      {/* NEW: Displays the Order Details Box */}
      <div className="bg-white border border-stone-200 p-6 w-full max-w-sm mb-10 shadow-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 border-b border-stone-100 pb-2">Order Details</h3>
        <p className="text-sm font-mono text-black mb-4">{orderId}</p>
      </div>
      
      <Link href="/">
        <button className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-md">
          Continue Shopping
        </button>
      </Link>
      
    </div>
  );
}