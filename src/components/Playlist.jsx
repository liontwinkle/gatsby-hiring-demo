import React from 'react'
import styled from 'react-emotion'
import {
  FaPlay,
  FaPause,
  FaList,
  FaFileAudio,
  FaMixcloud,
  FaSoundcloud,
  FaYoutube,
} from 'react-icons/fa'

const Table = styled.table`
  background: transparent;
  margin: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  a.linkSource {
    color: ${props => props.theme.colors.black.light};
  }
  a:hover {
    background-color: ${props => props.theme.colors.white.blue};
  }
`

const Playlist = ({ playlist, getActiveTrack, activeUrl, playing }) => {
  const getSourceIcon = url => {
    if (url.includes('soundcloud.com')) {
      return <FaSoundcloud />
    } else if (url.includes('mixcloud')) {
      return <FaMixcloud />
    } else if (url.includes('youtube')) {
      return <FaYoutube />
    } else if (url.includes('prismic.io')) {
      return <FaFileAudio />
    }
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <h4>
              <FaList size={23} />
            </h4>
          </th>
          <th />
          <th>
            <h4>Artist</h4>
          </th>
          <th>
            <h4>Track</h4>
          </th>
          <th>
            <h4>Source</h4>
          </th>
        </tr>
      </thead>
      <tbody className="body">
        {playlist.map((track, index) => (
          <tr key={track.out_link.url}>
            <td>{index + 1}</td>
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
            {console.log(track.out_link.url.includes('soundcloud'))}
            <td>
              <a
                className="linkSource"
                href={track.out_link.url}
                target={'blank'}
              >
                {getSourceIcon(track.out_link.url)}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Playlist
