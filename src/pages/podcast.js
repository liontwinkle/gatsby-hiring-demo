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

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
`

const Podcast = ({ location }) => (
  <Layout>
    <div className="podcast-container">
      <Helmet title={`Подкаст | ${config.siteTitle}`} />
      <SEO
        location={location}
        imageSrc={config.siteBanner}
        title="Миксови снимени за Сектор909"
        description="Авторски миксови ексклузивно снимени за Сектор909"
        postSEO
      />
      <MainHeader slim title="Подкаст" subtitle="Серијал на миксови" />
      <Wrapper>
        <Container type="article">
          <h3>Сектор909 Подкаст</h3>
          <p>Наскоро...</p>
        </Container>
      </Wrapper>
      <Footer />
    </div>
  </Layout>
)

export default Podcast
