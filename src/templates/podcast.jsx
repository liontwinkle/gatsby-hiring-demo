import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { css, keyframes } from 'react-emotion'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
// import { Link } from 'gatsby'
// import kebabCase from 'lodash/kebabCase'
import { darken } from 'polished'
// import Tags from '../components/Tags'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Content from '../components/Content'
import Wave from '../components/Wave'
// import Button from '../components/Button'
import Footer from '../components/Footer'
// import { hideS } from '../utils/hide'
import config from '../../config/website'
import Grid from 'react-css-grid'
import Player from '../components/Player'
import Lightbox from 'react-images'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PlayerConsumer from '../layouts/GlobalPlayerContext'
import { Twitter, Facebook } from 'react-social-sharing'
import { Flex, Box } from '@rebass/grid/emotion'
// import MainHeader from '../components/LayoutComponents/MainHeader'
import { Information } from '../components/LayoutComponents'
import { GoCalendar, GoPerson } from 'react-icons/go'
import { GiMusicalNotes } from 'react-icons/gi'
import { IoIosImages } from 'react-icons/io'

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

const fontBold = css`
  font-weight: 700;
`

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => darken(0.25, props.theme.tint.black)};
  margin-top: 1rem;
  margin-bottom: 1rem;
`

class Podcast extends React.Component {
  render() {
    const post = this.props.data.prismicPodcast
    console.log('POST', post)
    return (
      <Layout>
        <div className="post-container">
          <Helmet title={`${post.data.title.text} | ${config.siteTitle}`} />
          <SEO
            location={this.props.location}
            postSEO
            imageSrc={
              post.data
                ? post.data.image.localFile.childImageSharp.fluid.src
                : null
            }
            title={post.data ? post.data.title.text : null}
            description={post.data ? post.data.text.text.slice(0, 200) : null}
          />
          <Wrapper>
            <Hero>
              <h1>{post.data.title.text}</h1>
              <Information>
                <span className="element">
                  <span className="subElement">
                    <GoCalendar size={20} />
                    <h4>{post.data.date}</h4>
                  </span>
                </span>
              </Information>
            </Hero>
            <Img fluid={post.data.image.localFile.childImageSharp.fluid} />
          </Wrapper>
          {/* <MainHeader title={post.data.title.text} /> */}
          <Container type="article">
            <Content input={post.data.text.html} />
            <Line />
            {/* <Tags tags={post.tags} /> */}
            <Flex flexDirection={['column', 'row']} alignItems="center">
              <Box>
                <span className={fontBold}>Ти се допадна?</span> Сподели со
                твоите пријатели
              </Box>
              <Box>
                <Twitter
                  message={post.data.title.text}
                  link={this.props.location.href}
                />
                <Facebook link={this.props.location.href} />
                {/* <Link to={`/categories/${kebabCase(post.category)}`}>{post.category}</Link> */}
              </Box>
            </Flex>
          </Container>
          <Footer>
            {/* <h2>Lust auf mehr Tutorials & Goodies? Werde ein Patron.</h2>
            <a
              href="https://www.patreon.com/lekoarts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="secondary">Patreon</Button>
            </a> */}
          </Footer>
        </div>
      </Layout>
    )
  }
}

export default Podcast

Podcast.propTypes = {
  // pageContext: PropTypes.shape({
  //   slug: PropTypes.string.isRequired,
  // }),
  data: PropTypes.shape({
    prismicPodcast: PropTypes.object.isRequired,
  }),
}

/* eslint no-undef: "off" */
export const PodcastQuery = graphql`
  query SinglePodcast($uid: String!) {
    prismicPodcast(uid: { eq: $uid }) {
      uid
      data {
        date
        title {
          html
          text
        }
        text {
          html
          text
        }
        image {
          url
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 1400
                quality: 85
                traceSVG: { color: "#52555e" }
                duotone: {
                  highlight: "#262c41"
                  shadow: "#46507a"
                  opacity: 45
                }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        link {
          url
        }
      }
    }
  }
`
