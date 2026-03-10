export interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  deviceType: string;
  problem: string;
  urgency: string;
}

export interface FormErrors {
  [key: string]: string;
}
