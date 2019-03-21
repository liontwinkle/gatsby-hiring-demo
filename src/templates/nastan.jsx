import React from 'react'
import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { css } from 'react-emotion'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
// import { Link } from 'gatsby'
// import kebabCase from 'lodash/kebabCase'
import { darken } from 'polished'
// import Tags from '../components/Tags';
import SEO from '../components/SEO'
import Container from '../components/Container'
import Content from '../components/Content'
import Wave from '../components/Wave'
// import Button from '../components/Button'
import Footer from '../components/Footer'
// import { hideS } from '../utils/hide'
import config from '../../config/website'
// import { Card } from '../components/Card'
import {
  GoCalendar,
  GoLocation,
  GoLinkExternal,
  GoSettings,
  GoClock,
} from 'react-icons/go'
import { GiMoneyStack } from 'react-icons/gi'
import Layout from '../components/Layout'
import { Twitter, Facebook } from 'react-social-sharing'
import { Flex, Box } from '@rebass/grid/emotion'
// const dj = require('../icons/dj.svg')
import { Information } from '../components/LayoutComponents'

const moveUp = css`
  transform: translateY(-5%);
`

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

const Card = styled.div`
  // background-color: ${props => props.theme.colors.white.base};
  transform:translateY(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  color: ${props => props.theme.colors.black.base};
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  position: relative;
  transition: background-color
    ${props => props.theme.transitions.default.duration};
  svg {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
    border-radius: ${props => props.theme.borderRadius.default};
    background-color: ${props => props.theme.colors.white.light};
  }
`

const Post = ({
  pageContext: { uid },
  data: { prismicNastan: post },
  location,
}) => {
  //   const { sizes } = post.cover.childImageSharp;
  if (!post.id) {
    post.id = uid
  }
  const title = post.data.naslov.text
  const description = post.data.info.text.slice(0, 200)
  const image = post.data.photo.localFile.childImageSharp.fluid.src
  return (
    <Layout>
      <div className="post-container">
        <Helmet title={`Програм | ${config.siteTitle}`} />
        <SEO
          location={location}
          imageSrc={image}
          title={title}
          description={description}
          postSEO
        />
        <Wrapper>
          <Hero>
            <h1>{title}</h1>
            <Information>
              <span className="element">
                <span className="subElement">
                  <GoCalendar size={20} />
                  <h4>{post.data.date}</h4>
                </span>
              </span>
              <span className="element">
                <span className="subElement">
                  <GoClock size={20} />
                  <h4>{post.data.pocetok}</h4>
                </span>
              </span>
              <span className="element">
                <a
                  rel="noopener noreferrer"
                  className="fblink subElement"
                  target="_blank"
                  href={post.data.facebook_event.url}
                >
                  <GoLinkExternal size={20} />
                  <h4>Facebook Event</h4>
                </a>
              </span>
              <span className="element">
                <div className="location subElement">
                  <GoLocation size={20} />
                  <h4>{post.data.location.text}</h4>
                </div>
              </span>
              <span className="element">
                <div className="location subElement">
                  <GiMoneyStack size={20} />
                  <h4>{post.data.vlez}</h4>
                </div>
              </span>
            </Information>
          </Hero>
          <Img fluid={post.data.photo.localFile.childImageSharp.fluid} />
        </Wrapper>
        <Container type="article">
          <Card>
            <h2>
              <GoSettings size={34} />
              Line Up:
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.data.lineup.html }} />
          </Card>
          <div className={moveUp}>
            <Content input={post.data.info.html} />
            <Line />
            {/* <Tags tags={post.tags} /> */}
            <p>
              <span className={fontBold}>Повеќе: </span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={post.data.facebook_event.url}
              >
                Фејсбук Настан
              </a>
            </p>
            <Line />
            {/* <Tags tags={post.tags} /> */}
            <Flex flexDirection={['column', 'row']} alignItems="center">
              <Box>Сподели со твоите пријатели</Box>
              <Box>
                <Twitter message={title} link={location.href} />
                <Facebook link={location.href} />
                {/* <Link to={`/categories/${kebabCase(post.category)}`}>{post.category}</Link> */}
              </Box>
            </Flex>
          </div>
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

export default Post

// Post.propTypes = {
//   pageContext: PropTypes.shape({
//     slug: PropTypes.string.isRequired,
//   }),
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.object.isRequired,
//   }),
// }

/* eslint no-undef: "off" */
export const Nastan = graphql`
  query SingleEvent($uid: String!) {
    prismicNastan(uid: { eq: $uid }) {
      id
      uid
      data {
        vlez
        pocetok(formatString: "HH:mm")
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
              ) # traceSVG: { color: "#52555e" }
              # duotone: {
              #   highlight: "#262c41"
              #   shadow: "#46507a"
              #   opacity: 65
              # }
              {
                ...GatsbyImageSharpFluid_withWebp
              }
              # resolutions(width: 140, height: 140) {
              #   src
              # }
            }
          }
        }
        facebook_event {
          url
        }
      }
    }
  }
`
