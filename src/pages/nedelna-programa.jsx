import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import config from '../../config/website'
import NastanPost from '../components/NastanPost'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Container from '../components/Container'

const Base = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
`

const Nastan = ({
  data: {
    allPrismicPrograma: { edges: events },
  },
}) => (
  <div className="container blog-container">
    <Helmet title={`Nastani | ${config.siteTitle}`} />
    <Header slim subtitle="Идни и Претходни Настани во Клуб Сектор909">
      Настани
    </Header>
    <Container type="big">
      <Base>
        {events.map(post => (
          <NastanPost
            key={post.node.id}
            cover={post.node.data.photo.localFile.childImageSharp.sizes}
            from={post.node.data.from}
            to={post.node.data.to}
            path={post.node.slugs[0]}
            naslov={post.node.data.naslov.text}
            description={post.node.data.description.text}
            sreda={post.node.sreda}
            cetvrtok={post.node.cetvrtok}
            petok={post.node.petok}
            sabota={post.node.sabota}
            fblink={post.node.fblink}
          />
        ))}
      </Base>
    </Container>
    <Footer />
  </div>
)

export default Nastan

Nastan.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }),
}

/* eslint no-undef: "off" */
export const EventsQuery = graphql`
  query EventsQuery {
    allPrismicPrograma {
      edges {
        node {
          id
          slugs
          data {
            from
            to
            photo {
              url
              localFile {
                childImageSharp {
                  sizes(
                    maxWidth: 900
                    quality: 90
                    traceSVG: { color: "#2B2B2F" }
                  ) {
                    ...GatsbyImageSharpSizes_withWebp_tracedSVG
                  }
                }
              }
            }
            naslov {
              html
              text
            }
            description {
              html
              text
            }
          }
        }
      }
    }
  }
`
