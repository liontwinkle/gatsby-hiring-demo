import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import config from '../../config/website'
import NastanPost from '../components/NastanPost'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Container from '../components/Container'

const Base = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
`

const Nastan = ({
    data: {
      allStrapiPrograma: { edges: events },
    },
  }) => (
  <div className="container blog-container">
    <Helmet title={`Nastani | ${config.siteTitle}`} />
    <Header
      slim
      subtitle="Идни и Претходни Настани во Клуб Сектор909"
    >
      Настани
    </Header>
    <Container type="big">
      <Base>
        {events.map(post => (
          <NastanPost
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
      </Base>
    </Container>
    <Footer />
  </div>
)

export default Nastan

Nastan.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }),
}

/* eslint no-undef: "off" */
export const EventsQuery = graphql`
  query EventsQuery {
    allStrapiPrograma(limit: 2, sort: { fields: [from], order: DESC }) {
      edges {
        node {
          from(formatString: "MMMM DD, YYYY")
          to(formatString: "MMMM DD, YYYY")
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
