export const dynamic = 'force-dynamic';
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

// Fetch the 4 newest products from Sanity for the homepage
async function getTrendingProducts() {
  const query = `*[_type == "product"][0...4]{
    "id": _id,
    name,
    price,
    "slug": slug.current,
    images,
    isSoldOut
  }`;
  return await client.fetch(query);
}

export const revalidate = 0; 

export default async function HomePage() {
  // FIXED: Renamed this variable to 'products' so it matches the grid below!
  const products = await getTrendingProducts();

  return (
    <div className="bg-white min-h-screen text-stone-800 selection:bg-rose-200">
      
      {/* 1. HERO SECTION (Bright, Champagne & Ivory Luxury) */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-stone-50">
        
        {/* The warm, bright ivory gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-stone-100"></div>
        
        <div className="relative z-10 text-center text-black px-6 flex flex-col items-center">
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">The New Standard</h2>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider mb-8 drop-shadow-sm text-stone-900">
            HERITAGE
            <br />
            <span className="italic font-light text-stone-600">redefined.</span>
          </h1>
          <Link href="/shop">
            <button className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all duration-300 shadow-xl rounded-sm">
              Explore Collection
            </button>
          </Link>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Crisp, bright, and airy) */}
      <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-black uppercase tracking-widest">Collections</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Link href="/shop?category=sarees" className="group relative h-40 md:h-56 rounded-2xl overflow-hidden flex items-end p-4 md:p-6 cursor-pointer border border-stone-200 bg-white hover:shadow-lg transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100 to-transparent opacity-50"></div>
            <h3 className="relative z-10 text-black font-serif text-xl md:text-2xl uppercase tracking-widest group-hover:pl-2 transition-all duration-300">Sarees</h3>
          </Link>

          <Link href="/shop?category=kurtas" className="group relative h-40 md:h-56 rounded-2xl overflow-hidden flex items-end p-4 md:p-6 cursor-pointer border border-stone-200 bg-white hover:shadow-lg transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100 to-transparent opacity-50"></div>
            <h3 className="relative z-10 text-black font-serif text-xl md:text-2xl uppercase tracking-widest group-hover:pl-2 transition-all duration-300">Kurtas</h3>
          </Link>

          <Link href="/shop?category=lehengas" className="group relative h-40 md:h-56 rounded-2xl overflow-hidden flex items-end p-4 md:p-6 cursor-pointer border border-stone-200 bg-white hover:shadow-lg transition-all duration-500 col-span-2 md:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100 to-transparent opacity-50"></div>
            <h3 className="relative z-10 text-black font-serif text-xl md:text-2xl uppercase tracking-widest group-hover:pl-2 transition-all duration-300">Lehengas</h3>
          </Link>
        </div>
      </section>

      {/* 3. NEW ARRIVALS (Live from Sanity) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-rose-950 uppercase tracking-widest">New Arrivals</h2>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-800 border-b border-rose-800 pb-1 hover:text-rose-500 transition-colors hidden md:block">
            View All
          </Link>
        </div>

        {/* THE BIBA-INSPIRED NEW ARRIVALS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-16 mt-8">
          
          {/* FIXED: Safely mapping over the products array */}
          {(products || []).map((product: any) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group flex flex-col cursor-pointer">
              
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-50 mb-4 rounded-sm border border-stone-100">
                {product.images && product.images[0] && (
                  <Image
                    src={urlFor(product.images[0]).url()}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                
                {/* Bonus: I brought the Sold Out badge here too! */}
                {product.isSoldOut && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-stone-500 border border-stone-200">
                    Sold Out
                  </div>
                )}
              </div>
              
              <div className="text-center mt-auto px-2">
                <h3 className="text-black font-medium uppercase tracking-widest text-[10px] md:text-xs line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-stone-600 text-xs md:text-sm font-medium tabular-nums">
                  ₹{product.price?.toLocaleString("en-IN")}
                </p>
              </div>

            </Link>
          ))}
          
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Link href="/shop">
             <button className="border-2 border-rose-800 text-rose-800 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-rose-800 hover:text-white transition-colors rounded-sm">
               View All
             </button>
           </Link>
        </div>
      </section>

    </div>
  );
}