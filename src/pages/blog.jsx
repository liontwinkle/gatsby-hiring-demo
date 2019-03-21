import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../../config/website'
import ItemBlog from '../components/ItemBlog'
import Footer from '../components/Footer'
// import Header from '../components/Header'
import Container from '../components/Container'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import MainHeader from '../components/LayoutComponents/MainHeader'

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
  location,
}) => (
  <Layout>
    <div className="container blog-container">
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <SEO
        location={location}
        imageSrc={config.siteBanner}
        title="Блог на Сектор909, новости од ноќниот живот, интервјуа, нова музика..."
        description="Новости и информации за ноќниот живот во Скопје, новитети во хаус, техно, диско и електронска музика."
        postSEO
      />
      <MainHeader
        slim
        title="Блог"
        subtitle="Новости и информации за ноќниот живот во Скопје, новитети во клубската музика."
      >
        Блог
      </MainHeader>
      <Container type="big">
        <Base>
          {posts.map(post => {
            const hasGallery = post.node.data.gallery[0].image1.localFile
              ? true
              : false
            const hasPlaylist = post.node.data.body ? true : false
            return (
              <ItemBlog
                key={post.node.data.title.text}
                cover={post.node.data.image.localFile.childImageSharp.fluid}
                date={post.node.data.date}
                path={`${post.node.uid}`}
                title={post.node.data.title.text}
                text={post.node.data.text.text.slice(0, 400)}
                author={post.node.data.author.document[0].data.name}
                gallery={hasGallery}
                playlist={hasPlaylist}
              />
            )
          })}
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
    allPrismicBlog(sort: { order: DESC, fields: [data___date] }) {
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
            body {
              ... on PrismicBlogBodyPlaylist {
                slice_type
                primary {
                  playlist_name {
                    text
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
