import React from 'react'
import styled, { keyframes } from 'styled-components'
import Img from 'gatsby-image'
import Footer from '../components/Footer'
import Wave from '../components/Wave'
import { Card, Heading, Text, Box } from 'rebass'
import { Flex } from '@rebass/grid'
// import { Box } from '@rebass/grid'
import { darken } from 'polished'
import SocialLink from '../components/SocialLink'
import DjContent from '../components/DjContent'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

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
const Image = styled.div`
  img {
    width: 100%;
    border-radius: 6px;
    max-width: 360px;
  }
`
const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => darken(0.25, props.theme.tint.black)};
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const Dj = ({ data: { prismicDj: dj, prismicChart: chart }, location }) => (
  <Layout>
    <div>
      <Wrapper>
        <Hero>
          <h1>{dj.data.name}</h1>
        </Hero>
        <Wave />
        <Img fluid={dj.data.background_image.localFile.childImageSharp.fluid} />
      </Wrapper>
      <Flex px={2} flexWrap="wrap">
        <Box mr={4} width={[1, 1 / 4]}>
          <Card>
            <Image>
              <Img
                className="gatsby-image"
                fluid={dj.data.avatar.localFile.childImageSharp.fluid}
              />
            </Image>
            <Box my={3}>
              <Heading as="h3">{dj.data.name}</Heading>
              <Text fontSize={0}>{dj.data.punchline}</Text>
              <Line />
              <Box my={3}>
                <Flex>
                  <Box mr={2}>
                    <SocialLink
                      type="fb"
                      link={dj.data.facebook.url}
                      size={25}
                    />
                  </Box>
                  <Box mx={2}>
                    <SocialLink
                      type="tw"
                      link={dj.data.twitter.url}
                      size={25}
                    />
                  </Box>
                  <Box mx={2}>
                    <SocialLink
                      type="sc"
                      link={dj.data.soundcloud.url}
                      size={25}
                    />
                  </Box>
                  <Box mx={2}>
                    <SocialLink
                      type="mc"
                      link={dj.data.mixcloud.url}
                      size={25}
                    />
                  </Box>

                  <Box mx={2}>
                    <SocialLink
                      type="in"
                      link={dj.data.instagram.url}
                      size={25}
                    />
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Card>
        </Box>
        <Box
          // style={{
          //   boxShadow: 'inset 0 0 0 2px',
          // }}
          width={[1, 0.7]}
          // p={2}
        >
          <DjContent location={location} dj={dj} chart={chart} />
        </Box>
      </Flex>
      <Footer />
    </div>
  </Layout>
)

export default Dj

export const DjQuery = graphql`
  query SingleDj($uid: String!) {
    prismicDj(uid: { eq: $uid }) {
      id
      uid
      data {
        name
        instagram {
          url
        }
        facebook {
          url
        }
        soundcloud {
          url
        }
        mixcloud {
          url
        }
        instagram {
          url
        }
        twitter {
          url
        }
        bio {
          text
        }
        punchline
        mixes {
          title
          link {
            url
          }
          tracklist {
            text
            html
          }
        }
        avatar {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 800
                quality: 70
                traceSVG: { color: "#52555e" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        background_image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 800
                quality: 70
                traceSVG: { color: "#52555e" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
    prismicChart(uid: { eq: "november-dj-chart" }) {
      id
      uid
      data {
        title
        dj {
          document {
            id
            uid
            data {
              name
            }
          }
        }
        image {
          url
        }
        chart {
          artist
          track
          label
          album
          link {
            url
          }
        }
      }
    }
  }
`
