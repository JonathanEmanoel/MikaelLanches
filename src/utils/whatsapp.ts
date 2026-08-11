import { WHATSAPP_NUMBER } from "@/constants/constants";

export const buildWhatsAppUrl = (message = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
