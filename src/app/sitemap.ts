import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ferchotecnico.com';
  const routes = [
    '/',
    '/servicios',
    '/servicios/reparacion-computadores-monteria',
    '/servicios/mantenimiento-laptops-monteria',
    '/servicios/formateo-windows-monteria',
    '/servicios/recuperacion-datos-monteria',
    '/servicios/reparacion-pc-monteria',
    '/servicios/eliminacion-virus-monteria',
    '/servicios/mantenimiento-preventivo-monteria',
    '/servicios/soporte-tecnico-monteria',
    '/areas-servicio',
    '/areas-servicio/monteria-centro',
    '/areas-servicio/monteria-sur',
  ];

  return routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() }));
}
