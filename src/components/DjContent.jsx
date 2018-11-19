import React from 'react'
import styled from 'react-emotion'
import UnerlineNav from './UnderlineNav'
import { Text } from 'rebass'
import DjChart from './DjChart'
import DjMixes from './DjMixes'
import { Box } from 'rebass'

const Bio = styled(Text)`
  max-width: 800px;
`

class DjContent extends React.Component {
  state = {
    selected: 'bio',
  }

  handleClick = el => {
    this.setState({
      selected: el,
    })
  }
  render() {
    const dj = this.props.dj
    const bio = <Bio>{dj.data.bio.text}</Bio>
    const mixes = dj.data.mixes
    const selected = this.state.selected
    const djChart = this.props.chart
    const Content = (() => {
      if (selected === 'bio') return bio
      if (selected == 'charts') return <DjChart chart={djChart} />
      if (selected == 'mixes')
        return <DjMixes djName={dj.data.name} mixes={mixes} />
      else selected === 'events'
      return <span>Events</span>
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
