export const CONTACT = {
  phone: '+573008474121',
  phoneDisplay: '+57 300 847 4121',
  whatsapp: '573008474121',
  email: 'contacto@ferchotecnico.com',
  address: 'Dg. 7 #7 - 50',
  addressFull: 'Dg. 7 #7 - 50, Montería, Córdoba',
  city: 'Montería',
  region: 'Córdoba',
  country: 'Colombia',
  latitude: '8.7352034',
  longitude: '-75.8903534',
} as const;

export const SITE_URL = 'https://www.ferchotecnico.com';

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
