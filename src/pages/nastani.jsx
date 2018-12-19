import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../../config/website'
import NastanPost from '../components/NastanPost'
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

const Nastan = ({
  data: {
    allPrismicNastan: { edges: nastani },
  },
  location,
}) => (
  <Layout>
    <div className="container blog-container">
      <Helmet title={`Програм | ${config.siteTitle}`} />
      <SEO
        location={location}
        imageSrc={config.siteBanner}
        title="Настани во Клуб Сектор909"
        description="Дознај повеќе инфо за настани во Клубот Сектор909, Излет Кафе, како и други настани од оваа организација"
        postSEO
      />
      <MainHeader
        slim
        title="Настани"
        subtitle="Идни и Претходни Настани во Клуб Сектор909"
      >
        Настани
      </MainHeader>
      <Container type="big">
        <Base>
          {nastani.map(post => (
            <NastanPost
              key={post.node.id}
              cover={post.node.data.photo.localFile.childImageSharp.fluid}
              date={post.node.data.date}
              path={post.node.uid}
              naslov={post.node.data.naslov.text}
              info={post.node.data.info.text}
              lineup={post.node.data.lineup.text}
              location={post.node.data.location.text}
            />
          ))}
        </Base>
      </Container>
      <Footer />
    </div>
  </Layout>
)

export default Nastan

Nastan.propTypes = {
  data: PropTypes.shape({
    allPrismicNastan: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }),
}

/* eslint no-undef: "off" */
export const EventsQuery = graphql`
  query EventsQuery {
    allPrismicNastan {
      edges {
        node {
          id
          uid
          data {
            naslov {
              html
              text
            }
            info {
              html
              text
            }
            date
            location {
              html
              text
            }
            lineup {
              html
              text
            }
            photo {
              url
              localFile {
                childImageSharp {
                  fluid(
                    maxWidth: 1400
                    quality: 85
                    traceSVG: { color: "#52555e" }
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                  fixed(width: 140, height: 140) {
                    src
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
