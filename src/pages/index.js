/* eslint max-len: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Header from '../components/Header'
import config from '../../config/website'
import theme from '../../config/theme'
import styled, { keyframes } from 'react-emotion'
import Button from '../components/Button'
import Container from '../components/Container'
import FeaturedPost from '../components/FeaturedPost'
// import EventSlim from '../components/EventSlim'
import EventInfo from '../components/EventInfo'
import Footer from '../components/Footer'
import Wave from '../components/Wave'

const EXCERPT_LENGTH = 140

const pulse = keyframes`
  0% {
    transform: scale(1);
    animation-timing-function: ease-in;
  }
  25% {
    animation-timing-function: ease-out;
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.12);
    animation-timing-function: ease-in;
  }
  to {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`

const Wrapper = styled.div`
  height: 600px;
  position: relative;
  overflow: hidden;
  .gatsby-image-wrapper {
    height: 600px;
    width: 100%;
    img {
      animation: ${pulse} 30s infinite;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 500px;
    .gatsby-image-wrapper {
      height: 500px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 400px;
    .gatsby-image-wrapper {
      height: 400px;
    }
  }
`

const Hero = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: ${props => props.theme.colors.white.light};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => props.theme.layout.base};
  padding: 0 2rem;
  text-align: center;
`

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
    file,
  },
}) => (
  <div>
    <Wrapper>
      <Hero>
        <h1>#OURGOALISTHEFUTURE</h1>
      </Hero>
      <Wave />
      <Img sizes={file.childImageSharp.sizes} />
    </Wrapper>
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
    file(relativePath: { eq: "sektor_2.png" }) {
      childImageSharp {
        sizes(
          maxWidth: 900
          quality: 85
          duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
        ) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
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
                    traceSVG: { color: "gray" }
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
                    traceSVG: { color: "#52555e" }
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
