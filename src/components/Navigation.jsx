import React from 'react'
import styled from 'styled-components'
import Headroom from 'react-headroom'
// import { LocalizedLink } from 'elements'
// import { LocaleConsumer } from 'elements/Layout'
import Logo from '../icons/Logo'
import { Link } from 'gatsby'

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
  svg {
    height: 2.5rem;
    margin-bottom: 0;
    width: 2.5rem;
  }
`

const LogoText = styled.span`
  text-transform: uppercase;
  font-family: ${props => props.theme.fontFamily.heading};
  font-size: 1.25rem;
  margin-right: 0.75rem;
  color: ${props => props.theme.colors.white.base};
  @media (max-width: 500px) {
    display: none;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-family: ${props => props.theme.fontFamily.heading};
  align-items: center;
  a {
    color: ${props => props.theme.colors.white.base};
    margin-left: 2rem;
    transition: all 0.4s;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid white;
      color: white;
    }
    &:focus {
      color: white;
    }
  }
`

const Navigation = () => (
  <div>
    <Headroom calcHeightOnResize disableInlineStyles>
      <StyledLink to="/">
        <LogoText>сектор</LogoText>
        <Logo />
      </StyledLink>
      <Nav>
        <Link to="/program" activeClassName="active">
          Програма
        </Link>
        <Link to="/blog" activeClassName="active">
          Блог
        </Link>
        <Link to="/kontakt" activeClassName="active">
          Контакт
        </Link>
      </Nav>
    </Headroom>
  </div>
)

export default Navigation
