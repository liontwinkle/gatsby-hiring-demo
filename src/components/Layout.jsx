/* eslint no-unused-expressions: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../config/theme'
import Navigation from './Navigation'
import SEO from './SEO'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { reset, headroom } from '../styles'
import { SkipNavLink } from '../elements'
import 'typeface-montserrat'
import 'typeface-istok-web'

const GlobalStyle = createGlobalStyle`
  ${reset}
  .gatsby-resp-image-wrapper {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-radius: ${theme.borderRadius.default};
    .gatsby-resp-image-background-image, .gatsby-resp-image-image {
      border-radius: ${theme.borderRadius.default};
    }
  }
  body {
    -webkit-tap-highlight-color: transparent;
  }
  .gatsby-resp-iframe-wrapper {
    margin-bottom: 2rem;
  }
  ${headroom}
`

const MainLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <SEO />
      <Navigation />
      {children}
    </React.Fragment>
  </ThemeProvider>
)

export default MainLayout

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
}
