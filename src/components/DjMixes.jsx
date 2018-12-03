import React from 'react'
import Player from './Player'
import { Flex, Box } from '@rebass/grid'
import PlayerConsumer from '../layouts/GlobalPlayerContext'

const DjMixes = ({ mixes, djName }) => (
  <div>
    <Flex>
      <Box>
        <PlayerConsumer>
          {({ data, set }) => (
            <Player
              playlist={mixes}
              name={djName}
              type="mixes"
              contextData={data}
              setFunction={set}
            />
          )}
        </PlayerConsumer>
      </Box>
    </Flex>
  </div>
)

export default DjMixes
