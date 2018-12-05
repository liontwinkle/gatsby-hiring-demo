import React from 'react'
// import GlobalPlayer from './GlobalPlayer'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {
  FaPlay,
  FaPause,
  FaFastForward,
  FaFastBackward,
  FaVolumeUp,
  FaVolumeOff,
} from 'react-icons/fa'
// import Playlist from './Playlist'
// import PlaylistChart from './PlaylistChart'
// import Tracklist from './MixTracklist'
import Slider from 'rc-slider'
import '../components/Slider.css'
import { Flex, Box } from '@rebass/grid/emotion'
import theme from '../../config/theme'
import { Link } from 'gatsby'

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  flex: 1 0 auto;
  margin-bottom: 100px;
`

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 16px;
  background: ${theme.gradient.rightToLeft};
  z-index: 100;
  h3,
  h4 {
    color: ${theme.colors.white.light};
    text-align: center;
    margin-bottom: 16px;
  }
`

const PlayerControler = styled.div`
  padding: 0.2rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  svg {
    color: ${theme.colors.white.blue};
    cursor: pointer;
  }
  .seek {
    height: 6px;
    background-color: ${theme.colors.white.blue};
    @media (max-width: ${theme.breakpoints.l}) {
      width: 84%;
    }
    @media (max-width: ${theme.breakpoints.m}) {
      width: 60%;
    }
    @media (max-width: ${theme.breakpoints.s}) {
      width: 48%;
    }
    @media (max-width: ${theme.breakpoints.xs}) {
      width: 65%;
    }
    @media (min-width: ${theme.breakpoints.l}) {
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
    background: ${theme.colors.black.light};
    cursor: pointer;
  }
  .seek::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${theme.colors.black.light};
    cursor: pointer;
  }
  .playPauseButton {
    color: ${theme.colors.white.blue};
    cursor: pointer;
    @media (max-width: ${theme.breakpoints.l}) {
      width: 6%;
      height: 6%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (max-width: ${theme.breakpoints.m}) {
      width: 10%;
      height: 10%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (max-width: ${theme.breakpoints.s}) {
      width: 15%;
      height: 15%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (max-width: ${theme.breakpoints.xs}) {
      width: 20%;
      height: 20%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    @media (min-width: ${theme.breakpoints.l}) {
      width: 3%;
      height: 3%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  .nextPrevButton {
    @media (max-width: ${theme.breakpoints.l}) {
      width: 4%;
      height: 4%;
    }
    @media (max-width: ${theme.breakpoints.m}) {
      width: 8%;
      height: 8%;
    }
    @media (max-width: ${theme.breakpoints.s}) {
      width: 10%;
      height: 10%;
    }
    @media (max-width: ${theme.breakpoints.xs}) {
      width: 12%;
      height: 12%;
    }
    @media (min-width: ${theme.breakpoints.l}) {
      width: 2%;
      height: 2%;
    }
  }
`
const Info = styled.div`
  text-align: center;
  color: ${theme.colors.white.light};
  span.timer {
    color: ${theme.colors.white.light};
  }
`

