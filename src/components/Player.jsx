import React from 'react'
import styled from 'react-emotion'
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
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const PlayerControler = styled.div`
  height: 200;
  width: 800;
  margin: 0.5em;
  padding: 0.5rem;
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
    width: 650px;
    border-radius: 4px;
    display: flex;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
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
  .timer {
    color: ${props => props.theme.colors.black.light};
  }
  .playButton {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  input {
    cursor: pointer;
  }
  div.timer {
    margin-left: 0.5rem;
    width: 200px;
    max-width: 200px;
    display: inline-block;
  }
`
const Info = styled.div`
  text-align: center;
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
      // index: -1,
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
      this.setState({ url: this.props.playlist[0].out_link.url })
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
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
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
    console.log('Here', index)
    const maxIndex = playlist.length
    // switch (index) {
    //   case index == -1 || index == playlist.length - 1:
    //     console.log('First case')
    //     return playlist[0].out_link.url
    //   case index >= 0 && index < maxIndex:
    //     console.log('Second case')
    //     return playlist[index].out_link.url
    // }
    if (index == -1 || index == maxIndex) {
      console.log('First case')
      return playlist[0].out_link.url
    } else if (index >= 0 && index < maxIndex) {
      console.log('Second case')
      return playlist[index].out_link.url
    }
  }
  onPlayNext = direction => {
    console.log(direction)
    const playlist = this.props.playlist
    let index
    if (direction == 'forward') {
      // + 1 because next track
      index = playlist.findIndex(el => el.out_link.url == this.state.url) + 1
    } else if (direction == 'backward') {
      index = playlist.findIndex(el => el.out_link.url == this.state.url) - 1
    }

    console.log('Index', index)
    const url = this.findNextUrl(playlist, index)
    console.log('URL', url)
    this.setState({ url: url })
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
    const playlist = this.props.playlist
    const PlayPauseButton = this.state.playing ? FaPause : FaPlay
    const MuteSoundButton = this.state.muted ? FaVolumeOff : FaVolumeUp
    const index = this.state.url
      ? playlist.findIndex(el => el.out_link.url == this.state.url)
      : -1
    const nowPlaying = playlist[index]

    return (
      <Wrapper>
        <h3>{this.props.name}</h3>
        <Info>
          {nowPlaying
            ? `${nowPlaying.artist} - ${nowPlaying.track}`
            : `Artist - Track`}
        </Info>
        <PlayerControler>
          <FaFastBackward
            size={30}
            onClick={() => this.onPlayNext('backward')}
          />
          <PlayPauseButton
            className="playButton"
            size={40}
            onClick={this.playPause}
          />
          <FaFastForward size={30} onClick={() => this.onPlayNext('forward')} />
          <input
            step="any"
            type="range"
            className="seek"
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
            onEnded={this.onEnded}
            onProgress={this.onProgress}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />
          <MuteSoundButton
            size={this.state.muted ? 20 : 25}
            onClick={this.toggleMuted}
          />
          <div className="timer">
            {secondsToTime(duration * this.state.played)}&nbsp;/&nbsp;{secondsToTime(
              duration
            )}
          </div>
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
          onEnded={this.onEnded}
          onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />
        <Playlist
          playlist={playlist}
          getActiveTrack={this.getActiveTrack}
          activeUrl={this.state.url}
          playing={this.state.playing}
        />
      </Wrapper>
    )
  }
}

export default Player
