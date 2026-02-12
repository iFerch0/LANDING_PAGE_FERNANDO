import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

type CaseItem = { title: string; text: string };
type FaqItem = { q: string; a: string };

export default function ServiceTemplate(props: {
  title: string;
  description: string;
  image?: string;
  cases?: CaseItem[];
  faqs?: FaqItem[];
  canonical?: string;
  serviceName?: string;
}) {
  const {
    title,
    description,
    image = '/hero-poster.jpg',
    cases = [],
    faqs = [],
    canonical,
    serviceName,
  } = props;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName || title,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'FerchoTecnico',
      url: 'https://www.ferchotecnico.com',
    },
    areaServed: 'Montería',
  };

  return (
    <main className="container service-page">
      {/* Preload hero image for better LCP */}
      <Head>
        <link rel="preload" as="image" href={image} />
      </Head>
      <section className="service-hero">
        <div className="service-copy">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="cta-row">
            <a href="https://wa.me/573008474121" className="btn btn-primary">
              Pedir presupuesto por WhatsApp
            </a>
            <Link href="/#contacto" className="btn btn-outline">
              Contacto
            </Link>
          </div>
        </div>
        <div className="service-media">
          <Image src={image} alt={title} width={560} height={420} priority />
        </div>
      </section>

      <section className="service-cases">
        <h2>Casos reales</h2>
        {cases.length === 0 ? (
          <p>
            No tienes casos publicados aún. Puedes solicitar que publiquemos ejemplos reales de
            trabajos.
          </p>
        ) : (
          cases.map((c, i) => (
            <article className="case" key={i}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))
        )}
      </section>

      <section className="service-faqs">
        <h2>Preguntas frecuentes</h2>
        <dl>
          {faqs.map((f, i) => (
            <div key={i}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {canonical ? <link rel="canonical" href={canonical} /> : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </main>
  );
}
