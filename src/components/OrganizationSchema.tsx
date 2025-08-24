export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FerchoTecnico',
    url: 'https://www.ferchotecnico.com',
    logo: 'https://www.ferchotecnico.com/hero-poster.jpg',
    sameAs: []
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
