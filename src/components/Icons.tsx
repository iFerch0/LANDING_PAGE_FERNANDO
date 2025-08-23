import React from 'react';

type IconProps = {
  className?: string;
  size?: number | string;
  title?: string;
};

export const WhatsAppIcon: React.FC<IconProps> = ({ className, size = 18, title = 'WhatsApp' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
    focusable="false"
  >
    <title>{title}</title>
    <path d="M21 15a4 4 0 0 1-4 4h-1l-4 2v-2H9a6 6 0 0 1-6-6V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 9h.01M11 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className, size = 18, title = 'Phone' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
    focusable="false"
  >
    <title>{title}</title>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.38 2.07.75 3.03a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.37 1.98.63 3.03.75A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className, size = 20, title = 'Chevron' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default WhatsAppIcon;
