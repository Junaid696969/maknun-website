"use client"; // This tells Next.js this component is interactive

import { useCart } from "../context/CartContext";

// We tell the button what information it's receiving
export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <button 
      onClick={handleAdd}
      className="relative z-50 w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-900 transition-colors mt-8"
    >
      Add to Cart
    </button>
  );
}