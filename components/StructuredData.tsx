export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "駅伝リザルト",
    "description": "箱根駅伝、ニューイヤー駅伝など、全国の主要駅伝大会の結果を網羅したサイトです。",
    "url": "https://ekiden-results.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ekiden-results.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "ja",
    "publisher": {
      "@type": "Organization",
      "name": "駅伝リザルト",
      "url": "https://ekiden-results.com"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

