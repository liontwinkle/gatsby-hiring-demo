import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import config from '../../config/website'
import ItemBlog from '../components/ItemBlog'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Container from '../components/Container'

const Base = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
`

const Blog = ({
  data: {
    allStrapiBlog: { edges: posts },
  },
}) => (
  <div className="container blog-container">
    <Helmet title={`Blog | ${config.siteTitle}`} />
    <Header
      slim
      subtitle="Новости и информации"
    >
      Блог
    </Header>
    <Container type="big">
      <Base>
        {posts.map(post => (
          <ItemBlog
            key={post.node.title}
            cover={post.node.header_image}
            date={post.node.date}
            path={`blog/${post.node.path}`}
            title={post.node.title}
            text={post.node.text}
            images={post.node.images}
            author={post.node.author}
          />
        ))}
      </Base>
    </Container>
    <Footer />
  </div>
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
  query StrapiBlog {
    allStrapiBlog {
      edges {
        node {
          id
          title
          text
          date(formatString: "MMMM DD, YYYY")
          path
          author {
            username
            provider
          }
          images {
            id
            url
          }
          header_image {
            id
            url
            size
          }
        }
      }
    }
  }
`
