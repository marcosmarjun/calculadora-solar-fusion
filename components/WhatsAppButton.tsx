"use client";

/** Botão que abre o WhatsApp com mensagem pré-definida para contato com especialista. */

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP ?? "55SEUNUMEROAQUI";

const WHATSAPP_MESSAGE =
  "Olá, fiz a simulação de energia solar e quero mais informações.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-outline w-full text-center md:mt-0 md:w-auto"
    >
      Falar com especialista no WhatsApp
    </a>
  );
}
