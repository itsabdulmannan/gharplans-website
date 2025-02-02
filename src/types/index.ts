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
