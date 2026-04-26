import Link from "next/link";
import { BRAND } from '../lib/constants';
export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="font-serif text-2xl text-white tracking-widest uppercase mb-6">{BRAND.name}</h2>
          <p className="text-sm text-stone-400 leading-relaxed pr-4">
            Where timeless tradition meets modern sophistication. Crafted for the Indian Woman.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-6">Shop</h3>
          <ul className="space-y-4 text-sm text-stone-400">
            <li><Link href="#" className="hover:text-amber-600 transition-colors">New Arrivals</Link></li>
            <li><Link href="#" className="hover:text-amber-600 transition-colors">Kurtas & Suits</Link></li>
            <li><Link href="#" className="hover:text-amber-600 transition-colors">Sarees</Link></li>
            <li><Link href="#" className="hover:text-amber-600 transition-colors">The Heritage Collection</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="flex flex-col space-y-4 text-sm text-stone-400">
            <Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link>
            <Link href="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link>
            <Link href="/fabric-care" className="hover:text-white transition-colors">Fabric & Care</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>

        {/* Newsletter / Location */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-6">Stay Connected</h3>
          <p className="text-sm text-stone-400 mb-4">
            Join our mailing list for exclusive access to new collections and insider events.
          </p>
          <div className="flex border-b border-stone-700 pb-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent w-full text-sm outline-none text-white placeholder-stone-600"
            />
            <button className="text-xs uppercase tracking-widest font-bold hover:text-amber-600 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 pt-8 border-t border-stone-800/50">
        <p className="text-sm text-stone-500">© {new Date().getFullYear()} {BRAND.name} Heritage. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-stone-300">Instagram</Link>
          <Link href="#" className="hover:text-stone-300">Facebook</Link>
          <Link href="#" className="hover:text-stone-300">Pinterest</Link>
        </div>
      </div>
    </footer>
  );
}