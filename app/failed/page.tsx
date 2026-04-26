import Link from "next/link";

export default function FailedPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center bg-stone-50">
      
      {/* Red X Circle */}
      <div className="w-16 h-16 bg-red-800 text-white rounded-full flex items-center justify-center mb-8 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      
      <h1 className="font-serif text-3xl md:text-4xl text-black mb-4 uppercase tracking-widest">
        Payment Failed
      </h1>
      
      <p className="text-stone-500 max-w-md mb-2 text-sm leading-relaxed">
        Your transaction could not be completed. No funds were deducted from your account.
      </p>
      <p className="text-stone-500 max-w-md mb-10 text-sm leading-relaxed">
        Please check your payment details or try a different method.
      </p>
      
      <Link href="/checkout">
        <button className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-md">
          Retry Payment
        </button>
      </Link>
      
    </div>
  );
}