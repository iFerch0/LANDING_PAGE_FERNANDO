export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fernando Rhenals - Ensamble de PC & Servicio Técnico',
    alternateName: 'Fernando Rhenals',
    url: 'https://www.ferchotecnico.com',
    logo: 'https://www.ferchotecnico.com/logo_new.png',
    sameAs: [],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
