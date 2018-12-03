import React from 'react'
import Player from './Player'
import PlayerConsumer from '../layouts/GlobalPlayerContext'

const Chart = ({ chart }) => (
  // <Player name={chart.data.title} type="chart" playlist={chart.data.chart} />
  <PlayerConsumer>
    {({ data, set }) => (
      <Player
        playlist={chart.data.chart}
        name={chart.data.title}
        type="chart"
        contextData={data}
        setFunction={set}
      />
    )}
  </PlayerConsumer>
)

export default Chart
