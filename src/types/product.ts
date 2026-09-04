export interface Product {
  id: string;
  brand: string;
  description: string;
  mrp: number;
  price: number;
  discountPercent: number;
  rating: number;
  ratingCount: string;
  images: string[];
  video: string | null;
  sizes: string[];
  fabricSpecs?: {
    material: string;
    weave: string;
    transparency: string;
    feel: string;
  };
}
