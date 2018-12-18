import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import styled from 'styled-components'
// import Wave from './Wave'
import Container from './Container'

const Wrapper = styled.footer`
  position: relative;
  padding-top: 10rem;
  padding-bottom: 2rem;
  margin-top: 3rem;
  background: ${props => props.theme.gradient.leftToRight};
  font-family: ${props => props.theme.fontFamily.heading};
`

const OptionalContent = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  h1,
  h2 {
    color: ${props => props.theme.colors.white.light};
    text-align: center;
    margin: 0 auto;
    display: block;
  }
`

const Content = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${props => props.theme.colors.white.blue};
  a {
    color: ${props => props.theme.colors.white.blue};
    &:hover {
      color: ${props => props.theme.colors.primary.base};
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  text-shadow: ${props => props.theme.shadow.text.small};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
    a {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`

const Important = styled(Item)`
  font-size: 1.2rem;
  a {
    color: ${props => props.theme.colors.white.base};
    &:hover {
      color: ${props => props.theme.colors.primary.base};
    }
  }
`

const Copyright = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: ${props => props.theme.colors.white.blue};
`

const Footer = ({ children }) => {
  const date = format(new Date(), 'YYYY')
  return (
    <Wrapper>
      {/* <Wave orientation="top" /> */}
      <Container className="footer-container" type="base">
        <OptionalContent>{children}</OptionalContent>
        <Content>
          <Important>
            <Link to="/label">Лејбл</Link>
            <Link to="/djs">Диџеи</Link>
            <Link to="/podcast">Подкаст</Link>
          </Important>
          <Item>
            <a
              href="https://www.facebook.com/sektor909"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.mixcloud.com/sektor909/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mixcloud
            </a>
            <a
              href="https://www.twitter.com/sektor909"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/sektor909"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </Item>
        </Content>
        <Copyright>{`Copyright © ${date}. Сектор909, Скопје, Македонија. Сите права се задржани.`}</Copyright>
      </Container>
    </Wrapper>
  )
}

export default Footer

Footer.propTypes = {
  children: PropTypes.node,
}
