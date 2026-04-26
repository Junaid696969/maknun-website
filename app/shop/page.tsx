import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image"; 

export const revalidate = 0; 

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const categoryFilter = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

  const query = categoryFilter
    ? `*[_type == "product" && category == $categoryFilter]{
        "id": _id,
        name,
        price,
        category,
        "slug": slug.current,
        images,
        isSoldOut
      }`
    : `*[_type == "product"]{
        "id": _id,
        name,
        price,
        category,
        "slug": slug.current,
        images,
        isSoldOut
      }`;

  const displayedProducts = await client.fetch(query, { categoryFilter: categoryFilter || '' });

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-4">
          {categoryFilter ? categoryFilter : "The Collection"}
        </h1>
        <p className="text-sm text-stone-500 uppercase tracking-widest">
          {displayedProducts.length} {displayedProducts.length === 1 ? 'Piece' : 'Pieces'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {displayedProducts.map((product: any) => (
          
          <Link href={`/product/${product.slug}`} key={product.id} className="group cursor-pointer">
            
            <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 rounded-2xl">
              {/* The Sold Out Badge */}
  {product.isSoldOut && (
    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-red-700 z-10 border border-stone-200 shadow-sm">
      Sold Out
    </div>
  )}
              {product.images && product.images[0] && (
                <Image
                  src={urlFor(product.images[0]).url()}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>

            <div className="text-center space-y-2">
    <h2 className="text-black font-medium uppercase tracking-widest text-sm">
      {product.name}
    </h2>
    <p className="text-stone-500 text-sm">
      ₹{product.price.toLocaleString("en-IN")}
    </p>
  </div>
            
          </Link>
        ))}
      </div>

      {displayedProducts.length === 0 && (
        <div className="text-center text-stone-500 py-20">
          <p>We are currently updating our {categoryFilter} collection. Please check back soon.</p>
        </div>
      )}
    </div>
  );
}