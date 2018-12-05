import React from 'react'
import styled from 'react-emotion'
import UnerlineNav from './UnderlineNav'
import { Text } from 'rebass'
import DjChart from './DjChart'
import DjMixes from './DjMixes'
import { Box } from 'rebass'
import { navigate } from 'gatsby'
import Content from './Content'

class DjContent extends React.Component {
  state = {
    selected: '#bio',
  }

  // componentWillReceiveProps() {
  //   const hash = this.props.location.hash
  //   console.log('DJ Content, Component will receive props', hash)
  //   this.setState({
  //     selected: hash,
  //   })
  // }

  UNSAFE_componentWillMount() {
    const hash = this.props.location.hash
    console.log('DJ Content, Component will mount', hash)
    if (hash) {
      this.setState({
        selected: hash,
      })
    }
  }
  handleClick = (e, el, name) => {
    e.preventDefault()

    console.log('Navigating to: ', el)
    this.setState({
      selected: el,
    })
    navigate(`/djs/${name}/${el}`)
  }
  render() {
    const dj = this.props.dj
    const bio = <Content id="#bio" input={dj.data.bio.html} />
    const mixes = dj.data.mixes
    const selected = this.state.selected
    const djChart = this.props.chart
    const CurrentElement = (() => {
      if (selected === '#bio') return bio
      if (selected === '#charts')
        return (
          <DjChart
            id="#charts"
            chart={djChart}
            location={this.props.location}
          />
        )
      if (selected === '#mixes')
        return (
          <DjMixes
            id="#mixes"
            djName={dj.data.name}
            mixes={mixes}
            location={this.props.location}
          />
        )
      // else selected === 'events' // jshint ignore:line
      return <span id="#events">Events</span>
    })()
    return (
      <div>
        <UnerlineNav
          handleClick={(e, el) => this.handleClick(e, el, dj.data.name)}
          selected={this.state.selected}
        />
        <Box m={2}>{CurrentElement}</Box>
      </div>
    )
  }
}
export default DjContent
