/* eslint max-len: 0 */

import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Button from '../components/Button'
import Container from '../components/Container'
import EventInfo from '../components/EventInfo'
import BlogInfo from '../components/BlogInfo'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import MainHeader from '../components/LayoutComponents/MainHeader'
import { Box } from '@rebass/grid/emotion'
import { CardWrapper } from '../components/LayoutComponents'
import { MdAlarm } from 'react-icons/md'
import { TiGift, TiNotesOutline, TiLockClosedOutline } from 'react-icons/ti'
import SignInForm from '../components/SignIn'
import AuthUserContext from '../components/Session/AuthUserContext'
import WithAuthentication from '../components/Session/withAuthentication'
// import MainLayout from '../layouts'
import SEO from '../components/SEO'
import Helmet from 'react-helmet'
import config from '../../config/website'

const EXCERPT_LENGTH = 250

const CenteredHeading = styled.div`
  h1,
  h2,
  h3,
  h4 {
    text-align: center;
    font-family: ${props => props.theme.fontFamily.heading};
    font-weight: 700;
    max-width: 850px;
    margin: 3rem auto;
  }
  width: 100%;
`

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
  font-size: 1.5rem;
  line-height: 2.5rem;
  max-width: 850px;
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 4rem;
`

const InfoTextBox = styled(CardWrapper)`
  height: 200px;
  margin-bottom: 1rem;
  svg {
    margin-right: 0.5rem;
  }
  font-size: 23px;
  .content {
    margin: 0 auto;
    // margin: 1rem;
    width: 350px;
  }
  @media (max-width: 1000px) {
    height: 12rem;
    font-size: 22px;
    .content {
      // margin: 1rem;
      margin: 1 auto;
      width: 300px;
    }
  }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 10rem;
    font-size: 20px;
    .content {
      // margin: 1rem;
      margin: 1 auto;
      width: 300px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: ${props => (props.size === 'l' ? '400px' : '180px')};
    font-size: 18px;
    .content {
      // margin: 0.5rem;
      margin: 0.5 auto;
      width: 250px;
    }
  }
`

const SignInEl = pathname => (
  <div>
    <PostsWrapper>
      <CenteredHeading>
        <h1>Најави се со Фејсбук</h1>
      </CenteredHeading>
      <InfoTextBox>
        <Box className="content">
          <h4>Пристап до</h4>

          <span className="info-text">
            <MdAlarm size={22} />
            Најнови информации
          </span>
          <br />
          <span>
            <TiLockClosedOutline size={22} />
            Приватни Настани
          </span>
          <br />

          <span>
            <TiNotesOutline size={22} />
            Ексклузивна содржина
          </span>
          <br />
          <TiGift size={22} />
          <span>Посебни понуди</span>
        </Box>
      </InfoTextBox>
    </PostsWrapper>
    <Text>
      <AuthUserContext.Consumer>
        {authUser => (
          <SignInForm path={pathname} authUser={authUser} type="primary" />
        )}
      </AuthUserContext.Consumer>
    </Text>
  </div>
)
const Index = ({
  data: {
    allPrismicNastan: { edges: nastani },
    allPrismicBlog: { edges: blogs },
  },
  location: { pathname },
}) => {
  const WelcomeMessage = ({ username }) => (
    <InfoTextBox size="l">
      <Text>Здраво, {username}</Text>
      Разгледај ја тековната програма, прочитај ги последните блогови, слушај
      добра музика и провери ја корисничката зона.
    </InfoTextBox>
  )
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const upcomingNastani = nastani.filter(
    nastan => new Date(nastan.node.data.date) >= yesterday
  )
  console.log('UPCOMING: ', upcomingNastani)
  return (
    // <MainLayout>
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
      <SEO
        location={pathname}
        imageSrc={config.siteBanner}
        description={config.siteDescription}
        postSEO
      />
      <div>
        <MainHeader title="#OURGOALISTHEFUTURE" />
        <Container>
          <CenteredHeading>
            <h1>Тековна програма</h1>
          </CenteredHeading>
          <PostsWrapper>
            {upcomingNastani.reverse().map(post => (
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
                vlez={post.node.data.vlez}
                pocetok={post.node.data.pocetok}
              />
            ))}
          </PostsWrapper>
          <Text>
            Сите настани <br />
            <Link to="/nastani">
              <Button background="magenta" size="large" type="secondary">
                Настани
              </Button>
            </Link>
          </Text>
        </Container>
        <Container>
          <CenteredHeading>
            <h1>Најнови Постови</h1>
          </CenteredHeading>
          <PostsWrapper>
            {blogs.map(post => {
              const hasGallery = post.node.data.gallery[0].image1.localFile
                ? true
                : false
              const hasPlaylist = post.node.data.body ? true : false
              return (
                <BlogInfo
                  key={post.node.uid}
                  title={post.node.data.title.text}
                  path={post.node.uid}
                  date={post.node.data.date}
                  author={post.node.data.author.document[0].data.name}
                  hasGallery={hasGallery}
                  hasPlaylist={hasPlaylist}
                  excerpt={post.node.data.text.text.substring(
                    0,
                    EXCERPT_LENGTH
                  )}
                  image={post.node.data.image.localFile}
                  // vlez={post.node.data.vlez}
                  // pocetok={post.node.data.pocetok}
                />
              )
            })}
          </PostsWrapper>
          <Text>
            Сите постови <br />
            <Link to="/blog">
              <Button background="magenta" size="large" type="secondary">
                Блог
              </Button>
            </Link>
          </Text>
        </Container>
        <Container>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? (
                <WelcomeMessage username={authUser.displayName} />
              ) : (
                <SignInEl pathname={pathname} authUser={authUser} />
              )
            }
          </AuthUserContext.Consumer>
        </Container>
        <Footer />
      </div>
    </Layout>
    // </MainLayout>
  )
}

export default WithAuthentication(Index)

export const pageQuery = graphql`
  query IndexQuery {
    allPrismicNastan(sort: { order: DESC, fields: [data___date] }, limit: 4) {
      edges {
        node {
          id
          uid
          data {
            vlez
            pocetok(formatString: "HH:mm")
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
    allPrismicBlog(sort: { order: DESC, fields: [data___date] }, limit: 4) {
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
