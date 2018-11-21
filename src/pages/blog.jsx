import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../../config/website'
import ItemBlog from '../components/ItemBlog'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Container from '../components/Container'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const Base = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
`

const Blog = ({
  data: {
    allPrismicBlog: { edges: posts },
  },
}) => (
  <Layout>
    <div className="container blog-container">
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <Header slim subtitle="Новости и информации">
        Блог
      </Header>
      <Container type="big">
        <Base>
          {posts.map(post => (
            <ItemBlog
              key={post.node.data.title.text}
              cover={post.node.data.image.localFile.childImageSharp.fluid}
              date={post.node.data.date}
              path={`${post.node.uid}`}
              title={post.node.data.title.text}
              text={post.node.data.text.text}
              author={post.node.data.author.document[0].data.name}
            />
          ))}
        </Base>
      </Container>
      <Footer />
    </div>
  </Layout>
)

export default Blog

Blog.propTypes = {
  data: PropTypes.shape({
    allStrapiBlog: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }),
}

/* eslint no-undef: "off" */
export const blogQuery = graphql`
  query AllPrismicBlog {
    allPrismicBlog {
      edges {
        node {
          id
          uid
          slugs
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
            author {
              document {
                data {
                  name
                }
              }
            }
            image {
              localFile {
                childImageSharp {
                  fluid(
                    maxWidth: 900
                    quality: 85
                    traceSVG: { color: "#2B2B2F" }
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            gallery {
              image1 {
                localFile {
                  childImageSharp {
                    fluid(
                      maxWidth: 900
                      quality: 85
                      traceSVG: { color: "#2B2B2F" }
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
  }
`
