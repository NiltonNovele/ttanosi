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
    name: "",
    description: "",
    price: 3999,
    category: "mens",
    sizes: ["S", "M", "L", "XL"],
    isNewArrival: true,
    images: ["/tshirt/new/2.png"],
  },
  {
    id: "p_02",
    name: "",
    description: "",
    price: 2499,
    category: "mens",
    sizes: ["S", "M", "L", "XL"],
    images: ["/tshirt/new/3.png"],
  },
  {
    id: "p_11",
    name: "",
    description: "",
    price: 1499,
    category: "mens",
    sizes: ["M", "L", "XL", "XXL"],
    images: ["/tshirt/new/4.png"],
  },
  {
    id: "p_12",
    name: "",
    description: "",
    price: 1699,
    category: "mens",
    sizes: ["S", "M", "L", "XL"],
    isNewArrival: true,
    images: ["/tshirt/new/5.png"],
  },
  {
    id: "p_13",
    name: "",
    description: "",
    price: 1999,
    category: "mens",
    sizes: ["M", "L"],
    images: ["/tshirt/new/6.png"],
  },
  {
    id: "p_14",
    name: "",
    description: "",
    price: 3899,
    category: "mens",
    sizes: ["30", "32", "34", "36"],
    images: ["/tshirt/new/7.png"],
  },
  {
    id: "p_15",
    name: "",
    description: "",
    price: 2899,
    category: "mens",
    sizes: ["30", "32", "34", "36"],
    images: ["/tshirt/black1.png"],
  },
  {
    id: "p_16",
    name: "",
    description: "",
    price: 3899,
    category: "mens",
    sizes: ["30", "32", "34", "36"],
    images: ["/tshirt/black2.png"],
  },

  // WOMENS (6 items)
  {
    id: "p_w03",
    name: "",
    description: "",
    price: 4999,
    category: "mens",
    sizes: ["XS", "S", "M", "L"],
    isNewArrival: true,
    images: ["/tshirt/grey1.png"],
  },
  {
    id: "p_w04",
    name: "",
    description: "",
    price: 4999,
    category: "mens",
    sizes: ["XS", "S", "M", "L"],
    images: ["/tshirt/grey2.png"],
  },
  {
    id: "p_w15",
    name: "",
    description: "",
    price: 2499,
    category: "mens",
    sizes: ["XS", "S", "M", "L"],
    images: ["/tshirt/pink1.png"],
  },
  {
    id: "p_w16",
    name: "",
    description: "",
    price: 5499,
    category: "mens",
    sizes: ["S", "M", "L"],
    isNewArrival: true,
    images: ["/tshirt/pink2.png"],
  },
  // {
  //   id: "p_w17",
  //   name: "Women's Fitted Patchwork T-Shirt",
  //   description: "Micro-mini cargo skirt in durable twill with dual side pockets and a distressed raw hem.",
  //   price: 2299,
  //   category: "womens",
  //   sizes: ["XS", "S", "M"],
  //   images: ["https://i.pinimg.com/736x/eb/36/7b/eb367b20aae60eaa80e313df4b62efd2.jpg"],
  // },
  // {
  //   id: "p_w18",
  //   name: "Motorcycle Style Long Sleeve Shirt Tops",
  //   description: "Women's Trendy Comfortable Motorcycle Style Long Sleeve Shirt Tops",
  //   price: 1899,
  //   category: "womens",
  //   sizes: ["XS", "S", "M", "L"],
  //   images: ["https://i.pinimg.com/736x/d6/9a/c6/d69ac699a17672a480e2c980faeb4be7.jpg"],
  // },
  // {
  //   id: "p_w19",
  //   name: "Spiderman Inspired Oversized Zipper Hoodie ",
  //   description: "Women's Trendy Comfortable Motorcycle Style Long Sleeve Shirt Tops",
  //   price: 1899,
  //   category: "womens",
  //   sizes: ["XS", "S", "M", "L"],
  //   images: ["https://i.pinimg.com/736x/d8/97/af/d897af4896f14ec5feffe5854550103b.jpg"],
  // },
  // {
  //   id: "p_w20",
  //   name: "Oversized V-Neck T-Shirt",
  //   description: "Women's Trendy Comfortable Motorcycle Style Long Sleeve Shirt Tops",
  //   price: 1899,
  //   category: "womens",
  //   sizes: ["XS", "S", "M", "L"],
  //   images: ["https://i.pinimg.com/736x/d1/65/90/d1659041caca277c5c0e3c977a3e47a4.jpg"],
  // },

  // // TRENDING (6 items)
  // {
  //   id: "p_05",
  //   name: "Graphic tracksuit",
  //   description: "Ultra-heavyweight 400gsm brushed fleece hoodie. Features high-density puff print graphics that glow under UV light.",
  //   price: 3999,
  //   category: "trending",
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   isNewArrival: true,
  //   images: ["https://i.pinimg.com/736x/e5/69/b0/e569b0302a6e67386b52023d00a8d6a3.jpg"],
  // },
  // {
  //   id: "p_08",
  //   name: "Drawstring Wide bottom Jeans",
  //   description: "Open-knit distressed sweater with dropped shoulders and elongated sleeves. Perfect for layering over graphic tees.",
  //   price: 3299,
  //   category: "trending",
  //   sizes: ["S", "M", "L", "XL"],
  //   images: ["https://i.pinimg.com/736x/00/10/5a/00105a4c07b0577f8e7f0d43b7fa86b7.jpg"],
  // },
  // {
  //   id: "p_19",
  //   name: "MOTOR RACING BOMBER",
  //   description: "Vintage-style racing bomber featuring custom embroidered patches and a boxy, retro-futuristic fit. A high-speed street essential.",
  //   price: 6499,
  //   category: "trending",
  //   sizes: ["M", "L", "XL"],
  //   isNewArrival: true,
  //   images: ["/images/landing/motor-jacket.jpg"],
  // },
  // {
  //   id: "p_20",
  //   name: "Y2K Print Hoodie For Men And Women",
  //   description: "Y2K Gothic Print Hoodie For Men And Women - Dark Fashion Zip-Up Sweatshirt, Stylish & Casual Streetwear For All Seasons",
  //   price: 2499,
  //   category: "trending",
  //   sizes: ["OS"],
  //   images: ["https://i.pinimg.com/736x/11/43/ff/1143ff9efa9258490eb770321d8d8318.jpg"],
  // },
  // {
  //   id: "p_21",
  //   name: "Gothic Print Hoodie For Men And Women",
  //   description: "Nylon track pants featuring 3M reflective piping down the outseams and breathable mesh lining.",
  //   price: 3199,
  //   category: "trending",
  //   sizes: ["S", "M", "L", "XL"],
  //   images: ["https://i.pinimg.com/736x/a4/53/84/a45384f6b22f7ff98234396ab2ee7cb5.jpg"],
  // },
  // {
  //   id: "p_22",
  //   name: "Graphic Football Jersey",
  //   description: "Oversized retro football jersey with custom sublimated graphics, a ribbed v-neck, and highly breathable moisture-wicking fabric.",
  //   price: 2799,
  //   category: "trending",
  //   sizes: ["S", "M", "L", "XL"],
  //   images: ["https://i.pinimg.com/736x/08/45/1e/08451e48dcaf6743413c78960d871f80.jpg"],
  // },
  // {
  //   id: "p_23_trending",
  //   name: "Graphic Football Jersey",
  //   description: "Oversized retro football jersey with custom sublimated graphics, a ribbed v-neck, and highly breathable moisture-wicking fabric.",
  //   price: 2799,
  //   category: "trending",
  //   sizes: ["S", "M", "L", "XL"],
  //   images: ["https://i.pinimg.com/736x/a8/02/d9/a802d915b430973adaf43de2079d9398.jpg"],
  // },

  // ACCESSORIES (6 items)
  {
    id: "p_06",
    name: "Black Fitted Cap",
    description: "",
    price: 1299,
    category: "accessories",
    sizes: ["OS"],
    images: ["/caps/black1.jpeg"],
  },
  {
    id: "p_07",
    name: "Brown Fitted Cap",
    description: "",
    price: 999,
    category: "accessories",
    sizes: ["OS"],
    images: ["/caps/brown1.jpeg"],
  },
  {
    id: "p_23",
    name: "Grey Fitted Cap",
    description: "",
    price: 1599,
    category: "accessories",
    sizes: ["OS"],
    isNewArrival: true,
    images: ["/caps/grey1.jpeg"],
  },
  {
    id: "p_24",
    name: "Black Skullie",
    description: "",
    price: 1899,
    category: "accessories",
    sizes: ["OS"],
    images: ["/gorro/black.png"],
  },
  {
    id: "p_25",
    name: "White Skullie",
    description: "",
    price: 1199,
    category: "accessories",
    sizes: ["S", "M", "L"],
    images: ["/gorro/white.png"],
  },
  {
    id: "p_26",
    name: "Grey Skullie",
    description: "",
    price: 1499,
    category: "accessories",
    sizes: ["M", "L"],
    images: ["/gorro/grey.png"],
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
