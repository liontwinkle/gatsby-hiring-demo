import React from 'react'
import styled from 'styled-components'
import {
  FaPlay,
  FaPause,
  FaFastForward,
  FaFastBackward,
  FaVolumeUp,
  FaVolumeOff,
} from 'react-icons/fa'
import Playlist from './Playlist'
import PlaylistChart from './PlaylistChart'
import Tracklist from './MixTracklist'
import Slider from 'rc-slider'
import './Slider.css'
import { Flex, Box } from '@rebass/grid/emotion'

function secondsToTime(secs) {
  secs = Math.round(secs)
  const hours = Math.floor(secs / (60 * 60))

  const divisor_for_minutes = secs % (60 * 60)
  const minutes = Math.floor(divisor_for_minutes / 60)

  const divisor_for_seconds = divisor_for_minutes % 60
  const seconds = Math.ceil(divisor_for_seconds)

  const time = `${hours}:${minutes}:${seconds}`
  return time
}

const Wrapper = styled.div`
  max-width: 900px;
`

const PlayerControler = styled.div`
  margin: 0.3em;
  padding: 0.2rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  svg {
    color: ${props => props.theme.colors.white.blue};
    cursor: pointer;
  }
  .seek {
    height: 6px;
    background-color: ${props => props.theme.colors.white.blue};
    @media (max-width: ${props => props.theme.breakpoints.l}) {
      width: 84%;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      width: 60%;
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      width: 48%;
    }
    @media (max-width: ${props => props.theme.breakpoints.xs}) {
      width: 65%;
    }
    @media (min-width: ${props => props.theme.breakpoints.l}) {
      width: 90%;
    }
    border-radius: 4px;
    display: flex;
    margin-left: 1rem;
    margin-right: 1rem;
    -webkit-appearance: none;
    border-radius: 5px;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  .seek::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${props => props.theme.colors.black.light};
    cursor: pointer;
  }
  .seek::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${props => props.theme.colors.black.light};
    cursor: pointer;
  }
  .playPauseButton {
    color: ${props => props.theme.colors.white.blue};
    cursor: pointer;
    @media (max-width: ${props => props.theme.breakpoints.l}) {
      width: 6%;
      height: 6%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      width: 10%;
      height: 10%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      width: 15%;
      height: 15%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.xs}) {
      width: 20%;
      height: 20%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (min-width: ${props => props.theme.breakpoints.l}) {
      width: 6%;
      height: 6%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  .nextPrevButton {
    @media (max-width: ${props => props.theme.breakpoints.l}) {
      width: 4%;
      height: 4%;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      width: 8%;
      height: 8%;
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      width: 10%;
      height: 10%;
    }
    @media (max-width: ${props => props.theme.breakpoints.xs}) {
      width: 12%;
      height: 12%;
    }
    @media (min-width: ${props => props.theme.breakpoints.l}) {
      width: 4%;
      height: 4%;
    }
  }
`
const Info = styled.div`
  text-align: center;
  div.timer {
    color: ${props => props.theme.colors.black.light};
  }
`

class Player extends React.Component {
  load = url => {
    console.log('POST URL PLAYER: ', this.props.location.pathname)
    const index = this.getIndex(url)
    const nowPlaying = this.props.playlist[index]
    const artist = nowPlaying
      ? nowPlaying.artist
        ? nowPlaying.artist
        : this.props.name
      : null
    const track = nowPlaying
      ? nowPlaying.track
        ? nowPlaying.track
        : nowPlaying.title
      : null
    this.props.setFunction({
      url,
      played: 0,
      loaded: 0,
      artist: artist,
      track: track,
    })
    if (
      !this.props.contextData.playlist ||
      this.props.contextData.playlistName !== this.props.name
    ) {
      this.props.setFunction({
        playlist: this.props.playlist,
        playlistName: this.props.name,
        playlistType: this.props.type,
        playlistLink: this.props.location.pathname + this.props.location.search,
      })
    }
  }
  getIndex = url =>
    url ? this.props.playlist.findIndex(el => el.link.url === url) : -1

