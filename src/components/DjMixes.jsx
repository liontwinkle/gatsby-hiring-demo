import React from 'react'
import Player from './Player'
import { Flex, Box } from '@rebass/grid/emotion'

const DjMixes = ({ mixes }) => (
  //   <Player name={chart.data.title} type="chart" playlist={chart.data.chart} />
  <div>
    <Flex justifyContent="flex-end" wrap>
      <Box>Mix 1</Box>
      <Box>Mix 2</Box>
    </Flex>
  </div>
)

export default DjMixes
