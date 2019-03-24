import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../../config/website'
import ItemPodcast from '../components/ItemPodcast'
import Footer from '../components/Footer'
// import Header from '../components/Header'
import Container from '../components/Container'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import MainHeader from '../components/LayoutComponents/MainHeader'

const Base = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
`

const Podcast = ({
  data: {
    allPrismicPodcast: { edges: posts },
  },
  location,
}) => (
  <Layout>
    <div className="container blog-container">
      <Helmet title={`Podcast | ${config.siteTitle}`} />
      <SEO
        location={location}
        imageSrc={config.siteBanner}
        title="Подкаст Серијал на Миксови снимени во и за клубот Сектор 909"
        description="Подкаст Серијал на Миксови снимени во и за клубот Сектор 909"
        postSEO
      />
      <MainHeader
        slim
        title="Подкаст"
        subtitle="Миксови снимени во и за клубот Сектор 909"
      >
        Подкаст
      </MainHeader>
      <Container type="big">
        <Base>
          {posts.map(post => {
            return (
              <ItemPodcast
                key={post.node.data.title.text}
                cover={post.node.data.image.localFile.childImageSharp.fluid}
                date={post.node.data.date}
                path={`${post.node.uid}`}
                title={post.node.data.title.text}
                text={post.node.data.text.text.slice(0, 400)}
              />
            )
          })}
        </Base>
      </Container>
      <Footer />
    </div>
  </Layout>
)

export default Podcast

// Blog.propTypes = {
//   data: PropTypes.shape({
//     allStrapiBlog: PropTypes.shape({
//       edges: PropTypes.array.isRequired,
//     }),
//   }),
// }

/* eslint no-undef: "off" */
export const AllPodcastQuery = graphql`
  query AllPodcast {
    allPrismicPodcast {
      edges {
        node {
          uid
          data {
            title {
              text
              html
            }
            text {
              html
              text
            }
            link {
              link_type
              url
              target
            }
            date
            image {
              localFile {
                childImageSharp {
                  fluid(
                    maxWidth: 900
                    quality: 85
                    traceSVG: { color: "#2B2B2F" }
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
