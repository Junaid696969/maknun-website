"use client";
import { BRAND } from "../lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-stone-200 px-6 py-5 flex justify-between items-center bg-white sticky top-0 z-40">
        {/* LEFT: Just the clean 3-line icon */}
        <div className="flex-1 flex items-center">
          <button onClick={() => setIsMenuOpen(true)} className="text-black hover:text-stone-500 transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" /></svg>
          </button>
        </div>

        {/* CENTER: Pure Black Logo */}
        <div className="flex-shrink-0 text-center">
          <Link href="/" className="text-2xl md:text-3xl font-serif text-black tracking-[0.15em] uppercase cursor-pointer">
            {BRAND?.name || "MAKNUN"}
          </Link>
        </div>

        {/* RIGHT: Just the Cart Icon */}
        <div className="flex-1 flex justify-end items-center">
          <div className="relative text-black cursor-pointer group p-1" onClick={() => setIsCartOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            <AnimatePresence mode="popLayout">
              {cartCount > 0 && (
                <motion.span key={cartCount} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* LEFT MENU DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-start">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-[85%] md:w-[400px] bg-stone-50 h-full shadow-2xl flex flex-col">
              <div className="p-8 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <span className="font-serif text-2xl uppercase tracking-[0.15em] text-black">Maknun</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-stone-400 hover:text-black transition text-3xl">&times;</button>
              </div>

              <div className="flex flex-col p-8 gap-8 overflow-y-auto flex-1 bg-stone-50">
                <div>
                  {/* FIXED: The headings are now dark black and have a clear underline! */}
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black mb-6 border-b border-stone-200 pb-2">Shop</h3>
                  <div className="flex flex-col gap-6">
                    <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-black hover:text-stone-500 transition" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
                    <Link href="/shop?category=kurtas" className="text-sm font-bold uppercase tracking-widest text-black hover:text-stone-500 transition" onClick={() => setIsMenuOpen(false)}>Kurtas & Suits</Link>
                    <Link href="/shop?category=sarees" className="text-sm font-bold uppercase tracking-widest text-black hover:text-stone-500 transition" onClick={() => setIsMenuOpen(false)}>Sarees</Link>
                    <Link href="/shop?category=lehengas" className="text-sm font-bold uppercase tracking-widest text-black hover:text-stone-500 transition" onClick={() => setIsMenuOpen(false)}>Lehengas</Link>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-stone-200 my-2"></div>

                <div>
                  {/* FIXED: The headings are now dark black and have a clear underline! */}
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black mb-6 border-b border-stone-200 pb-2">Customer Care</h3>
                  <div className="flex flex-col gap-5">
                    <Link href="/track-order" className="text-xs uppercase tracking-widest text-stone-600 hover:text-black transition" onClick={() => setIsMenuOpen(false)}>Track Order</Link>
                    <Link href="/shipping" className="text-xs uppercase tracking-widest text-stone-600 hover:text-black transition" onClick={() => setIsMenuOpen(false)}>Shipping & Returns</Link>
                    <Link href="/care" className="text-xs uppercase tracking-widest text-stone-600 hover:text-black transition" onClick={() => setIsMenuOpen(false)}>Fabric & Care</Link>
                    <Link href="/contact" className="text-xs uppercase tracking-widest text-stone-600 hover:text-black transition" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                  </div>
                </div>
              </div>

              {/* Social Media Footer inside Menu */}
              <div className="p-8 border-t border-stone-200 bg-stone-100 flex gap-6 items-center justify-center">
                <Link href="#" className="text-stone-500 hover:text-black transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></Link>
                <Link href="#" className="text-stone-500 hover:text-black transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg></Link>
                <Link href="#" className="text-stone-500 hover:text-black transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 001.91 6.55L.053 24l5.63-1.47A11.94 11.94 0 0011.944 24 12 12 0 0024 12 12 12 0 0011.944 0zm0 22A10 10 0 014.28 19.3l-.32-.19-3.58.94.95-3.49-.21-.33A10 10 0 0111.944 2a10 10 0 0110 10 10 10 0 01-10 10zm5.49-7.51c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.24-.6-.48-.52-.68-.53-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"/></svg></Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-[90%] md:w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
              <div className="p-6 md:p-8 border-b border-stone-100 flex justify-between items-center bg-white">
                <h2 className="font-serif text-xl md:text-2xl uppercase tracking-[0.15em] text-black">Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-black transition text-2xl md:text-3xl">&times;</button>
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
                    <div className="relative w-32 h-32 mb-6 drop-shadow-xl hover:-translate-y-2 transition-transform duration-500">
                      <Image src="/empty-bag.jpg" alt="Empty Shopping Bag" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-black mb-3">Your shopping bag is empty!</h3>
                    <p className="text-sm text-stone-600 mb-8 max-w-[250px] leading-relaxed">Shop the latest styles and elevate your wardrobe.</p>
                    <button onClick={() => setIsCartOpen(false)} className="border-2 border-black bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors focus:outline-none">Continue Shopping</button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {cartItems.map((item, i) => (
                      <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4 md:gap-6 pb-6 md:pb-8 border-b border-stone-200">
                        <div className="relative overflow-hidden w-[80px] h-[110px] md:w-[100px] md:h-[130px] flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill sizes="100px" unoptimized className="object-contain object-top" />
                        </div>
                        <div className="flex flex-col justify-between flex-1 py-1">
                          <div>
                            <h3 className="text-xs md:text-sm text-black font-medium mb-1 line-clamp-2">{item.name}</h3>
                            <p className="text-[10px] md:text-[11px] text-stone-500 uppercase tracking-widest mb-2">Standard Fit</p>
                            <p className="text-xs md:text-sm font-semibold text-black">₹{item.price.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="flex items-center gap-4 md:gap-5 mt-4">
                            <div className="flex items-center bg-white border border-stone-300 rounded-sm">
                              <button onClick={() => updateQuantity(item.id, -1)} className="px-2 md:px-3 py-1 text-stone-500 hover:text-black transition font-medium">&minus;</button>
                              <span className="text-[10px] md:text-xs font-medium text-black w-4 md:w-5 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="px-2 md:px-3 py-1 text-stone-500 hover:text-black transition font-medium">&#43;</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-[10px] md:text-[11px] text-stone-500 hover:text-red-800 transition underline underline-offset-4">Remove</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 md:p-8 border-t border-stone-100 bg-stone-50/80">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-sm md:text-lg text-stone-500 font-light">Subtotal</span>
                    <span className="text-xl md:text-2xl font-bold text-black tabular-nums tracking-tight">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                    <button className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-[10px] md:text-sm font-bold hover:bg-stone-800 transition-all duration-500 shadow-md">Proceed to Checkout</button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}