// 1. The Rulebook: Every Maknun product MUST have these details
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[]; 
  sizes: string[];
  category: string;
};

// 2. The Vault: Your actual inventory
export const maknunProducts: Product[] = [
  {
    id: "midnight-zari-saree",
    name: "Midnight Zari Silk Saree",
    price: 22500,
    description: "A masterclass in minimal heritage. Handwoven pure dark silk featuring a subtle silver zari border. Designed for evening elegance.",
    images: ["/saree-1.jpg", "/saree-1-zoom.jpg","/saree-3.jpg","/saree-4.jpg"], // We will add real photos later!
    sizes: ["Free Size"],
    category: "Saree",
  },
  {
    id: "ivory-linen-kurta",
    name: "Ivory Handloom Kurta Set",
    price: 14000,
    description: "Raw, breathable luxury. Crafted from 100% organic Indian linen with a structured, modern silhouette. Includes matching trousers.",
    images: ["/kurta-2.jpg", "/kurta-2-zoom.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Kurta",
  },
  {
    id: "emerald-velvet-dupatta",
    name: "Emerald Velvet Dupatta",
    price: 8500,
    description: "Deep emerald velvet adorned with traditional hand-embroidered motifs. The perfect statement piece to elevate a simple outfit.",
    images: ["/dupatta-3.jpg", "/dupatta-3-zoom.jpg"],
    sizes: ["One Size"],
    category: "Accessories",
  }
];