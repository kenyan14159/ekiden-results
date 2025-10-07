interface SportsEventData {
  name: string
  startDate: string
  endDate?: string
  location: {
    name: string
    address?: string
  }
  description: string
  organizer?: {
    name: string
    url?: string
  }
  competitors?: Array<{
    name: string
    position?: number
  }>
  url: string
}

interface SportsEventStructuredDataProps {
  event: SportsEventData
}

export function SportsEventStructuredData({ event }: SportsEventStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      '@type': 'Place',
      name: event.location.name,
      ...(event.location.address && {
        address: {
          '@type': 'PostalAddress',
          addressLocality: event.location.address,
          addressCountry: 'JP',
        },
      }),
    },
    ...(event.organizer && {
      organizer: {
        '@type': 'Organization',
        name: event.organizer.name,
        ...(event.organizer.url && { url: event.organizer.url }),
      },
    }),
    ...(event.competitors && event.competitors.length > 0 && {
      competitor: event.competitors.map((competitor) => ({
        '@type': 'SportsTeam',
        name: competitor.name,
        ...(competitor.position && { position: competitor.position }),
      })),
    }),
    url: event.url,
    sport: '駅伝',
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: 'ja',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface ArticleData {
  headline: string
  description: string
  datePublished: string
  dateModified: string
  author: string
  url: string
  imageUrl?: string
  keywords?: string[]
}

interface ArticleStructuredDataProps {
  article: ArticleData
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: 'https://ekiden-results.com',
    },
    publisher: {
      '@type': 'Organization',
      name: '駅伝リザルト',
      url: 'https://ekiden-results.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ekiden-results.com/ekiden-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    ...(article.imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: article.imageUrl,
      },
    }),
    ...(article.keywords && article.keywords.length > 0 && {
      keywords: article.keywords.join(', '),
    }),
    inLanguage: 'ja',
    articleSection: '駅伝',
    about: {
      '@type': 'Thing',
      name: '駅伝',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
