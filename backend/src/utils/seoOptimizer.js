// backend/src/utils/seoOptimizer.js

const cheerio = require('cheerio');

// Optimize HTML content for SEO
const optimizeSEO = (htmlContent) => {
  const $ = cheerio.load(htmlContent);

  // Add meta tags for SEO if not present
  if ($('meta[name="description"]').length === 0) {
    $('head').append('<meta name="description" content="A well-crafted blog post about intimacy and well-being">');
  }

  if ($('meta[name="keywords"]').length === 0) {
    $('head').append('<meta name="keywords" content="intimacy, well-being, relationships, sexual health">');
  }

  // Ensure each image has an alt attribute for better accessibility and SEO
  $('img').each((index, element) => {
    if (!$(element).attr('alt')) {
      $(element).attr('alt', 'Image related to intimacy and well-being');
    }
  });

  // Add structured data for articles
  if ($('script[type="application/ld+json"]').length === 0) {
    const structuredData = {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      'headline': $('title').text(),
      'author': 'Secret Silk',
      'publisher': {
        '@type': 'Organization',
        'name': 'Secret Silk',
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': 'https://secretsilk.com/blog'
      }
    };
    $('head').append(`<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`);
  }

  return $.html();
};

module.exports = { optimizeSEO };
