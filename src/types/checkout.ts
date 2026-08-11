export type CheckoutForm = {
  name: string;
  phone: string;
  fulfillment: "Entrega" | "Retirada";
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  zipCode: string;
  reference: string;
  payment: "Pix" | "Cartao" | "Dinheiro";
  changeFor: string;
  notes: string;
};

export const emptyCheckoutForm: CheckoutForm = {
  name: "",
  phone: "",
  fulfillment: "Entrega",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  zipCode: "",
  reference: "",
  payment: "Pix",
  changeFor: "",
  notes: ""
};
