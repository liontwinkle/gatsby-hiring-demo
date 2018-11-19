import React from 'react'
import styled, { css } from 'react-emotion'
import ReactPlayer from 'react-player'
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
import { Flex } from '@rebass/grid/emotion'
import { Box } from 'rebass'

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
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      playing: false,
      volume: 0.9,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      index: -1,
    }
    this.findNextUrl = this.findNextUrl.bind(this)
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
    })
  }

  ref = player => {
    this.player = player
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
    if (!this.state.url) {
      this.setState({ url: this.props.playlist[0].link.url })
    }
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  setPlaybackRate = e => {
    console.log('Setting Playback Rate: ', parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true, duration: this.player.getDuration() })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    console.log('On seek change', parseFloat(e.target.value), e.target.value)
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSliderChange = value => {
    console.log('On slider change', parseFloat(value))
    this.setState({ played: parseFloat(value) })
  }
  onSeekMouseUp = value => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    console.log('YES Seeking')
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      console.log('NOT Seeking')
      this.setState(state)
    }
  }
  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }
  onDuration = duration => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  getActiveTrack = url => {
    this.setState({ url: url })
    this.state.url == url
      ? this.setState({ playing: !this.state.playing })
      : this.setState({ playing: true })
  }

  findNextUrl = (playlist, index) => {
    const maxIndex = playlist.length
    if (index == -1 || index == maxIndex) {
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
    if (direction == 'forward') {
      // + 1 because next track
      index = playlist.findIndex(el => el.link.url == this.state.url) + 1
    } else if (direction == 'backward') {
      index = playlist.findIndex(el => el.link.url == this.state.url) - 1
    }

    const url = this.findNextUrl(playlist, index)
    this.setState({ url: url })
  }
  onDuration = duration => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  render() {
    const {
      url,
      playing,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
    } = this.state

    // console.log()
    const playlistTitle = this.props
    const PlaylistElement =
      this.props.type === 'chart' ? PlaylistChart : Playlist
    const playlist = this.props.playlist
    const PlayPauseButton = this.state.playing ? FaPause : FaPlay
    const MuteSoundButton = this.state.muted ? FaVolumeOff : FaVolumeUp
    const Timer =
      this.state.playing || this.state.played > 0.0 ? (
        <div className="timer">
          {secondsToTime(duration * this.state.played)}&nbsp;/&nbsp;{secondsToTime(
            duration
          )}
        </div>
      ) : (
        <div className="timer">-</div>
      )
    const index = this.state.url
      ? playlist.findIndex(el => el.link.url == this.state.url)
      : -1
    const nowPlaying = playlist[index]
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
    const tracklistElement = nowPlaying ? (
      nowPlaying.tracklist ? (
        <Box width={[1, 1, 1, 0.35]} mx={3}>
          <Tracklist tracklist={nowPlaying.tracklist} mixName={track} />
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
              {nowPlaying ? `${artist} - ${track}` : `Artist - Track`}

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
                value={played}
                allowCross={false}
                defaultValue={0}
                onChange={this.onSliderChange}
                onAfterChange={this.onSeekMouseUp}
                onBeforeChange={this.onSeekMouseDown}
              />
              <MuteSoundButton
                size={this.state.muted ? 20 : 25}
                onClick={this.toggleMuted}
                className="muteButton"
              />
            </PlayerControler>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="0"
              height="0"
              url={this.state.url}
              playing={playing}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={() => this.onPlayNext('forward')}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
              config={{
                youtube: { preload: true },
                soundcloud: { preload: true, options: { auto_play: true } },
              }}
              onDuration={this.onDuration}
            />
            <PlaylistElement
              playlist={playlist}
              getActiveTrack={this.getActiveTrack}
              activeUrl={this.state.url}
              playing={this.state.playing}
              djName={this.props.name}
            />
          </Box>

          {tracklistElement}
        </Flex>
      </Wrapper>
    )
  }
}

export default Player
