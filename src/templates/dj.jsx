import React from 'react'
import styled from 'styled-components'
import { keyframes, css } from 'react-emotion'
import Img from 'gatsby-image'
import Footer from '../components/Footer'
// import Wave from '../components/Wave'
import { Card, Heading, Text } from 'rebass'
// import { Flex } from '@rebass/grid'
import { Box, Flex } from '@rebass/grid/emotion'
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
    max-width: 100%;
    height: auto;
    margin: 0px;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      max-width: 200px;
      height: auto;
      margin: 0px;
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      max-width: 100%;
      height: auto;
      margin: 0px;
    }
  }
`
const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => darken(0.25, props.theme.tint.black)};
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const moveUpBig = css`
  transform: translateY(-35%);
`
const moveUpSmall = css`
  @media (max-width: 500px) {
    transform: translateY(-15%);
  }
`

const centerEl = css`
  background-color: blue;
`

const Dj = ({ data: { prismicDj: dj }, location }) => (
  <Layout>
    <div>
      <Wrapper>
        <Hero>{/* <h1>{dj.data.name}</h1> */}</Hero>
        {/* <Wave /> */}
        <Img fluid={dj.data.background_image.localFile.childImageSharp.fluid} />
      </Wrapper>
      <Flex
        flexDirection={['column', 'row']}
        flexWrap="nowrap"
        justifyContent="center"
      >
        <Box width={[1, 1 / 4]}>
          <Flex px={2} flexDirection={'row'} justifyContent="center">
            <Box className="dj-card" mr={[0, 0, 4]}>
              <Card className={moveUpBig}>
                <Flex px={2} flexDirection="column" alignItems="center">
                  <Image>
                    <Img
                      className="gatsby-image"
                      fixed={dj.data.avatar.localFile.childImageSharp.fixed}
                    />
                  </Image>
                  <Box my={3}>
                    <Heading as="h3">{dj.data.name}</Heading>
                    {/* <Text fontSize={0}>{dj.data.punchline}</Text> */}
                    <Line />
                    <Box my={3}>
                      <Flex>
                        {dj.data.facebook && (
                          <Box mr={2}>
                            <SocialLink
                              type="fb"
                              link={dj.data.facebook.url}
                              size={25}
                            />
                          </Box>
                        )}
                        {dj.data.twitter && (
                          <Box mx={2}>
                            <SocialLink
                              type="tw"
                              link={dj.data.twitter.url}
                              size={25}
                            />
                          </Box>
                        )}
                        {dj.data.soundcloud && (
                          <Box mx={2}>
                            <SocialLink
                              type="sc"
                              link={dj.data.soundcloud.url}
                              size={25}
                            />
                          </Box>
                        )}
                        {dj.data.mixcloud && (
                          <Box mx={2}>
                            <SocialLink
                              type="mc"
                              link={dj.data.mixcloud.url}
                              size={25}
                            />
                          </Box>
                        )}

                        {dj.data.instagram && (
                          <Box mx={2}>
                            <SocialLink
                              type="in"
                              link={dj.data.instagram.url}
                              size={25}
                            />
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </Flex>
        </Box>
        <Box className={moveUpSmall} width={[1, 0.7]}>
          <DjContent location={location} dj={dj} />
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
          html
        }
        # punchline
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
              fixed(
                width: 250
                height: 250
                grayscale: true
                quality: 70
                traceSVG: { color: "#52555e" }
              ) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
        }
        background_image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 1600
                quality: 90
                traceSVG: { color: "#52555e" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        charts {
          chart {
            id
            uid
            document {
              id
              data {
                title
                image {
                  alt
                  copyright
                  url
                }
                chart {
                  artist
                  track
                  album
                  label
                  link {
                    url
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
