import React from 'react'
import styled from 'styled-components'
import Headroom from 'react-headroom'
// import { LocalizedLink } from 'elements'
// import { LocaleConsumer } from 'elements/Layout'
import Logo from '../icons/Logo'
import { Link } from 'gatsby'
import NavigationFirebase from './NavigationFirebase'
import { TiEquals } from 'react-icons/ti'
// import { Dropdown, Box } from '@primer/components'

const Wrapper = styled.div`
  @media (max-width: 500px) {
    .headroom {
      padding-left: 0.75rem;
    }
  }
`

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
  svg {
    height: 2.5rem;
    margin-bottom: 0;
    width: 2.5rem;
  }
  @media (max-width: 500px) {
    svg {
      height: 2.5rem;
      width: 2.5rem;
    }
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
  a,
  .dropbtn {
    color: ${props => props.theme.colors.white.base};
    margin-left: 2rem;
    @media (max-width: 340px) {
      margin-left: 1.4rem;
    }
    transition: all 0.4s;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid white;
      color: white;
    }
    &:focus {
      color: white;
    }
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropbtn {
    background-color: transparent;
    border: none;
    outline: none;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 130px;
    right: 0;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    margin-left: 0;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #ddd;
  }

  /* Show the dropdown menu on click */
  .dropdown:hover .dropdown-content {
    display: block;
  }
`

// const NavMenu = () => (
//   <div>
//     <Headroom calcHeightOnResize disableInlineStyles>
//       <StyledLink to="/">
//         <LogoText>сектор</LogoText>
//         <Logo />
//       </StyledLink>
//       <Nav>
//         <Link to="/program" activeClassName="active">
//           Програма
//         </Link>
//         <Link to="/blog" activeClassName="active">
//           Блог
//         </Link>
//         <Link to="/kontakt" activeClassName="active">
//           Контакт
//         </Link>
//         <span>
//           <TiEquals size={22} />
//         </span>
//       </Nav>
//     </Headroom>
//   </div>
// )
const INITIAL_STATE = {
  dropdown: false,
}
class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.onDropdown = this.onDropdown.bind(this)
  }
  onDropdown() {
    console.log('Dropdown clicked!')
    this.setState({ dropdown: !this.state.dropdown })
  }
  render() {
    return (
      <Wrapper>
        <Headroom calcHeightOnResize disableInlineStyles>
          <StyledLink to="/">
            <LogoText>сектор</LogoText>
            <Logo />
          </StyledLink>
          <Nav>
            <Link to="/nastani" activeClassName="active">
              Настани
            </Link>
            <Link to="/blog" activeClassName="active">
              Блог
            </Link>
            <Link to="/kontakt" activeClassName="active">
              Контакт
            </Link>
            <div className="dropdown">
              <button className="dropbtn">
                <TiEquals />
              </button>
              <div className="dropdown-content">
                {/* <NavigationFirebase /> */}
                <Link to="/djs" activeClassName="active">
                  Диџеи
                </Link>
              </div>
            </div>
          </Nav>
        </Headroom>
      </Wrapper>
    )
  }
}

export default Navigation
