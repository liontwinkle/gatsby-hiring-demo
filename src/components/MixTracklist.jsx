import React from 'react'
import styled from 'react-emotion'
import { Box } from 'rebass'

const TracklistStyle = styled(Box)`
  color: ${props => props.theme.colors.black.lighter};
  h4 {
    display: inline;
    color: ${props => props.theme.colors.black.base};
  }
`

const Tracklist = ({ tracklist, mixName }) => (
  <TracklistStyle m={2}>
    <span className="info">Tracklist for </span> <h4>{mixName}</h4>
    <Box dangerouslySetInnerHTML={{ __html: tracklist.html }} />
  </TracklistStyle>
)

export default Tracklist
