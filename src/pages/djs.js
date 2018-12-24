import React from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import Img from 'gatsby-image'
import Footer from '../components/Footer'
// import Wave from '../components/Wave'
import Container from '../components/Container'
import { Card, Heading, Text } from 'rebass'
import { Box, Flex } from '@rebass/grid/emotion'
import theme from '../../config/theme'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import MainLayout from '../layouts'
import SEO from '../components/SEO'
import Helmet from 'react-helmet'
import config from '../../config/website'
import MainHeader from '../components/LayoutComponents/MainHeader'

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
const DescriptionText = styled.p`
  text-align: center;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  max-width: 850px;
  margin: 3rem auto;
  // text-shadow: ${props => props.theme.shadow.text.big};
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
// const Image = styled.div`
//   .gatsby-image {
//     max-width: 100%;
//     height: auto;
//     margin: 0px;
//   }
// `

const PlainLink = styled(Link)`
  // color: ${theme.colors.black.base};
`

const Djs = ({
  data: {
    allPrismicDj: { edges: djs },
  },
}) => (
  <MainLayout>
    <Layout>
      <Helmet title={`Sektor DJs | ${config.siteTitle}`} />
      <SEO title={'Sektor DJs'} />
      <div>
        {/* <Wrapper>
          <Hero>
            <h1>#Resident DJs</h1>
          </Hero>
          <Wave />
          <Img fluid={file.childImageSharp.fluid} />
        </Wrapper> */}
        <MainHeader title="#Resident DJs" />

        <Container>
          <DescriptionText>Sektor DJs</DescriptionText>
          <Flex flexDirection={['column', 'row']}>
            {djs.map(dj => (
              <Box key={dj.node.id} m={2} width={[1, 1, 1 / 2, 1 / 3]}>
                <Card
                  m={1}
                  p={1}
                  borderRadius={2}
                  boxShadow={theme.shadow.feature.small.default}
                >
                  <PlainLink to={`djs/${dj.node.uid}`}>
                    <Img
                      className="gatsby-image"
                      fixed={
                        dj.node.data.avatar.localFile.childImageSharp.fixed
                      }
                    />
                  </PlainLink>
                  <Box width={256} m={2} px={2} pl={0} ml={0}>
                    <PlainLink to={`djs/${dj.node.uid}`}>
                      <Heading className="title" as="h3">
                        {dj.node.data.name}
                      </Heading>
                    </PlainLink>
                    {/* <Text fontSize={0}>{dj.node.data.punchline}</Text> */}
                  </Box>
                </Card>
              </Box>
            ))}
          </Flex>
        </Container>
        <Footer />
      </div>
    </Layout>
  </MainLayout>
)

export default Djs

export const djsQuery = graphql`
  query DjsQuery {
    allPrismicDj {
      edges {
        node {
          id
          uid
          data {
            name
            # punchline
            bio {
              html
              text
            }
            avatar {
              url

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
          }
        }
      }
    }
  }
`
