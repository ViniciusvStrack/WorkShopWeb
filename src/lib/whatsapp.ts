export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, '')

  if (!normalizedPhone) {
    throw new Error('WhatsApp phone is required')
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}
