import React from 'react'
import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
// import { Link } from 'gatsby'
// import kebabCase from 'lodash/kebabCase'
import { darken } from 'polished'
// import Tags from '../components/Tags';
// import SEO from '../components/SEO'
import Container from '../components/Container'
import Content from '../components/Content'
import Wave from '../components/Wave'
// import Button from '../components/Button'
import Footer from '../components/Footer'
// import { hideS } from '../utils/hide'
import config from '../../config/website'
// import { Card } from '../components/Card'
import { GoCalendar, GoLocation, GoLinkExternal } from 'react-icons/go'
import Layout from '../components/Layout'
// import { Box } from '@rebass/grid/emotion'
const dj = require('../icons/dj.svg')

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

const Information = styled.div`
  margin-top: 2rem;
  font-family: ${props => props.theme.fontFamily.heading};
  a.fblink {
    white-space: nowrap;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.white.base};
    transition: all 0.4s;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid white;
      color: white;
    }
    &:focus {
      color: white;
    }
  }
  .date {
    svg {
      margin-right: 0.5rem;
    }
  }
  div.location {
    white-space: nowrap;
    @media (min-width: 500px) {
      display: inline;
    }
    h3,
    h4 {
      display: inline;
    }
  }
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
// const CardWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   margin-bottom: 3rem;
//   ${Card} {
//     color: ${props => props.theme.colors.black.base} !important;
//     margin-bottom: 2rem;
//     text-align: center;
//     flex-basis: calc(99.9% * 1 / 2.15 - 1rem);
//     max-width: calc(99.9% * 1 / 2.15 - 1rem);
//     width: calc(99.9% * 1 / 2.15 - 1rem);
//     @media (max-width: 750px) {
//       flex-basis: 100%;
//       max-width: 100%;
//       width: 100%;
//       margin-bottom: 1.5rem;
//     }
//   }
// `

const Card = styled.div`
  background-color: ${props => props.theme.colors.white.base};
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
  img {
    height: 4rem;
    fill: ${props => props.theme.colors.black.blue};
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

// const Card = styled.div`
//   ${generalStyle};
// `

const Post = ({ pageContext: { uid }, data: { prismicNastan: post } }) => {
  //   const { sizes } = post.cover.childImageSharp;
  if (!post.id) {
    post.id = uid
  }
  console.log(post.data.photo.url)

  return (
    <Layout>
      <div className="post-container">
        <Helmet title={`Програма | ${config.siteTitle}`} />
        {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
        <Wrapper>
          <Hero>
            <h1>{post.data.naslov.text}</h1>
            <Information>
              <span className="date">
                <GoCalendar size={20} /> {post.data.date}
              </span>
              <a
                rel="noopener noreferrer"
                className="fblink"
                target="_blank"
                href={post.data.facebook_event.url}
              >
                <GoLinkExternal size={20} /> Facebook Event
              </a>
              <div className="location">
                <GoLocation size={20} />
                <h4>{` ${post.data.location.text}`}</h4>
              </div>
            </Information>
          </Hero>
          <Wave />
          <Img fluid={post.data.photo.localFile.childImageSharp.fluid} />
        </Wrapper>
        <Container type="article">
          <Card>
            <h2>
              <img alt="" src={dj} />
              Line Up:
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.data.lineup.html }} />
          </Card>
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
                duotone: {
                  highlight: "#262c41"
                  shadow: "#46507a"
                  opacity: 78
                }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
              resolutions(width: 140, height: 140) {
                src
              }
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
