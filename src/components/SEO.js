import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = 'MD Shaikh Rahman - Portfolio';
  const defaultDescription = 'Full Stack Developer specializing in React, Node.js, and Flutter. Building web applications, mobile apps, and ML solutions.';
  const defaultImage = '/social-preview.jpg';
  const siteUrl = 'https://your-portfolio-url.com';

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = `${siteUrl}${image || defaultImage}`;
  const metaUrl = `${siteUrl}${url || ''}`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaUrl} />
    </Helmet>
  );
};

export default SEO;