import NavIcons from './navIcons';

export const navItems = [
  { id: 'tienda', label: 'Tienda', href: '/tienda', icon: NavIcons.shoppingBag, isStore: true },
  { id: 'inicio', label: 'Inicio', href: '/', icon: NavIcons.home },
  {
    id: 'servicios',
    label: 'Servicios',
    href: '#servicios',
    icon: NavIcons.services,
    hasDropdown: true,
  },
  { id: 'contacto', label: 'Contacto', href: '#contacto', icon: NavIcons.contact },
];

export const serviceItems = [
  {
    icon: NavIcons.computer,
    title: 'Reparación de PCs',
    desc: 'Diagnóstico y solución de problemas',
    href: '#servicios',
  },
  {
    icon: NavIcons.laptop,
    title: 'Mantenimiento',
    desc: 'Limpieza y optimización preventiva',
    href: '#servicios',
  },
  {
    icon: NavIcons.shield,
    title: 'Eliminación de Virus',
    desc: 'Protección y limpieza de malware',
    href: '#servicios',
  },
  {
    icon: NavIcons.zap,
    title: 'Formateo Windows',
    desc: 'Instalación limpia del sistema',
    href: '#servicios',
  },
  {
    icon: NavIcons.database,
    title: 'Recuperación de Datos',
    desc: 'Rescate de archivos perdidos',
    href: '#servicios',
  },
];