  ref = player => {
    this.player = player
  }
  playPause = () => {
    this.props.setFunction({ playing: !this.props.contextData.playing })
    if (!this.props.contextData.url) {
      const url = this.props.playlist[0].link.url
      this.load(url)
    }
  }
  stop = () => {
    this.props.setFunction({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.props.setFunction({ loop: !this.contextData.loop })
  }
  setVolume = e => {
    this.props.setFunction({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.props.setFunction({ muted: !this.props.contextData.muted })
  }
  setPlaybackRate = e => {
    console.log('Setting Playback Rate: ', parseFloat(e.target.value))
    this.props.setFunction({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    console.log('onPlay')
    this.props.setFunction({
      playing: true,
      duration: this.contextData.player.getDuration(),
    })
  }
  onPause = () => {
    console.log('onPause')
    this.props.setFunction({ playing: false })
  }
  onSeekMouseDown = e => {
    this.props.setFunction({ seeking: true })
  }
  onSeekChange = e => {
    console.log('On seek change', parseFloat(e.target.value), e.target.value)
    this.props.setFunction({ played: parseFloat(e.target.value) })
  }
  onSliderChange = value => {
    console.log('On slider change', parseFloat(value))
    this.props.setFunction({ played: parseFloat(value) })
  }
  onSeekMouseUp = value => {
    this.props.setFunction({ seeking: false })
    this.props.contextData.player.seekTo(parseFloat(value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    console.log('YES Seeking')
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      console.log('NOT Seeking')
      this.props.setFunction(state)
    }
  }
  onEnded = () => {
    console.log('onEnded')
    this.props.setFunction({ playing: this.props.contextData.loop })
  }
  onDuration = duration => {
    console.log('onDuration', duration)
    this.props.setFunction({ duration })
  }

  getActiveTrack = url => {
    this.props.setFunction({ url: url, played: 0, loaded: 0 })
    // this.state.url === url
    //   ? this.props.setFunction({ playing: !this.state.playing })
    //   : this.props.setFunction({ played: 0, loaded: 0 })
  }

  findNextUrl = (playlist, index) => {
    const maxIndex = playlist.length
    if (index === -1 || index === maxIndex) {
      console.log('First case')
      return playlist[0].link.url
    } else if (index >= 0 && index < maxIndex) {
      console.log('Second case')
      return playlist[index].link.url
    }
  }
  onPlayNext = direction => {
    const playlist = this.props.playlist
    let index
    if (direction === 'forward') {
      // + 1 because next track
      index =
        playlist.findIndex(el => el.link.url === this.props.contextData.url) + 1
    } else if (direction === 'backward') {
      index =
        playlist.findIndex(el => el.link.url === this.props.contextData.url) - 1
    }

    const url = this.findNextUrl(playlist, index)
    // this.props.setFunction({
    //   url: url,
    //   playing: false,
    //   loaded: 0,
    //   played: 0,
    // })
    this.load(url)
  }
  onReady = () => {
    console.log('On Ready')
  }
  onDuration = duration => {
    console.log('onDuration', duration)
    this.props.setFunction({ duration })
  }
  render() {
    const PlaylistElement =
      this.props.type === 'chart' ? PlaylistChart : Playlist
    const playlist = this.props.playlist
    const PlayPauseButton = this.props.contextData.playing ? FaPause : FaPlay
    const MuteSoundButton = this.props.contextData.muted
      ? FaVolumeOff
      : FaVolumeUp
    const Timer =
      this.props.contextData.playing || this.props.contextData.played > 0.0 ? (
        <div className="timer">
          {secondsToTime(
            this.props.contextData.duration * this.props.contextData.played
          )}
          &nbsp;/&nbsp;
          {secondsToTime(this.props.contextData.duration)}
        </div>
      ) : (
        <div className="timer">-</div>
      )
    console.log('URL: ', this.props.contextData.url)
    const index = this.getIndex(this.props.contextData.url)
    const nowPlaying = this.props.playlist[index]
    console.log('Nowplaying, index', nowPlaying, index)
    const tracklistElement =
      nowPlaying && nowPlaying !== -1 ? (
        nowPlaying.tracklist ? (
          <Box width={[1, 1, 1, 0.35]} mx={3}>
            <Tracklist
              tracklist={nowPlaying.tracklist}
              mixName={this.props.contextData.track}
            />
          </Box>
        ) : null
      ) : null
    const mainBoxSize = tracklistElement ? 0.6 : 1

    return (
      <Wrapper>
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 1, mainBoxSize]}>
            <h3>
              {this.props.type !== 'mixes'
                ? this.props.name
                : `Миксови од ${this.props.name}`}
            </h3>
            <Info>
              {this.props.contextData.url
                ? `${this.props.contextData.artist} - ${
                    this.props.contextData.track
                  }`
                : `Artist - Track`}

              {Timer}
            </Info>
            <PlayerControler>
              <FaFastBackward
                onClick={() => this.onPlayNext('backward')}
                className="nextPrevButton"
              />
              <PlayPauseButton
                className="playPauseButton"
                onClick={this.playPause}
                // viewBox={'0 0 448 512'}
              />
              <FaFastForward
                className="nextPrevButton"
                onClick={() => this.onPlayNext('forward')}
              />
              <Slider
                // step="any"
                type="range"
                className="seek"
                min={0}
                max={1}
                step={0.000001}
                value={this.props.contextData.played}
                allowCross={false}
                defaultValue={0}
                onChange={this.onSliderChange}
                onAfterChange={this.onSeekMouseUp}
                onBeforeChange={this.onSeekMouseDown}
              />
              <MuteSoundButton
                size={this.props.contextData.muted ? 20 : 25}
                onClick={this.toggleMuted}
                className="muteButton"
              />
            </PlayerControler>

            <div className="playlist">
              <PlaylistElement
                playlist={playlist}
                getActiveTrack={this.load}
                activeUrl={this.props.contextData.url}
                playing={this.props.contextData.playing}
                djName={this.props.name}
              />
            </div>
          </Box>

          {tracklistElement}
        </Flex>
      </Wrapper>
    )
  }
}

export default Player
