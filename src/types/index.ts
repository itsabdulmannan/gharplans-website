export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  specifications?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
  stock?: number;
  colors: Color[];
  options: Option[];
  shortDescription: string;
  addiotionalInformation: string;
  similarProductId: string[];
  hasDiscount?: boolean; // Add a field to indicate if the product has a discount
  discountTiers?: DiscountTier[]; // Add a discountTiers array to represent the price ranges
}

export interface Color {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface Option {
  value: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNo: string;
  address: string;
  city: string;
  dob: string;
  profileImage: string;
  role: string;
  dateOfBirth: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Review {
  id: number;
  rating: number;
  review: string;
  status: string;
  createdAt: string;
  user: User;
  product: {
    name: string;
    category: {
      name: string;
    };
  };
}

export type ReviewsData = Review[];

export interface DiscountTier {
  range: string; // e.g., "1-5", "6-10"
  discountedPrice: string; // e.g., "671.40"
}
