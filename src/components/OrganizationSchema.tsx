export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fernando - Técnico en Computadores',
    url: 'https://ferchotecnico.com',
    logo: 'https://ferchotecnico.com/hero-poster.jpg',
    sameAs: [],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
