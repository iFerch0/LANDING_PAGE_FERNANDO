import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceTemplate.module.css';
import { WA_BASE_URL } from '@/constants/contact';

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
    <main className={`${styles.container} ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className={styles.ctaRow}>
            <a href={WA_BASE_URL} className={styles.primaryBtn}>
              Pedir presupuesto por WhatsApp
            </a>
            <Link href="/#contacto" className={styles.outlineBtn}>
              Contacto
            </Link>
          </div>
        </div>
        <div className={styles.media}>
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" priority />
        </div>
      </section>

      <section className={styles.cases}>
        <h2 className={styles.sectionTitle}>Casos reales</h2>
        {cases.length === 0 ? (
          <p>
            No tienes casos publicados aún. Puedes solicitar que publiquemos ejemplos reales de
            trabajos.
          </p>
        ) : (
          <div className={styles.caseGrid}>
            {cases.map((c, i) => (
              <article className={styles.caseCard} key={i}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={styles.faqs}>
        <h2 className={styles.sectionTitle}>Preguntas frecuentes</h2>
        <dl>
          {faqs.map((f, i) => (
            <div key={i} className={styles.faqItem}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </main>
  );
}
