import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573114663373";
const DEFAULT_MESSAGE = encodeURIComponent(
  "¡Hola! Me gustaría recibir más información sobre FlowStack y sus soluciones de automatización."
);

interface WhatsAppButtonProps {
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  className = "",
  label = "Escríbenos por WhatsApp",
}: WhatsAppButtonProps) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}
