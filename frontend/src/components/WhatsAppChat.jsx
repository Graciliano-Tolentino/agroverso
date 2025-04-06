import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppChat() {
  return (
    <a
      href="https://wa.me/5511963372373"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition"
      title="Fale conosco pelo WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}

export default WhatsAppChat;
