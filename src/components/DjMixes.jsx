import React from 'react'
import Player from './Player'
import { Flex, Box } from '@rebass/grid/emotion'

const DjMixes = ({ mixes, djName }) => (
  <div>
    <Flex>
      <Box>
        <Player name={djName} type="mixes" playlist={mixes} />
      </Box>
    </Flex>
  </div>
)

export default DjMixes
