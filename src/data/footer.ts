export interface BusinessHour {
  day: string;
  hours: string;
}

export const businessHours: BusinessHour[] = [
  { day: 'Lun - Vie', hours: '8:00 AM - 6:00 PM' },
  { day: 'Sábados', hours: '9:00 AM - 4:00 PM' },
  { day: 'Domingos', hours: '10:00 AM - 2:00 PM' },
];
