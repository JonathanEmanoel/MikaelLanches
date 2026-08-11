import { Product } from "@/types/product";

export type SelectedAddition = {
  id: string;
  name: string;
  price: number;
};

export type SelectedOption = {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceDelta: number;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  additions: SelectedAddition[];
  options: SelectedOption[];
  notes?: string;
};
