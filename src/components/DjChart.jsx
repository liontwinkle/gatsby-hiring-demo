import React from 'react'
import Player from './Player'
import { Box } from 'rebass'

const Chart = ({ chart }) => (
  <Player name={chart.data.title} type="chart" playlist={chart.data.chart} />
)

export default Chart
