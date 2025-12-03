export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "駅伝リザルト",
    "description": "箱根駅伝、ニューイヤー駅伝など、全国の主要駅伝大会の結果を網羅したサイトです。",
    "url": "https://ekiden-results.com",
    "inLanguage": "ja",
    "publisher": {
      "@type": "Organization",
      "name": "駅伝リザルト",
      "url": "https://ekiden-results.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ekiden-results.com/ekiden-logo.png"
      }
    },
    "sameAs": []
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

