import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });
const serif = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata = {
  title: "Maknun | Modern Ethnic Fashion",
  description: "Elevating modern ethnic fashion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${serif.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          
          <main className="min-h-screen">
             {children}
          </main>
          
          <Footer />
        
        </CartProvider>
      </body>
    </html>
  );
}