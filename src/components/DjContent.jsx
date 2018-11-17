import React from 'react'
import styled from 'react-emotion'
import UnerlineNav from './UnderlineNav'
import { Text } from 'rebass'
import DjChart from './DjChart'

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
    const bio = <Text>{dj.data.bio.text}</Text>
    const selected = this.state.selected
    const djChart = this.props.chart
    return (
      <div>
        <UnerlineNav
          handleClick={this.handleClick}
          selected={this.state.selected}
        />
        {(() => {
          if (selected === 'bio') return bio
          if (selected == 'charts') return <DjChart chart={djChart} />
          if (selected == 'mixes') return <span>Mixes</span>
          else selected === 'events'
          return <span>Events</span>
        })()}
      </div>
    )
  }
}
export default DjContent
