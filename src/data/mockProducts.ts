import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 'anouk-designer-saree',
    brand: 'ANOUK',
    description: "Women Pure Handloom Silk Saree with Rich Contrast Border & Pallu",
    mrp: 5499,
    price: 1799,
    discountPercent: 67,
    rating: 4.8,
    ratingCount: '3.4k',
    // Authentic matching saree images extracted directly from the video and download
    images: [
      '/images/saree1.jpg',
      '/images/saree2.jpg',
      '/images/saree3.jpg',
      '/images/saree4.jpg',
    ],
    video: '/videos/saree_motion.mp4',

    sizes: ['Free Size'],
    fabricSpecs: {
      material: 'Pure Handloom Silk with Soft Fluid Fall',
      weave: 'Traditional Jacquard Woven Zari Pallu',
      transparency: 'Completely Opaque',
      feel: 'Lightweight, silky smooth with graceful natural motion drape',
    },
  },
  {
    id: 'mitera-green-saree',
    brand: 'MITERA',
    description: "Women Elegant Emerald Green Festive Saree with Gold Zari Accents",
    mrp: 4499,
    price: 1499,

    discountPercent: 66,
    rating: 4.6,
    ratingCount: '2.7k',
    // 1st photo clearly showcases the green festive saree in 3:4 portrait
    images: [
      '/images/products/women_green_saree_1.jpg',
      '/images/products/women_green_saree_2.jpg',
      '/images/products/women_green_saree_3.jpg',
    ],
    // Matching video of Indian woman wearing green saree in motion
    video: '/videos/products/mitera_green_saree.mp4',
    sizes: ['Free Size'],
    fabricSpecs: {
      material: 'Fine Art Silk with Gold Brocade Zari',
      weave: 'Intricate Floral Jacquard Weave',
      transparency: 'Completely Opaque',
      feel: 'Silky smooth, royal drape with high sheen',
    },
  },
  {
    id: 'herenow-knit-dress',
    brand: 'HERE&NOW',
    description: "Women Ribbed Knit Bodycon Runway Midi Dress",
    mrp: 1999,
    price: 699,
    discountPercent: 65,
    rating: 4.3,
    ratingCount: '4.1k',
    // 1st photo clearly showcases the form-hugging knit dress in 3:4 portrait
    images: [
      '/images/products/herenow_dress_1.jpg',
      '/images/products/herenow_dress_2.jpg',
      '/images/products/herenow_dress_3.jpg',
    ],
    // Matching video of fashion model walking runway in the knit dress
    video: '/videos/products/herenow_knit_dress.mp4',
    sizes: ['XS', 'S', 'M', 'L'],
    fabricSpecs: {
      material: '95% Viscose, 5% Elastane (240 GSM)',
      weave: '2x2 Fine Ribbed Knit',
      transparency: 'Completely Opaque',
      feel: 'Form-hugging 4-way elasticity with premium recovery',
    },
  },
  {
    id: 'kalini-red-saree',
    brand: 'KALINI',
    description: "Women Rich Crimson Red & Gold Zari Woven Banarasi Silk Festive Saree",
    mrp: 4999,
    price: 1699,
    discountPercent: 66,
    rating: 4.7,
    ratingCount: '5.4k',
    // 1st photo clearly showcases the crimson red Banarasi saree on the model in 3:4 portrait
    images: [
      '/images/products/kalini_red_saree_1.jpg',
      '/images/products/kalini_red_saree_2.jpg',
      '/images/products/kalini_red_saree_3.jpg',
    ],
    // Matching video of model in motion showcasing the traditional ethnic attire drape
    video: '/videos/products/kalini_red_saree.mp4',
    sizes: ['Free Size'],
    fabricSpecs: {
      material: 'Pure Banarasi Art Silk with Heavy Golden Zari Brocade',
      weave: 'Traditional Kadhwa Floral Weave with Rich Zari Border',
      transparency: 'Completely Opaque',
      feel: 'Heavy regal drape, lustrous golden sheen with grand festive fall',
    },
  },
  {
    id: 'anouk-gold-saree',
    brand: 'ANOUK',
    description: "Women Mustard Gold & Antique Zari Traditional Chanderi Silk Saree",
    mrp: 3999,
    price: 1299,
    discountPercent: 67,
    rating: 4.5,
    ratingCount: '3.8k',
    // 1st photo clearly showcases the mustard gold Chanderi saree on the model in 3:4 portrait
    images: [
      '/images/products/anouk_gold_saree_1.jpg',
      '/images/products/anouk_gold_saree_2.jpg',
      '/images/products/anouk_gold_saree_3.jpg',
    ],
    // No motion video for this item (pure photo-only product to demonstrate filtering)
    video: null,

    sizes: ['Free Size'],
    fabricSpecs: {
      material: 'Handloom Chanderi Silk Blend with Metallic Zari Weave',
      weave: 'Fine Tissue Chanderi Weave with Temple Border Detailing',
      transparency: 'Completely Opaque',
      feel: 'Featherlight crisp texture, graceful structured pleating',
    },
  },
];
