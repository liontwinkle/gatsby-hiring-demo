import React from 'react'
import styled from 'styled-components'
import UnerlineNav from './UnderlineNav'
import DjChart from './DjChart'
import DjMixes from './DjMixes'
import { navigate } from 'gatsby'
import Content from './Content'
import { Twitter, Facebook } from 'react-social-sharing'
import { darken } from 'polished'
import { Flex, Box } from '@rebass/grid/emotion'
import SEO from './SEO'
import Helmet from 'react-helmet'
import config from '../../config/website'

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => darken(0.25, props.theme.tint.black)};
  margin-top: 1rem;
  margin-bottom: 1rem;
`
const Text = styled.span`
  vertical-align: center;
`

class DjContent extends React.Component {
  handleClick = (e, el, name) => {
    console.log('El, name', el, name)
    e.preventDefault()
    navigate(`/djs/${name}?tab=${el}#focus`)
  }
  render() {
    const dj = this.props.dj
    let description = dj.data.bio.text.slice(0, 200)
    let title = dj.data.name
    const bio = <Content input={dj.data.bio.html} />
    const mixes = dj.data.mixes
    const selected = this.props.location.search
      ? this.props.location.search
      : '?tab=bio'
    console.log('SELECTED: ', selected)
    const djCharts = dj.data.charts
    const CurrentElement = (() => {
      if (selected === '?tab=charts') {
        const charts = djCharts.map(chart => {
          const djChart = chart.chart.document[0]
          description = `${djChart.data.title} by ${title}`
          return <DjChart chart={djChart} location={this.props.location} />
        })
        return <div>{charts}</div>
      }
      if (selected === '?tab=mixes') {
        description = `Миксови од ${dj.data.name}`
        return (
          <DjMixes
            djName={dj.data.name}
            mixes={mixes}
            location={this.props.location}
          />
        )
      }
      if (selected === '?tab=events') return <span>Events</span>
      return bio
    })()
    console.log('Current Element', CurrentElement)
    return (
      <div>
        <Helmet title={`${dj.data.name} | ${config.siteTitle}`} />
        <SEO
          location={this.props.location}
          // postNode={dj}
          postSEO
          imageSrc={dj.data.avatar.localFile.childImageSharp.fixed.src}
          title={title}
          description={description}
        />
        <section id="focus">
          <UnerlineNav
            handleClick={(e, el) => this.handleClick(e, el, dj.uid)}
            selected={selected}
          />
          <Box m={2}>{CurrentElement}</Box>
          <Line />
          <Flex flexDirection={['column', 'row']} alignItems="center">
            <Box>
              <Text>Сподели со твоите пријатели</Text>
            </Box>
            <Box>
              <Twitter message={description} link={this.props.location.href} />
              <Facebook link={this.props.location.href} />
            </Box>
          </Flex>
        </section>
      </div>
    )
  }
}
export default DjContent
