"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; 
import { useCart } from "../../context/CartContext"; 
import { client } from "@/sanity/lib/client";;

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string; 
  
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter(); 
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
const [restockAlertSent, setRestockAlertSent] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState("110001, Delhi");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState("S");
  const [mainImage, setMainImage] = useState("");
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      // FIXED: I added the "description," request right here for you!
      const query = `*[_type == "product" && slug.current == $slug][0]{
        "id": _id,
        name,
        price,
        category,
        description,
        isSoldOut, 
        "images": images[].asset->url
      }`;
      const data = await client.fetch(query, { slug });
      
      if (data) {
        setProduct(data);
        setMainImage(data.images[0]); 
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const handleMobileScroll = () => {
    if (!mobileSliderRef.current) return;
    const { scrollLeft, clientWidth } = mobileSliderRef.current;
    setCurrentSlide(Math.round(scrollLeft / clientWidth));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ id: product.id, name: product.name, price: product.price, image: mainImage, });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({ id: product.id, name: product.name, price: product.price, image: mainImage, });
    setIsCartOpen(false);
    router.push('/checkout');
  };
  const handleRestockAlert = async () => {
    const userEmail = window.prompt("Where should we send the restock alert? (Enter your email)");
    
    if (!userEmail) return; 
    
    try {
      await fetch('/api/restock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          productName: product.name,
          productId: product.id
        })
      });
      
      setRestockAlertSent(true);
      setTimeout(() => setRestockAlertSent(false), 4000); 
    } catch (error) {
      console.error("Failed to set alert:", error);
    }
  };

  const openImageModal = () => {
    if (!product) return;
    setModalImageIndex(product.images.indexOf(mainImage));
    setIsImageModalOpen(true);
  };
  
  const nextImage = () => setModalImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setModalImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  const handleShare = async () => {
    const shareData = {
      title: "Maknun | Premium Collection",
      text: "Check out this exquisite piece from Maknun.",
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log(err); }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!"); 
      } catch (err) { console.log(err); }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-serif uppercase tracking-widest text-stone-500">Loading Collection...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-serif text-2xl text-black mb-4 uppercase tracking-widest">Item Not Found</h1>
        <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-1 focus:outline-none">Return to Shop</Link>
      </div>
    );
  }

  const originalPrice = product.price + 6500;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
  const disabledSizes = ['3XL', '4XL'];

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-16 selection:bg-stone-200 text-stone-800">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { -webkit-tap-highlight-color: transparent; outline: none !important; }
        
        .disabled-size {
          position: relative;
          color: #a8a29e;
          pointer-events: none;
        }
        .disabled-size::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top right, transparent calc(50% - 1px), #d6d3d1, transparent calc(50% + 1px));
        }
      `}</style>

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8">
          <button onClick={() => setIsImageModalOpen(false)} className="absolute top-4 right-6 text-white text-4xl font-light hover:text-stone-300 z-50 focus:outline-none">&times;</button>
          
          <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center">
            <button onClick={prevImage} className="absolute left-0 md:-left-12 text-white p-2 focus:outline-none hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            
            <img src={product.images[modalImageIndex]} alt="Zoomed View" className="max-w-full max-h-full object-contain select-none" />
            
            <button onClick={nextImage} className="absolute right-0 md:-right-12 text-white p-2 focus:outline-none hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          <div className="flex gap-3 mt-6 overflow-x-auto max-w-full py-2 hide-scrollbar">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setModalImageIndex(idx)} 
                className={`w-16 h-24 flex-shrink-0 border-2 transition-all focus:outline-none ${modalImageIndex === idx ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 max-w-sm w-full relative rounded-md shadow-2xl">
            <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 text-2xl text-stone-400 hover:text-black">&times;</button>
            <h2 className="text-lg font-bold text-black mb-4 border-b border-stone-200 pb-2">Size Chart</h2>
            <div className="space-y-3 text-sm text-stone-600">
              <div className="flex justify-between border-b border-stone-100 pb-2"><span>Bust</span><span className="font-medium text-black">32" - 34"</span></div>
              <div className="flex justify-between border-b border-stone-100 pb-2"><span>Waist</span><span className="font-medium text-black">26" - 28"</span></div>
              <div className="flex justify-between border-b border-stone-100 pb-2"><span>Hip</span><span className="font-medium text-black">36" - 38"</span></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto md:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start pt-4 md:pt-8">
        
        {/* LEFT SIDE: GALLERY */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <div className="hidden md:flex gap-4 h-[80vh]">
            <div className="w-20 flex flex-col gap-3 overflow-y-auto hide-scrollbar pr-1">
              {product.images.map((img: string, index: number) => (
                <button 
                  key={index} 
                  onMouseEnter={() => setMainImage(img)}
                  className={`relative aspect-[3/4] w-full flex-shrink-0 bg-stone-50 border transition-all rounded-md overflow-hidden focus:outline-none ${
                    mainImage === img ? 'border-black' : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
            
            <div 
              onClick={openImageModal}
              className="flex-1 bg-stone-50 rounded-md relative flex items-center justify-center p-2 border border-stone-100 cursor-zoom-in group"
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-contain object-top" />
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
              </div>
            </div>
          </div>

          {/* Mobile Edge-to-Edge Slider */}
          <div className="md:hidden w-full relative -mt-4">
            <div 
              ref={mobileSliderRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
            >
              {product.images.map((img: string, index: number) => (
                <div 
                  key={index} 
                  onClick={() => { setModalImageIndex(index); setIsImageModalOpen(true); }}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  className="flex-shrink-0 w-full h-[75vh] snap-start relative bg-transparent cursor-zoom-in outline-none focus:outline-none select-none"
                >
                  <img src={img} alt={`${product.name} - View ${index + 1}`} className="w-full h-full object-contain pointer-events-none select-none outline-none" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
              {product.images.map((_: any, index: number) => (
                <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-5 bg-white shadow-sm' : 'w-1.5 bg-white/50 backdrop-blur-sm'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PRODUCT DETAILS */}
        <div className="lg:col-span-5 flex flex-col px-4 md:px-0 pt-6 lg:pt-0">
          
          <h1 className="text-xl md:text-2xl font-bold text-black leading-tight">Maknun</h1>
          <p className="text-sm md:text-base text-stone-500 mt-1 mb-3">{product.name}</p>
          
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-black">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-base text-stone-400 line-through mb-0.5">MRP: ₹{originalPrice.toLocaleString('en-IN')}</span>
            <span className="text-sm font-bold text-emerald-600 mb-0.5">{discountPercent}% Off</span>
          </div>
          <p className="text-xs text-stone-400 mb-4">Inclusive of all taxes</p>

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-600 text-white text-xs font-bold px-1.5 py-1 rounded flex items-center gap-1 shadow-sm">
              4.8 <svg className="w-3 h-3 fill-white" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
            <span className="text-sm text-stone-800"><span className="font-bold">463</span> Ratings & <span className="font-bold">63</span> Reviews</span>
          </div>

          <div className="w-full h-px bg-stone-200 mb-6"></div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-bold text-black">Select Size</span>
              <button onClick={() => setIsSizeGuideOpen(true)} className="text-sm font-bold text-[#d50057] hover:underline focus:outline-none">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {allSizes.map((size) => {
                const isDisabled = disabledSizes.includes(size);
                return (
                  <button 
                    key={size}
                    disabled={isDisabled}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[52px] h-[52px] flex items-center justify-center text-sm rounded-md border focus:outline-none ${
                      isDisabled 
                        ? 'disabled-size border-stone-200 bg-stone-50' 
                        : selectedSize === size 
                          ? 'border-black font-bold text-black bg-stone-100' 
                          : 'border-stone-300 text-stone-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-3 mb-6">
            <button 
              onClick={handleShare}
              className="w-[52px] h-[52px] flex flex-shrink-0 items-center justify-center border-2 border-stone-200 rounded-md text-stone-600 hover:border-stone-400 transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>

            {/* THE SOLD OUT LOCK */}
            {product.isSoldOut ? (
              <div className="flex-1 flex gap-3">
                <button disabled className="w-full bg-stone-100 text-stone-400 border-2 border-stone-200 py-3 text-xs font-bold uppercase tracking-widest rounded-md cursor-not-allowed shadow-inner">
                  Out of Stock
                </button>
                <button 
                  onClick={handleRestockAlert}
                  className={`w-[52px] h-[52px] flex flex-shrink-0 items-center justify-center border-2 rounded-md transition-colors shadow-sm focus:outline-none ${
                    restockAlertSent 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-600' 
                      : 'border-black bg-white text-black hover:bg-stone-100'
                  }`}
                  title="Notify me when restocked"
                >
                  {restockAlertSent ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                  )}
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-black border-2 border-black py-3 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-stone-50 transition-colors shadow-sm focus:outline-none"
                >
                  Add to Bag
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-black text-white border-2 border-black py-3 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-stone-800 transition-colors shadow-md focus:outline-none"
                >
                  Buy Now
                </button>
              </>
            )}
          </div>

          <div className="w-full h-px bg-stone-200 mb-6 hidden md:block"></div>

          {/* Ship To & Delivery Features */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-black mb-3">Ship To</h3>
            <div className="border border-stone-300 rounded-md p-3 flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-stone-800">{pincode}</span>
              <button className="text-sm font-bold text-[#d50057] focus:outline-none">Change Pincode</button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                <span className="text-sm text-stone-700">Delivery by <span className="font-bold text-black">25th Apr</span></span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                <span className="text-sm text-stone-700 font-bold">Cash on Delivery | <span className="text-emerald-700 font-medium">Available</span></span>
              </div>
            </div>
            <div className="border border-stone-200 rounded-md p-3 flex justify-between items-center bg-stone-50 cursor-pointer hover:bg-stone-100 transition-colors">
              <span className="text-sm font-bold text-stone-800">Sold By Maknun Heritage India Pvt Ltd</span>
              <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>

          <div className="w-full h-px bg-stone-200 mb-6"></div>

          {/* MYNTRA-STYLE PRODUCT DETAILS BOX */}
          <div className="border border-stone-200 rounded-2xl p-6 mt-4">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Fabric</h4>
                <p className="text-sm text-stone-600">Premium Heritage Blend</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Pattern</h4>
                <p className="text-sm text-stone-600">Handwoven / Embellished</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Fit</h4>
                <p className="text-sm text-stone-600">Standard Fit</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black mb-1">Occasion</h4>
                <p className="text-sm text-stone-600">Festive & Evening</p>
              </div>
            </div>

            <div className="w-full h-px bg-stone-200 mb-6"></div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-black mb-3">Product Details</h3>
              <ul className="list-disc pl-5 text-sm text-stone-600 space-y-2">
                {/* FIXED: The live Sanity description is placed right here! */}
                <li>{product.description}</li>
                <li>Crafted by traditional artisans in India</li>
                <li>Designed for the contemporary ethnic wardrobe</li>
                <li>100% authentic Maknun heritage piece</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-black mb-2">Size & Fit</h3>
              <p className="text-sm text-stone-600">The model (height 5'8") is wearing a size S</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-black mb-2">Material & Care</h3>
              <p className="text-sm text-stone-600">Dry Clean Only<br/>Store in a cool, dry place to maintain zari integrity.</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 px-3 py-3 flex gap-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button onClick={handleShare} className="w-11 h-11 flex flex-shrink-0 items-center justify-center border border-stone-300 rounded text-stone-600 hover:bg-stone-50 focus:outline-none">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </button>

        {/* THE MOBILE SOLD OUT LOCK */}
        {product.isSoldOut ? (
          <div className="flex-1 flex gap-2">
            <button disabled className="w-full bg-stone-100 text-stone-400 border border-stone-200 text-[11px] font-bold uppercase tracking-widest rounded shadow-inner cursor-not-allowed">
              Out of Stock
            </button>
            <button 
              onClick={handleRestockAlert}
              className={`w-11 h-11 flex flex-shrink-0 items-center justify-center border rounded transition-colors focus:outline-none ${
                restockAlertSent 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600' 
                  : 'border-black bg-white text-black hover:bg-stone-100'
              }`}
            >
              {restockAlertSent ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
              )}
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleAddToCart} className="flex-1 bg-white text-black border border-black text-[11px] font-bold uppercase tracking-widest rounded shadow-sm focus:outline-none">
              Add to Bag
            </button>
            <button onClick={handleBuyNow} className="flex-1 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded shadow-md focus:outline-none">
              Buy Now
            </button>
          </>
        )}
      </div>

    </div>
  );
}