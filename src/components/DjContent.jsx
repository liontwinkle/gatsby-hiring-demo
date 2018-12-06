import React from 'react'
import styled, { css } from 'styled-components'
import UnerlineNav from './UnderlineNav'
import DjChart from './DjChart'
import DjMixes from './DjMixes'
import { navigate } from 'gatsby'
import Content from './Content'
import { Twitter, Facebook } from 'react-social-sharing'
import { darken } from 'polished'
import { Flex, Box } from '@rebass/grid/emotion'
import ScrollableAnchor from 'react-scrollable-anchor'

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
  // state = {
  //   selected: 'bio',
  // }

  // componentWillReceiveProps() {
  //   const hash = this.props.location.hash
  //   console.log('DJ Content, Component will receive props', hash)
  //   this.setState({
  //     selected: hash,
  //   })
  // }

  // UNSAFE_componentWillMount() {
  //   const hash = this.props.location.hash
  //   console.log('DJ Content, Component will mount', hash)
  //   if (hash) {
  //     this.setState({
  //       selected: hash,
  //     })
  //   }
  // }
  handleClick = (e, el, name) => {
    e.preventDefault()

    console.log('Navigating to: ', el)
    // this.setState({
    //   selected: el,
    // })
    navigate(`/djs/${name}?tab=${el}/#focus`)
  }
  render() {
    const dj = this.props.dj
    const bio = <Content input={dj.data.bio.html} />
    const mixes = dj.data.mixes
    // const selected = this.state.selected
    const selected = this.props.location.search
      ? this.props.location.search
      : '?tab=bio'
    console.log('SELECTED: ', selected)
    const djChart = this.props.chart
    const CurrentElement = (() => {
      if (selected === '?tab=charts/')
        return <DjChart chart={djChart} location={this.props.location} />
      if (selected === '?tab=mixes/')
        return (
          <DjMixes
            djName={dj.data.name}
            mixes={mixes}
            location={this.props.location}
          />
        )
      if (selected === '?tab=events/') return <span>Events</span>
      return bio
    })()
    return (
      <div>
        <UnerlineNav
          handleClick={(e, el) => this.handleClick(e, el, dj.data.name)}
          selected={selected}
        />
        <ScrollableAnchor id={'focus'}>
          <Box m={2}>{CurrentElement}</Box>
        </ScrollableAnchor>
        <Line />
        <Flex flexDirection={['column', 'row']} alignItems="center">
          <Box>
            <Text>Сподели со твоите пријатели</Text>
          </Box>
          <Box>
            <Twitter message="Twitter Message" link="http://www.example.com" />
            <Facebook link="http://www.example.com" />
          </Box>
        </Flex>
      </div>
    )
  }
}
export default DjContent
