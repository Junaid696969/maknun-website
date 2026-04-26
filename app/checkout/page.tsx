"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; 
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const router = useRouter();

  const [shippingDetails, setShippingDetails] = useState({
    email: "", firstName: "", lastName: "", phone: "", address: "", city: "", pinCode: "",
  });
  
  // NEW: The Traffic Light Lock
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. First, we load the memory
  useEffect(() => {
    const savedDetails = localStorage.getItem('maknun_shipping_memory');
    if (savedDetails) {
      setShippingDetails(JSON.parse(savedDetails));
    }
    // Turn the light green! It is now safe to save.
    setIsLoaded(true); 
  }, []);

  // 2. Only save IF the light is green
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('maknun_shipping_memory', JSON.stringify(shippingDetails));
    }
  }, [shippingDetails, isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const paymentResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderTotal: total, customer: shippingDetails }),
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok) {
        alert("Payment Gateway Failed.");
        return;
      }

const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentResult.amount,
        currency: paymentResult.currency,
        name: "MAKNUN",
        description: "The Heritage Collection",
        order_id: paymentResult.gateway_order_id,
        theme: {
          color: "#000000", 
        },
        prefill: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        handler: async function (response: any) {
          // ... (Keep all your existing success code here exactly as it is!) ...
          console.log("💳 PAYMENT SUCCESSFUL! ID:", response.razorpay_payment_id);
          const orderPayload = {
            orderId: paymentResult.gateway_order_id,
            customer: shippingDetails,
            items: cartItems,
            orderTotal: total,
            paymentId: response.razorpay_payment_id
          };
          const shippingResponse = await fetch('/api/shiprocket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
          });
          if (shippingResponse.ok) {
            clearCart(); 
            router.push(`/success?order_id=${paymentResult.gateway_order_id}`);
          } else {
            alert("Payment captured, but logistics sync failed.");
          }
        },
        // ==========================================
        // NEW: Listen for the user closing the window
        // ==========================================
        modal: {
          ondismiss: function() {
            console.log("Customer closed the payment window.");
            // Send them to our custom failure page!
            router.push('/failed');
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      
      // We tell our code to ignore the fail event and let Razorpay handle the retry UI natively
      rzp.on('payment.failed', function () {
        // Doing nothing here allows Razorpay to show its own "Retry" button inside the popup!
      });
      
      rzp.open();

    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-serif text-2xl text-black mb-6 tracking-widest uppercase">Your Bag is Empty</h1>
        <Link href="/" className="text-xs font-bold tracking-[0.2em] uppercase text-black border-b-2 border-black pb-1 hover:text-stone-500 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        <div className="lg:col-span-7">
          <h2 className="font-serif text-3xl text-black mb-10 uppercase tracking-widest">Checkout</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 border-b border-stone-200 pb-2">Contact Information</h3>
              <input required type="email" name="email" value={shippingDetails.email} onChange={handleInputChange} placeholder="Email Address" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition mb-4" />
              <input required type="tel" name="phone" value={shippingDetails.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition" />
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 border-b border-stone-200 pb-2">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input required type="text" name="firstName" value={shippingDetails.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition" />
                <input required type="text" name="lastName" value={shippingDetails.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition" />
              </div>
              <input required type="text" name="address" value={shippingDetails.address} onChange={handleInputChange} placeholder="Address" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition mb-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" name="city" value={shippingDetails.city} onChange={handleInputChange} placeholder="City" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition" />
                <input required type="text" name="pinCode" value={shippingDetails.pinCode} onChange={handleInputChange} placeholder="PIN Code" className="w-full p-4 text-sm border border-stone-300 bg-white outline-none focus:border-black transition" />
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors mt-8 shadow-md">
              Place Order & Pay
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-stone-50 p-8 border border-stone-200 h-fit">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-4">Order Summary</h3>
          
          <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-20 overflow-hidden flex-shrink-0">
  {/* FIXED: Added unoptimized and object-contain so Sanity images load perfectly here too */}
  <Image src={item.image} alt={item.name} fill sizes="60px" unoptimized className="object-contain object-top" />
</div>
                  <div>
                    <h4 className="text-xs text-black font-medium">{item.name}</h4>
                    <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-stone-200 pt-6 space-y-4">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-500">
              <span>Shipping</span>
              <span className="text-[10px] tracking-widest uppercase">Free</span>
            </div>
            <div className="flex justify-between items-end mt-4 pt-6 border-t border-stone-200">
              <span className="text-black uppercase tracking-widest text-xs font-bold">Total</span>
              {/* FIXED: Removed font-serif, added font-bold, tabular-nums, and tracking-tight */}
              <span className="text-3xl font-bold text-black tabular-nums tracking-tight">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}