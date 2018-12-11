import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../config/website'

const SEO = props => {
  const { imageSrc, title, description, location, postSEO } = props
  // let title
  // let description
  let image
  let postPath
  if (postSEO) {
    // title = postNode.data.title.text // eslint-disable-line prefer-destructuring
    // description = postNode.data.text.text.slice(0, 200)
    postPath = location.href
    image = config.siteUrl + imageSrc
    console.log('Title, description, image', title, description, image)
  }
  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
  // image = config.siteUrl + realPrefix + image
  // description = config.siteDescription
  const blogURL = config.siteUrl + config.pathPrefix
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    },
  ]
  if (postSEO) {
    schemaOrgJSONLD.push([
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postPath,
              name: title,
              image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      },
    ])
  }
  return (
    <Helmet>
      {/* General Tags */}
      <html lang="mk" />
      <title>
        {title ? `${title} | ${config.siteTitle}` : config.siteTitle}
      </title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#343849"
      />
      <meta name="apple-mobile-web-app-title" content="LekoArts" />
      <meta name="application-name" content="LekoArts" />
      <meta name="msapplication-TileColor" content="#3498db" />
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      {/* OpenGraph */}
      <meta property="og:locale" content="mk_MK" />
      <meta property="og:site_name" content={config.facebook} />
      <meta property="og:url" content={postSEO ? postPath : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  // postNode: PropTypes.object,
  location: PropTypes.object,
  postSEO: PropTypes.bool,
}
