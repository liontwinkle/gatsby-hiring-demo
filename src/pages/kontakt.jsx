/* eslint max-len: 0 */

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Container from '../components/Container'
import { LinkCard } from '../components/Card'
import Header from '../components/Header'
import Button from '../components/Button'
import config from '../../config/website'
import Paperplane from '../icons/Paperplane'
import Twitter from '../icons/Twitter'
import Instagram from '../icons/Instagram'
import Facebook from '../icons/Facebook'
import Layout from '../components/Layout'
// import YouTube from '../icons/YouTube';
import SEO from '../components/SEO'

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

const MyLinkCard = styled(LinkCard)`
  flex-basis: calc(99% * 1 / 4 - 1rem);
  max-width: calc(99% * 1 / 4 - 1rem);
  width: calc(99% * 1 / 4 - 1rem);
  margin-bottom: 2rem;
  @media (max-width: 1135px) {
    flex-basis: calc(99% * 1 / 2 - 1rem);
    max-width: calc(99% * 1 / 2 - 1rem);
    width: calc(99% * 1 / 2 - 1rem);
  }
  @media (max-width: 690px) {
    flex-basis: calc(99% * 1 / 1);
    max-width: calc(99% * 1 / 1);
    width: calc(99% * 1 / 1);
  }
`

const CardContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 4rem;
`

const Kontakt = ({ location }) => (
  <Layout>
    <div className="kontakt-container">
      <Helmet title={`Kontakt | ${config.siteTitle}`} />
      <SEO
        location={location}
        imageSrc={config.siteBanner}
        title="Инфо за Клубот Сектор909, Сектор909 на социјалните мрежи, локација на клубот. "
        description="Новости и информации за ноќниот живот во Скопје, новитети во хаус, техно, диско и електронска музика."
        postSEO
      />
      <Header slim subtitle="Нешто повеќе за клубот Сектор909">
        Контакт
      </Header>
      <Wrapper>
        <Container type="article">
          <h3>Инфо за клубот.</h3>
          <p>Бла бла бла историја...</p>
          <p>Повеќе инфо...</p>
        </Container>
        <CenteredContainer>
          <a href="mailto:info@sektor.com">
            <Button type="primary">
              <Paperplane /> E-Mail
            </Button>
          </a>
        </CenteredContainer>
        <CardContainer>
          <MyLinkCard link="https://www.facebook.com/sektor909" facebook>
            <Facebook />
            Facebook
          </MyLinkCard>
          <MyLinkCard link="https://www.instagram.com/sektor909" instagram>
            <Instagram />
            Instagram
          </MyLinkCard>
          <MyLinkCard link="https://www.twitter.com/sektor909" twitter>
            <Twitter />
            Tweeter
          </MyLinkCard>
          {/* <MyLinkCard link="https://youtube.de/LekoArtsDE" youtube>
          <YouTube />
          Speedarts
        </MyLinkCard> */}
        </CardContainer>
      </Wrapper>
      <Footer />
    </div>
  </Layout>
)

export default Kontakt