const defaultContextValue = {
  data: {
    // set your initial data shape here
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
    artist: null,
    track: false,
    playlist: null,
    playlistName: null,
    player: false,
    playlistType: false,
    playlistLink: false,
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
      onPlayNext: this.onPlayNext,
    }
    this.findNextUrl = this.findNextUrl.bind(this)
  }

  setData(newData) {
    console.log('In setData: ', newData)
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  // load = url => {
  //   this.setState({
  //     data: {
  //       url,
  //       played: 0,
  //       loaded: 0,
  //     },
  //   })
  // }

  ref = player => {
    this.player = player
    let data = { ...this.state.data }
    data.player = player
    this.setState({ data })
  }
  playPause = () => {
    let data = { ...this.state.data }
    data.playing = !data.playing
    this.setState({ data })
    // what if there's no playlist? Hide player?
    // if (!this.state.data.url) {
    //   this.setState({ data: { url: this.props.playlist[0].link.url } })
    // }
  }
  // stop = () => {
  //   let data = { ...this.state.data }
  //   data.url = null
  //   data.playing = false
  //   this.setState({ data })
  // }
  toggleLoop = () => {
    this.setState({ data: { loop: !this.state.data.loop } })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    let data = { ...this.state.data }
    data.muted = !data.muted
    this.setState({ data })
  }
  setPlaybackRate = e => {
    console.log('Setting Playback Rate: ', parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  // onPlay = () => {
  //   console.log('onPlay')
  //   this.setState({
  //     data: { playing: true, duration: this.player.getDuration() },
  //   })
  // }
  // onPause = () => {
  //   console.log('onPause')
  //   this.setState({ data: { playing: false } })
  // }
  onSeekMouseDown = e => {
    let data = { ...this.state.data }
    data.seeking = true
    this.setState({ data })
  }
  onSeekChange = e => {
    let data = { ...this.state.data }
    data.played = parseFloat(e.target.value)
    console.log('On seek change', parseFloat(e.target.value), e.target.value)
    this.setState({ data })
  }
  onSliderChange = value => {
    let data = { ...this.state.data }
    data.played = parseFloat(value)
    console.log('On slider change', parseFloat(value))
    this.setState({ data })
  }
  onSeekMouseUp = value => {
    let data = { ...this.state.data }
    data.seeking = false
    this.setState({ data })
    this.player.seekTo(parseFloat(value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    console.log('YES Seeking')
    // We only want to update time slider if we are not currently seeking
    if (!this.state.data.seeking) {
      let data = { ...this.state.data }
      data.loaded = state.loaded
      data.loadedSeconds = state.loadedSeconds
      data.played = state.played
      data.playedSeconds = state.playedSeconds
      console.log('NOT Seeking')
      this.setState({ data })
    }
  }
  onEnded = () => {
    console.log('onEnded')
    let data = this.state.data
    this.setState({ data: { playing: this.state.data.loop } })
  }
  onDuration = duration => {
    let data = { ...this.state.data }
    data.duration = duration
    console.log('onDuration', duration)
    this.setState({ data })
  }

  // getActiveTrack = url => {
  //   this.setState({ data: { url: url, played: 0, loaded: 0 } })
  //   // this.state.data.url === url
  //   //   ? this.setState({ playing: !this.state.data.playing })
  //   //   : this.setState({ played: 0, loaded: 0 })
  // }

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
      index = playlist.findIndex(el => el.link.url === this.state.data.url) + 1
    } else if (direction === 'backward') {
      index = playlist.findIndex(el => el.link.url === this.state.data.url) - 1
    }

    const url = this.findNextUrl(playlist, index)
    this.setState({
      data: {
        url: url,
        playing: false,
        loaded: 0,
        played: 0,
      },
    })
  }
  onReady = () => {
    console.log('On Ready')
    const duration = this.player.getDuration()
    let data = { ...this.state.data }
    data.duration = duration
    this.setState({ data })
  }
  onDuration = duration => {
    let data = this.state.data
    data.duration = duration
    console.log('onDuration', duration)
    this.setState({ data })
  }

  render() {
    const {
      // url,
      playing,
      volume,
      muted,
      loop,
      played,
      // loaded,
      duration,
      playbackRate,
      playlist,
      playlistName,
      playlistType,
      playlistLink,
    } = this.state.data
    console.log('Playlist in global: ', playlist)
    console.log('Playlist Linl in global: ', playlistLink)
    const PlayPauseButton = this.state.data.playing ? FaPause : FaPlay
    const MuteSoundButton = this.state.data.muted ? FaVolumeOff : FaVolumeUp
    const Timer =
      this.state.data.playing || this.state.data.played > 0.0 ? (
        <span className="timer">
          {secondsToTime(duration * this.state.data.played)}&nbsp;/&nbsp;
          {secondsToTime(duration)}
        </span>
      ) : (
        <span className="timer">-</span>
      )
    const mainBoxSize = 1
    if (this.state.data.url) {
      return (
        <Provider value={this.state}>
          <Container>
            <Content>{this.props.children}</Content>
            <Wrapper>
              <Flex flexWrap="wrap">
                <Box width={[1, 1, 1, mainBoxSize]}>
                  <Link to={playlistLink}>
                    <h4>
                      {playlistType !== 'mixes'
                        ? playlistName
                        : `Миксови од ${playlistName}`}
                    </h4>
                    <Info>
                      {this.state.data.artist} - {this.state.data.track}
                      &nbsp;
                      {Timer}
                    </Info>
                  </Link>
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
                    url={this.state.data.url}
                    playing={playing}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={this.onReady}
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
                      // soundcloud: { preload: true, options: { auto_play: true } },
                    }}
                  />

                  <div className="playlist">
                    {/* <PlaylistElement
                    playlist={playlist}
                    getActiveTrack={this.load}
                    activeUrl={this.state.url}
                    playing={this.state.playing}
                    djName={this.props.name}
                  /> */}
                  </div>
                </Box>

                {/* {tracklistElement} */}
              </Flex>
            </Wrapper>
          </Container>
        </Provider>
      )
    }
    return (
      <Provider value={this.state}>
        <div>{this.props.children}</div>
      </Provider>
    )
  }
}

export { Consumer as default, ContextProviderComponent }
