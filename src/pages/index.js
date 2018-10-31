/* eslint max-len: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Header from '../components/Header'
import config from '../../config/website'
import theme from '../../config/theme'
import styled from 'react-emotion'
import Button from '../components/Button'
import Container from '../components/Container'
import FeaturedPost from '../components/FeaturedPost'
import Footer from '../components/Footer'

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
    allPrismicPrograma: { edges: events },
  },
}) => (
  <div>
    <Header slim subtitle="Зимски и летен диско клуб во Скопје, Македонија">
      #OURGOALISTHEFUTURE
    </Header>
    <Container>
      <Text>Тековна програма</Text>
      <PostsWrapper>
        {events.map(post => (
          <FeaturedPost
            key={post.node.id}
            cover={post.node.data.photo.localFile.childImageSharp.sizes}
            from={post.node.data.from}
            to={post.node.data.to}
            path={post.node.slugs[0]}
            naslov={post.node.data.naslov.text}
            sreda={post.node.sreda}
            cetvrtok={post.node.cetvrtok}
            petok={post.node.petok}
            sabota={post.node.sabota}
            fblink={post.node.fblink}
          />
        ))}
      </PostsWrapper>
      <Text>
        Сите настани <br />
        <Link to="/nedelna-programa">
          <Button type="secondary">Програма</Button>
        </Link>
      </Text>
    </Container>
    <Footer />
  </div>
)

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allPrismicPrograma(limit: 2, sort: { fields: [data___from], order: DESC }) {
      edges {
        node {
          id
          slugs
          data {
            from
            to
            photo {
              url
              localFile {
                childImageSharp {
                  sizes(
                    maxWidth: 1400
                    quality: 85
                    traceSVG: { color: "#2B2B2F" }
                  ) {
                    ...GatsbyImageSharpSizes_withWebp_tracedSVG
                  }
                }
              }
            }
            naslov {
              html
              text
            }
            description {
              html
              text
            }
          }
        }
      }
    }
  }
`
