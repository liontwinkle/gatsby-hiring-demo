import React from 'react'
import styled from 'react-emotion'
import { FaPlay, FaPause, FaList } from 'react-icons/fa'

const Table = styled.table`
  background: transparent;
  margin: 1rem;
  width: 75%;
`

const Playlist = ({ playlist, getActiveTrack, activeUrl, playing }) => (
  // const handleClick = url => getActiveTrack(url)
  <Table>
    <thead>
      <tr>
        <th>
          <h4>
            <FaList size={23} />
          </h4>
        </th>
        <th>
          <h4>Artist</h4>
        </th>
        <th>
          <h4>Track</h4>
        </th>
      </tr>
    </thead>
    <tbody className="body">
      {playlist.map(track => (
        <tr key={track.out_link.url}>
          <td>
            <div
              onClick={() => getActiveTrack(track.out_link.url)}
              style={{ cursor: 'pointer' }}
            >
              {(track.out_link.url == activeUrl) & playing ? (
                <FaPause size={23} />
              ) : (
                <FaPlay size={23} />
              )}
            </div>
          </td>
          <td>{track.artist}</td>
          <td>{track.track}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default Playlist
