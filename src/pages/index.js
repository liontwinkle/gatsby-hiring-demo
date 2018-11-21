/* eslint max-len: 0 */

import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Button from '../components/Button'
import Container from '../components/Container'
import EventInfo from '../components/EventInfo'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import MainHeader from '../components/LayoutComponents/MainHeader'

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
    allPrismicNastan: { edges: nastani },
  },
}) => (
  <Layout>
    <div>
      <MainHeader />
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
