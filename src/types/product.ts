export type CategoryId =
  | "sanduiches"
  | "x-egg"
  | "sanduiches-especiais"
  | "espetinhos"
  | "cachorro-quente"
  | "salgados"
  | "acai"
  | "bebidas";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
};

export type Product = {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  additions?: ProductAddition[];
  optionGroups?: ProductOptionGroup[];
  featured?: boolean;
};

export type ProductAddition = {
  id: string;
  name: string;
  price: number;
};

export type ProductOption = {
  id: string;
  name: string;
  priceDelta?: number;
  default?: boolean;
};

export type ProductOptionGroup = {
  id: string;
  name: string;
  type?: "single" | "multiple";
  maxSelections?: number;
  required?: boolean;
  options: ProductOption[];
};
