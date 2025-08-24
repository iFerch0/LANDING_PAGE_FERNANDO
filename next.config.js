/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/servicios/reparacion-pc-monteria',
        destination: '/servicios/reparacion-computadores-monteria',
        permanent: true,
      },
      {
        source: '/servicios/mantenimiento-preventivo-monteria',
        destination: '/servicios/mantenimiento-laptops-monteria',
        permanent: true,
      },
      {
        source: '/servicios/recuperacion-datos-monteria-old',
        destination: '/servicios/recuperacion-datos-monteria',
        permanent: true,
      },
      // catch some common legacy variations
      {
        source: '/servicios/soporte-tecnico',
        destination: '/servicios/soporte-tecnico-monteria',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
