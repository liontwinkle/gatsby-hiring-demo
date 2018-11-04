/* eslint max-len: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Header from '../components/Header'
import config from '../../config/website'
import theme from '../../config/theme'
import styled from 'react-emotion'
import Button from '../components/Button'
import Container from '../components/Container'
import FeaturedPost from '../components/FeaturedPost'
// import EventSlim from '../components/EventSlim'
import EventInfo from '../components/EventInfo'
import Footer from '../components/Footer'

const EXCERPT_LENGTH = 140

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Text = styled.p`
  text-align: center;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  max-width: 850px;
  margin: 3rem auto;
  text-shadow: ${props => props.theme.shadow.text.big};
`

const Index = ({
  data: {
    allPrismicPrograma: { edges: events },
    allPrismicNastan: { edges: nastani },
  },
}) => (
  <div>
    <Header
      slim
      subtitle="Сектор909 е зимски и летен ноќен клуб во Скопје, Македонија."
    >
      #OURGOALISTHEFUTURE
    </Header>
    <Container>
      <Text>Тековна програма</Text>
      <PostsWrapper>
        {/* {events.map(post => (
          <FeaturedPost
            key={post.node.id}
            cover={post.node.data.photo.localFile.childImageSharp.sizes}
            from={post.node.data.from}
            to={post.node.data.to}
            path={post.node.uid}
            naslov={post.node.data.naslov.text}
            sreda={post.node.sreda}
            cetvrtok={post.node.cetvrtok}
            petok={post.node.petok}
            sabota={post.node.sabota}
            fblink={post.node.fblink}
          />
        ))} */}
        {nastani.map(post => (
          <EventInfo
            key={post.node.uid}
            title={post.node.data.naslov.text}
            lineup={post.node.data.lineup.text}
            path={post.node.uid}
            date={post.node.data.date}
            location={post.node.data.location.text}
            inputTags={['журки', 'жмурки', 'ќурќи']}
            excerpt={post.node.data.info.text.substring(0, EXCERPT_LENGTH)}
          />
        ))}
      </PostsWrapper>
      <Text>
        Сите настани <br />
        <Link to="/program">
          <Button type="secondary">Програма</Button>
        </Link>
      </Text>
    </Container>

    <Footer />
  </div>
)

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allPrismicPrograma(limit: 2, sort: { fields: [data___from], order: DESC }) {
      edges {
        node {
          id
          uid
          slugs
          data {
            from
            to
            photo {
              url
              localFile {
                childImageSharp {
                  sizes(
                    maxWidth: 1400
                    quality: 85
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
                  sizes(
                    maxWidth: 1400
                    quality: 85
                    traceSVG: { color: "#2B2B2F" }
                  ) {
                    ...GatsbyImageSharpSizes_withWebp_tracedSVG
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
