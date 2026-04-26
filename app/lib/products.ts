// This is the blueprint for what every Maknun product must have
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Saree' | 'Kurta' | 'Lehenga' | 'Suit';
  details: string[]; // For bullet points like "Dry Clean Only"
}

// This is your actual inventory
export const products: Product[] = [
  {
    id: "mak-001",
    name: "Kashni Chaand Chaukor Saree",
    price: 85000,
    category: "Saree",
    image: "/hero.jpg", // Using your hero image for now as a placeholder
    description: "A masterpiece of hand-woven silk, featuring intricate zari work that captures the essence of moonlit elegance.",
    details: ["Pure Mulberry Silk", "Hand-woven in Banaras", "Dry Clean Only", "Includes unstitched blouse piece"]
  },
  {
    id: "mak-002",
    name: "Emerald Vriksha Kurta",
    price: 22500,
    category: "Kurta",
    image: "/hero.jpg",
    description: "Deep emerald tones meeting traditional motifs. A perfect blend of comfort and royal sophistication.",
    details: ["Fine Chanderi Silk", "Hand-embroidered neckline", "Regular fit", "Breathable lining"]
  },
  // We can add 100 more products here easily!
];