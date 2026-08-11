import { CartItem } from "@/types/cart";
import { CheckoutForm } from "@/types/checkout";
import { DELIVERY_FEE } from "@/constants/constants";
import { formatCurrency } from "@/utils/currency";
import { buildWhatsAppUrl } from "@/services/whatsapp";

export const buildOrderMessage = (items: CartItem[], checkout: CheckoutForm) => {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = checkout.fulfillment === "Entrega" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const itemLines = items
    .map((item) => {
      const details = [
        ...item.options.map((option) => `   - ${option.groupName}: ${option.optionName}`),
        item.additions.length
          ? `   - Adicionais: ${item.additions.map((addition) => addition.name).join(", ")}`
          : "",
        item.notes ? `   - Obs.: ${item.notes}` : ""
      ].filter(Boolean);

      return [
        `${item.quantity}x ${item.product.name} - ${formatCurrency(item.unitPrice * item.quantity)}`,
        ...details
      ].join("\n");
    })
    .join("\n");

  const deliveryLines =
    checkout.fulfillment === "Entrega"
      ? [
          "*ENTREGA*",
          "",
          `Endereco: ${checkout.address}`,
          `Numero: ${checkout.number}`,
          `Bairro: ${checkout.neighborhood}`,
          `CEP: ${checkout.zipCode || "-"}`,
          `Complemento: ${checkout.complement || "-"}`,
          `Ponto de referencia: ${checkout.reference || "-"}`
        ]
      : ["*RETIRADA NO LOCAL*"];

  return [
    "Ola! Gostaria de fazer um pedido na Mikael Lanches e Espetinhos.",
    "",
    "*PEDIDO*",
    "",
    itemLines,
    "",
    `*Subtotal:* ${formatCurrency(subtotal)}`,
    `*Entrega:* ${formatCurrency(deliveryFee)}`,
    `*Total:* ${formatCurrency(total)}`,
    "",
    "*DADOS DO CLIENTE*",
    "",
    `Nome: ${checkout.name}`,
    `WhatsApp: ${checkout.phone}`,
    "",
    ...deliveryLines,
    "",
    `*Pagamento:* ${checkout.payment}`,
    checkout.payment === "Dinheiro" ? `Troco para: ${checkout.changeFor || "-"}` : "",
    "",
    "*Observacao:*",
    checkout.notes || "-"
  ]
    .filter((line) => line !== "")
    .join("\n");
};

export const createWhatsAppOrderLink = (items: CartItem[], checkout: CheckoutForm) =>
  buildWhatsAppUrl(buildOrderMessage(items, checkout));
