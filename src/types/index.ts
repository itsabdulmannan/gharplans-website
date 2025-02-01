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
}

export interface Color {
  id: string;
  name: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}
export interface UserDto {
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  contactNo: string;
  address: string;
  city: string;
  dob: string;
  profileImage: string;
}
