import { BRAND } from "../lib/constants";

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 min-h-screen text-center">
      <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-8">Contact Us</h1>
      <p className="text-stone-600 mb-12 text-sm leading-relaxed">
        Our dedicated concierge team is here to assist you with styling advice, sizing inquiries, or any questions regarding your order.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-black">Email</h3>
          <a href={`mailto:${BRAND.supportEmail}`} className="text-stone-600 hover:text-black transition-colors">
            {BRAND.supportEmail}
          </a>
        </div>
        
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-black">Operating Hours</h3>
          <p className="text-stone-600">Monday - Friday<br/>10:00 AM - 6:00 PM (IST)</p>
        </div>

        <div className="pt-8">
          <p className="text-xs text-stone-400 uppercase tracking-widest">
            For press and wholesale inquiries, please contact press@{BRAND.name.toLowerCase()}.com
          </p>
        </div>
      </div>
    </div>
  );
}