import { notFound } from 'next/navigation';
import ServiceTemplate from '@/components/ServiceTemplate';
import TechnicalServiceSchema from '@/components/TechnicalServiceSchema';
import ReviewSchema from '@/components/ReviewSchema';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado',
      description: 'El servicio que buscas no está disponible',
    };
  }

  return {
    title: service.metadata.title,
    description: service.metadata.description,
    keywords: service.metadata.keywords.join(', '),
    alternates: {
      canonical: service.canonical,
    },
    openGraph: {
      title: service.metadata.openGraph.title,
      description: service.metadata.openGraph.description,
      url: service.canonical,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <TechnicalServiceSchema
        serviceName={service.schema.serviceName}
        serviceDescription={service.schema.serviceDescription}
        priceRange={service.schema.priceRange}
        serviceUrl={service.schema.serviceUrl}
      />
      <ReviewSchema
        name={service.review.name}
        url={service.review.url}
        ratingValue={service.review.ratingValue}
        ratingCount={service.review.ratingCount}
      />
      <ServiceTemplate
        title={service.title}
        description={service.description}
        priceFrom={service.priceFrom}
        image={service.image}
        canonical={service.canonical}
        serviceName={service.serviceName}
        cases={service.cases}
        faqs={service.faqs}
      />
    </>
  );
}
