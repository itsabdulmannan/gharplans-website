export interface Product {
  product: {
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
    hasDiscount?: boolean;
    discountTiers?: DiscountTier[];
    deliveryCharges?: {
      id: number;
      sourceCityId: number;
      destinationCityId: number;
      deliveryCharge: string;
      sourceCity: { id: number; name: string };
      destinationCity: { id: number; name: string };
    }[];
  };
    weight: number;
  favouriteId: number;
  singleProductPrice: number;
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
  hasDiscount?: boolean;
  discountTiers?: DiscountTier[];
  deliveryCharges?: {
    id: number;
    sourceCityId: number;
    destinationCityId: number;
    deliveryCharge: string;
    sourceCity: { id: number; name: string };
    destinationCity: { id: number; name: string };
  }[];
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
  range: string;
  discountedPrice: string;
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  colors: Color[];
  product: Product;
  itemTotal: number;
  singleProductPrice: number;
  totalCartValue: number;
}