/* eslint max-len: 0 */

import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
// import Header from '../components/Header'
// import config from '../../config/website'
// import theme from '../../config/theme'
import styled, { keyframes } from 'styled-components'
import Button from '../components/Button'
import Container from '../components/Container'
// import FeaturedPost from '../components/FeaturedPost'
// import EventSlim from '../components/EventSlim'
import EventInfo from '../components/EventInfo'
import Footer from '../components/Footer'
import Wave from '../components/Wave'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

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
    allPrismicNastan: { edges: nastani },
    file,
  },
}) => (
  <Layout>
    <div>
      <Wrapper>
        <Hero>
          <h1>#OURGOALISTHEFUTURE</h1>
        </Hero>
        <Wave />
        <Img fluid={file.childImageSharp.fluid} />
      </Wrapper>
      <Container>
        <Text>Тековна програма</Text>
        <PostsWrapper>
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
              image={post.node.data.photo.localFile}
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
  </Layout>
)

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    file(relativePath: { eq: "sektor_2.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 900
          quality: 85
          duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
        ) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
                  fluid(
                    maxWidth: 1400
                    quality: 85
                    traceSVG: { color: "#52555e" }
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
