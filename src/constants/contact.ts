// Número local (Colombia): 3008474121
// Prefijo internacional: +57
const PHONE_LOCAL = '3008474121';
const COUNTRY_CODE = '57';

export const PHONE_RAW = `${COUNTRY_CODE}${PHONE_LOCAL}`;
export const PHONE_DISPLAY = `+57 300 847 4121`;
export const PHONE_TEL = `tel:+${PHONE_RAW}`;

export const WA_SHORT_LINK = 'https://wa.link/n8et4q';
export const WA_BASE_URL = `https://wa.me/${PHONE_RAW}`;

export const ADDRESS = 'Dg. 7 #7 - 50, Montería, Córdoba';
export const CITY = 'Montería, Córdoba';

export const FACEBOOK_URL = 'https://www.facebook.com/iFernandoR/';
export const INSTAGRAM_URL = 'https://www.instagram.com/iFerch0/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/iFerch0/';

export const BUSINESS_HOURS = [
  { day: 'Lun - Vie', hours: '8:00 AM - 6:00 PM' },
  { day: 'Sábados', hours: '9:00 AM - 4:00 PM' },
  { day: 'Domingos', hours: '10:00 AM - 2:00 PM' },
];

export function getWaLink(message: string): string {
  return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
}
