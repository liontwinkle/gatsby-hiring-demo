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
import { Box } from '@rebass/grid/emotion'
import { CardWrapper } from '../components/LayoutComponents/Index'
import { MdAlarm } from 'react-icons/md'
import { TiGift, TiNotesOutline, TiLockClosedOutline } from 'react-icons/ti'
import SignInForm from '../components/SignIn'
import AuthUserContext from '../components/Session/AuthUserContext'
import WithAuthentication from '../components/Session/withAuthentication'

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

const InfoTextBox = styled(CardWrapper)`
  height: 250px;
  margin-bottom: 1rem;
  svg {
    margin-right: 0.5rem;
  }
  font-size: 23px;
  div {
    margin: 1rem;
    }
  }
  @media (max-width: 1000px) {
    height: 12rem;
    font-size: 22px;
    div {
      margin: 1rem;
    }
  }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 14rem;
    font-size: 20px;
    div {
      margin: 1rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 17rem;
    font-size: 20px;
    div {
      margin: 1rem;
    }
  }
`

const SignInEl = pathname => (
  <div>
    <PostsWrapper>
      <Text>Најави се со Фејсбук</Text>
      <InfoTextBox>
        <Box m={4}>
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
    file,
    allPrismicNastan: { edges: nastani },
  },
  location: { pathname },
}) => {
  console.log('FILE ', file)
  const WelcomeMessage = ({ username }) => (
    <InfoTextBox>
      <Text>Здраво, {username}</Text>
      Разгледај ја тековната програма, прочитај ги последните блогови, слушај
      добра музика и провери ја корисничката зона.
    </InfoTextBox>
  )
  return (
    <Layout>
      <div>
        <MainHeader file={file} />
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
}

export default WithAuthentication(Index)

export const pageQuery = graphql`
  query IndexQuery {
    file(relativePath: { eq: "sektor_2.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 800
          quality: 75
          duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
        ) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
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
