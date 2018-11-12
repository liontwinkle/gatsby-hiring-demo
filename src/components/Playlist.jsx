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
import { GoLinkExternal } from 'react-icons/go'

const Table = styled.table`
  background: transparent;
  margin: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  .center {
    text-align: center;
  }
  .thinColumn {
    width: 20px;
  }
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
          <th className="center">
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
            <h4>
              <GoLinkExternal size={23} />
            </h4>
          </th>
        </tr>
      </thead>
      <tbody className="body">
        {playlist.map((track, index) => (
          <tr key={track.out_link.url}>
            <td className="center">{index + 1}</td>
            <td>
              <div
                onClick={() => getActiveTrack(track.out_link.url)}
                style={{ cursor: 'pointer' }}
              >
                {(track.out_link.url == activeUrl) & playing ? (
                  <FaPause size={20} />
                ) : (
                  <FaPlay size={20} />
                )}
              </div>
            </td>
            <td>{track.artist}</td>
            <td>{track.track}</td>
            {console.log(track.out_link.url.includes('soundcloud'))}
            <td className="center">
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
