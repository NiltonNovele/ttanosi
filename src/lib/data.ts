export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "mens" | "womens" | "trending" | "accessories" | "looks";
  images: string[];
  sizes: string[];
  isNewArrival?: boolean;
  badge?: string;
}

export const mockProducts: Product[] = [
  // MENS (6 items)
  {
    id: "p_01",
    name: "TRIBAL ARCHIVE HOODIE",
    description: "Oversized 450gsm heavyweight cotton featuring a custom acid wash finish and dropped shoulders for an architectural drape. The ultimate street staple.",
    price: 3999,
    category: "mens",
    sizes: ["S", "M", "L", "XL"],
    isNewArrival: true,
    images: ["/tshirt/landing/black1.png"],
  },
  {
    id: "p_02",
    name: "SINCERE SWEET SHIRT",
    description: "Technical nylon cargo pants with adjustable bungee cords at the hem, articulated knees, and multiple 3D patch pockets. Water-resistant finish.",
    price: 2499,
    category: "mens",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://i.pinimg.com/736x/47/52/f1/4752f124971e392c9cd5eb5ee79c8961.jpg"],
  },
  {
    id: "p_11",
    name: "Dragon & Letter Graphic Tee",
    description: "450gsm heavyweight cotton hoodie with a vintage wash. Double-lined hood and drop-shoulder boxy fit.",
    price: 1499,
    category: "mens",
    sizes: ["M", "L", "XL", "XXL"],
    images: ["https://i.pinimg.com/736x/39/61/a4/3961a47f8c4ed9032b7cb509f577551f.jpg"],
  },
  {
    id: "p_12",
    name: "Unisex Anime Printed Casual Oversized Hoodie",
    description: "Vintage-inspired denim jacket with heavy distressing and custom gunmetal hardware. Slightly oversized.",
    price: 1699,
    category: "mens",
    sizes: ["S", "M", "L", "XL"],
    isNewArrival: true,
    images: ["https://i.pinimg.com/736x/c9/73/8a/c9738ae44d4460db176c728736421b96.jpg "],
  },
  {
    id: "p_13",
    name: "Baggy pants",
    description: "Multi-pocket tactical vest with mesh paneling and adjustable webbing straps. Perfect for layering.",
    price: 1999,
    category: "mens",
    sizes: ["M", "L"],
    images: ["https://i.pinimg.com/736x/67/8f/e4/678fe4ef8c81d7b8ff7a0d9425453de5.jpg"],
  },
  {
    id: "p_14",
    name: "Baggy Skate Jeans",
    description: "Ultra-wide leg denim jeans with contrast stitching and a lowered crotch inspired by 90s skate culture.",
    price: 3899,
    category: "mens",
    sizes: ["30", "32", "34", "36"],
    images: ["https://i.pinimg.com/736x/a4/c0/01/a4c001cf8d9d3913f7aced0f53a6901e.jpg"],
  },
  {
    id: "p_15",
    name: "Attack on titan Jeans",
    description: "Ultra-wide leg denim jeans with contrast stitching and a lowered crotch inspired by 90s skate culture.",
    price: 2899,
    category: "mens",
    sizes: ["30", "32", "34", "36"],
    images: ["https://i.pinimg.com/736x/e0/8f/e1/e08fe18183579ac3222643b7ebcdbcd0.jpg"],
  },
  {
    id: "p_16",
    name: "Baggy Dragon Jeans",
    description: "Ultra-wide leg denim jeans with contrast stitching and a lowered crotch inspired by 90s skate culture.",
    price: 3899,
    category: "mens",
    sizes: ["30", "32", "34", "36"],
    images: ["https://i.pinimg.com/736x/cc/cb/a1/cccba105e788a9c555f39f8608d011e8.jpg"],
  },

  // WOMENS (6 items)
  {
    id: "p_w03",
    name: "FIGURE WIDE-LEG DENIM",
    description: "High-contrast architectural jeans with a distinctly wide-leg silhouette. Reimagined street proportions for the modern urban landscape.",
    price: 4999,
    category: "womens",
    sizes: ["XS", "S", "M", "L"],
    isNewArrival: true,
    images: ["/images/landing/vivisu-toglasu.jpg"],
  },
  {
    id: "p_w04",
    name: "Grey/Red Plaid Faded Wash Distressed Holes Vintage Punk Wide-leg Jeans",
    description: "Lightweight, voluminous parachute pants with a low-rise elasticated waist and drawcord toggles. The ultimate Y2K revival piece.",
    price: 4999,
    category: "womens",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://i.pinimg.com/736x/18/6e/bb/186ebb379ba79f4c2f62694290eccedc.jpg"],
  },
  {
    id: "p_w15",
    name: "Black Jeans",
    description: "Form-fitting ribbed knit top with an asymmetrical neckline and exposed overlock stitching.",
    price: 2499,
    category: "womens",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://i.pinimg.com/736x/93/e1/03/93e103685146dd67858644b327e8bc6f.jpg"],
  },
  {
    id: "p_w16",
    name: "Floral Embroidered Washed Wide Leg Jeans",
    description: "Cropped faux leather moto jacket with exaggerated lapels, metallic zip detailing, and a vintage wash.",
    price: 5499,
    category: "womens",
    sizes: ["S", "M", "L"],
    isNewArrival: true,
    images: ["https://i.pinimg.com/736x/b0/5c/30/b05c303a8fe472a8c5677a16fef68836.jpg"],
  },
  {
    id: "p_w17",
    name: "Women's Fitted Patchwork T-Shirt",
    description: "Micro-mini cargo skirt in durable twill with dual side pockets and a distressed raw hem.",
    price: 2299,
    category: "womens",
    sizes: ["XS", "S", "M"],
    images: ["https://i.pinimg.com/736x/eb/36/7b/eb367b20aae60eaa80e313df4b62efd2.jpg"],
  },
  {
    id: "p_w18",
    name: "Motorcycle Style Long Sleeve Shirt Tops",
    description: "Women's Trendy Comfortable Motorcycle Style Long Sleeve Shirt Tops",
    price: 1899,
    category: "womens",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://i.pinimg.com/736x/d6/9a/c6/d69ac699a17672a480e2c980faeb4be7.jpg"],
  },
  {
    id: "p_w19",
    name: "Spiderman Inspired Oversized Zipper Hoodie ",
    description: "Women's Trendy Comfortable Motorcycle Style Long Sleeve Shirt Tops",
    price: 1899,
    category: "womens",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://i.pinimg.com/736x/d8/97/af/d897af4896f14ec5feffe5854550103b.jpg"],
  },
  {
    id: "p_w20",
    name: "Oversized V-Neck T-Shirt",
    description: "Women's Trendy Comfortable Motorcycle Style Long Sleeve Shirt Tops",
    price: 1899,
    category: "womens",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://i.pinimg.com/736x/d1/65/90/d1659041caca277c5c0e3c977a3e47a4.jpg"],
  },

  // TRENDING (6 items)
  {
    id: "p_05",
    name: "Graphic tracksuit",
    description: "Ultra-heavyweight 400gsm brushed fleece hoodie. Features high-density puff print graphics that glow under UV light.",
    price: 3999,
    category: "trending",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNewArrival: true,
    images: ["https://i.pinimg.com/736x/e5/69/b0/e569b0302a6e67386b52023d00a8d6a3.jpg"],
  },
  {
    id: "p_08",
    name: "Drawstring Wide bottom Jeans",
    description: "Open-knit distressed sweater with dropped shoulders and elongated sleeves. Perfect for layering over graphic tees.",
    price: 3299,
    category: "trending",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://i.pinimg.com/736x/00/10/5a/00105a4c07b0577f8e7f0d43b7fa86b7.jpg"],
  },
  {
    id: "p_19",
    name: "MOTOR RACING BOMBER",
    description: "Vintage-style racing bomber featuring custom embroidered patches and a boxy, retro-futuristic fit. A high-speed street essential.",
    price: 6499,
    category: "trending",
    sizes: ["M", "L", "XL"],
    isNewArrival: true,
    images: ["/images/landing/motor-jacket.jpg"],
  },
  {
    id: "p_20",
    name: "Y2K Print Hoodie For Men And Women",
    description: "Y2K Gothic Print Hoodie For Men And Women - Dark Fashion Zip-Up Sweatshirt, Stylish & Casual Streetwear For All Seasons",
    price: 2499,
    category: "trending",
    sizes: ["OS"],
    images: ["https://i.pinimg.com/736x/11/43/ff/1143ff9efa9258490eb770321d8d8318.jpg"],
  },
  {
    id: "p_21",
    name: "Gothic Print Hoodie For Men And Women",
    description: "Nylon track pants featuring 3M reflective piping down the outseams and breathable mesh lining.",
    price: 3199,
    category: "trending",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://i.pinimg.com/736x/a4/53/84/a45384f6b22f7ff98234396ab2ee7cb5.jpg"],
  },
  {
    id: "p_22",
    name: "Graphic Football Jersey",
    description: "Oversized retro football jersey with custom sublimated graphics, a ribbed v-neck, and highly breathable moisture-wicking fabric.",
    price: 2799,
    category: "trending",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://i.pinimg.com/736x/08/45/1e/08451e48dcaf6743413c78960d871f80.jpg"],
  },
  {
    id: "p_23_trending",
    name: "Graphic Football Jersey",
    description: "Oversized retro football jersey with custom sublimated graphics, a ribbed v-neck, and highly breathable moisture-wicking fabric.",
    price: 2799,
    category: "trending",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://i.pinimg.com/736x/a8/02/d9/a802d915b430973adaf43de2079d9398.jpg"],
  },

  // ACCESSORIES (6 items)
  {
    id: "p_06",
    name: "Chunky Hardware Necklace",
    description: "Industrial-inspired ball chain necklace with custom branded carabiner clasp mechanism. Stainless steel construction ensures it will never tarnish.",
    price: 1299,
    category: "accessories",
    sizes: ["OS"],
    images: ["https://images.unsplash.com/photo-1599643478524-fb524ee59089?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: "p_07",
    name: "Balaclava Beanie",
    description: "Distressed knit balaclava that can be rolled up and worn as a standard beanie. Woven brand label on center back.",
    price: 999,
    category: "accessories",
    sizes: ["OS"],
    images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: "p_23",
    name: "Wrap-Around Sunglasses",
    description: "Y2K-inspired aerodynamic wrap-around sunglasses with polarized reflective lenses and a sleek matte frame.",
    price: 1599,
    category: "accessories",
    sizes: ["OS"],
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1599643478524-fb524ee59089?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: "p_24",
    name: "Tactical Crossbody Bag",
    description: "Compact nylon crossbody bag with military-grade webbing, metal buckles, and a hidden rear zip pocket for valuables.",
    price: 1899,
    category: "accessories",
    sizes: ["OS"],
    images: ["https://images.unsplash.com/photo-1614769062325-2c8c105ab1c5?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: "p_25",
    name: "Studded Leather Belt",
    description: "Heavy-duty vegan leather belt featuring closely packed metal pyramid studs and an oversized double-prong buckle.",
    price: 1199,
    category: "accessories",
    sizes: ["S", "M", "L"],
    images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: "p_26",
    name: "Textured Bucket Hat",
    description: "Oversized bucket hat made from a textured, fuzzy mohair blend material. Features an inner drawstring for adjustable fit.",
    price: 1499,
    category: "accessories",
    sizes: ["M", "L"],
    images: ["https://images.unsplash.com/photo-1599643478524-fb524ee59089?q=80&w=1000&auto=format&fit=crop"],
  },

];

// LOOKS: Combine all items from Mens, Womens, and Trending
const lookItems: Product[] = mockProducts
  .filter((p) => ["mens", "womens", "trending"].includes(p.category))
  .map((p) => ({
    ...p,
    id: `${p.id}_look`,
    category: "looks",
  }));

mockProducts.push(...lookItems);

export function getProductsByCategory(category: Product["category"]): Product[] {
  return mockProducts.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id);
}
