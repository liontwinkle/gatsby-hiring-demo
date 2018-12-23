/* eslint max-len: 0 */

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Container from '../components/Container'
import config from '../../config/website'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import MainHeader from '../components/LayoutComponents/MainHeader'
import Paperplane from '../icons/Paperplane'
import Button from '../components/Button'

const CenteredContainer = styled(Container)`
  text-align: center;
  svg {
    fill: white;
  }
`

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
`

const Label = ({ location }) => (
  <Layout>
    <div className="label-container">
      <Helmet title={`Лејбл | ${config.siteTitle}`} />
      <SEO
        location={location}
        imageSrc={config.siteBanner}
        title="Сектор909 Лејбл"
        description="Издавачка куќа за модерна електронска клубска музика"
        postSEO
      />
      <MainHeader slim title="Лејбл" subtitle="Издавачка куќа" />
      <Wrapper>
        <Container type="article">
          <h3>Сектор909 Лејбл</h3>
          <p>
            Лејблот е во подготовка. Примаме промо изданија на доленаведениот
            емаил.
          </p>
        </Container>
        <CenteredContainer>
          <a href="mailto:contact@sektor.com">
            <Button type="primary">
              <Paperplane /> E-Mail
            </Button>
          </a>
        </CenteredContainer>
      </Wrapper>
      <Footer />
    </div>
  </Layout>
)

export default Label
