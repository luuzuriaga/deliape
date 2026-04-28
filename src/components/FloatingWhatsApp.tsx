import { MessageCircle } from 'lucide-react'

interface FloatingWhatsAppProps {
  phoneNumber?: string
  message?: string
}

export function FloatingWhatsApp({ phoneNumber, message = '¡Hola! Quisiera más información.' }: FloatingWhatsAppProps) {
  if (!phoneNumber) return null

  // Ensure phone number has no spaces or special characters
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-white text-black text-sm px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        ¡Escríbenos!
      </span>
    </a>
  )
}
