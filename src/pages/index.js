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

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  // margin-top: 10rem;
`

const Text = styled.p`
  text-align: center;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  max-width: 850px;
  margin: 5rem auto;
  text-shadow: ${props => props.theme.shadow.text.big};
`

const Index = ({
  data: {
    allStrapiPrograma: { edges: events },
  },
}) => (
  <div>
    <Header>
      <img src={config.siteBanner} />
    </Header>
    <Container>
      <PostsWrapper>
        {events.map(post => (
          <FeaturedPost
            key={post.node.description}
            cover="social/sektor_2.png"
            from={post.node.from}
            to={post.node.to}
            path={post.node.path}
            description={post.node.description}
            sreda={post.node.sreda}
            cetvrtok={post.node.cetvrtok}
            petok={post.node.petok}
            sabota={post.node.sabota}
            fblink={post.node.fblink}
          />
        ))}
      </PostsWrapper>
      <Text>
        Дознај повеќе за идни и претходни настани во клубот Сектор909 <br />
        <Link to="/program">
          <Button type="secondary">Програма</Button>
        </Link>
      </Text>
    </Container>
  </div>
)

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiPrograma(limit: 2, sort: { fields: [from], order: DESC }) {
      edges {
        node {
          from (formatString: "MMMM DD, YYYY")
          to (formatString: "MMMM DD, YYYY")
          flyer {
            url
          }
          description
          sreda
          cetvrtok
          petok
          sabota
          path
          fblink
        }
      }
    }
  }
`
