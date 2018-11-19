import React from 'react'
import styled from 'react-emotion'
import UnerlineNav from './UnderlineNav'
import { Text } from 'rebass'
import DjChart from './DjChart'
import DjMixes from './DjMixes'
import { Box } from 'rebass'
import { navigateTo } from 'gatsby-link'

const Bio = styled(Text)`
  max-width: 800px;
`

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

  componentWillMount() {
    const hash = this.props.location.hash
    console.log('DJ Content, Component will mount', hash)
    if (hash) {
      this.setState({
        selected: hash,
      })
    }
  }
  handleClick = (e, el) => {
    e.preventDefault()

    console.log('Navigating to: ', el)
    this.setState({
      selected: el,
    })
    navigateTo(`${el}`)
  }
  render() {
    const dj = this.props.dj
    const bio = <Bio id="#bio">{dj.data.bio.text}</Bio>
    const mixes = dj.data.mixes
    const selected = this.state.selected
    const djChart = this.props.chart
    const Content = (() => {
      if (selected === '#bio') return bio
      if (selected == '#charts') return <DjChart id="#charts" chart={djChart} />
      if (selected == '#mixes')
        return <DjMixes id="#mixes" djName={dj.data.name} mixes={mixes} />
      else selected === 'events'
      return <span id="#events">Events</span>
    })()
    return (
      <div>
        <UnerlineNav
          handleClick={this.handleClick}
          selected={this.state.selected}
        />
        <Box m={2}>{Content}</Box>
      </div>
    )
  }
}
export default DjContent
