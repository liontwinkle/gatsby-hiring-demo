import React from 'react'
import Player from './Player'
import PlayerConsumer from '../layouts/GlobalPlayerContext'

const Chart = ({ chart, location }) => {
  console.log('IN DJ Chart: ', chart)
  return (
    // <Player name={chart.data.title} type="chart" playlist={chart.data.chart} />
    <PlayerConsumer>
      {({ data, set }) => (
        <Player
          playlist={chart.data.chart}
          name={chart.data.title}
          type="chart"
          contextData={data}
          setFunction={set}
          location={location}
        />
      )}
    </PlayerConsumer>
  )
}

export default Chart
