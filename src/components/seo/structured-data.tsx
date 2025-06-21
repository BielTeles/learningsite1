import Script from 'next/script';

export function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TechCorp',
    description: 'Empresa líder em desenvolvimento de software e consultoria tecnológica',
    url: 'https://techcorp.com',
    logo: 'https://techcorp.com/logo.png',
    foundingDate: '2019',
    founders: [
      {
        '@type': 'Person',
        name: 'Ana Silva',
        jobTitle: 'CEO & Founder'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99999-9999',
      contactType: 'customer service',
      email: 'contato@techcorp.com',
      availableLanguage: 'Portuguese'
    },
    sameAs: [
      'https://linkedin.com/company/techcorp',
      'https://github.com/techcorp',
      'https://twitter.com/techcorp'
    ],
    services: [
      'Desenvolvimento Web',
      'Aplicativos Mobile', 
      'E-commerce',
      'Backend & APIs',
      'Segurança',
      'Consultoria Tecnológica'
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}

export function WebsiteSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TechCorp',
    url: 'https://techcorp.com',
    description: 'Soluções tecnológicas inovadoras para transformação digital',
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'Organization',
      name: 'TechCorp'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://techcorp.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  );
}

export function ServiceSchema() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Desenvolvimento de Software',
    description: 'Serviços completos de desenvolvimento de software, aplicações web e mobile',
    provider: {
      '@type': 'Organization',
      name: 'TechCorp',
      url: 'https://techcorp.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços TechCorp',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desenvolvimento Web',
            description: 'Aplicações web modernas com React e Next.js'
          }
        },
        {
          '@type': 'Offer', 
          itemOffered: {
            '@type': 'Service',
            name: 'Aplicativos Mobile',
            description: 'Apps nativos e híbridos para iOS e Android'
          }
        }
      ]
    }
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema),
      }}
    />
  );
} 