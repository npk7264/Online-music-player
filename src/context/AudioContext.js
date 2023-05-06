import React, { Component, createContext } from "react";
import { Audio } from "expo-av";
import { songs } from "../../data";
import { changeSong } from "../utils/AudioController";
import { fetchSongs } from "../utils/FirebaseHandler";

export const AudioContext = createContext();
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "MMp5BVLgmzPfKvaiDKSOrewVVvD3",
      songData: songs,
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      currentAudioIndex: null,
      isPlaying: false,
      isLooping: false,
      playbackPosition: null,
      playbackDuration: null,
    };
  }

  onPlaybackStatusUpdate = async (playbackStatus) => {
    // if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
    //   this.updateState(this, {
    //     playbackPosition: playbackStatus.positionMillis,
    //   });
    // }

    if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
    }

    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      console.log("FINISH:", this.state.currentAudio);
      await changeSong(
        { ...this.state, updateState: this.updateState },
        "next"
      );
    }
  };

  async componentDidMount() {
    const songs = await fetchSongs();
    // PHÁT NỀN
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
    if (this.state.playbackObj === null) {
      await this.setState({
        ...this.state,
        songData: songs,
        playbackObj: new Audio.Sound(),
      });
    }
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };

  render() {
    const {
      userId,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      isLooping,
      playbackPosition,
      playbackDuration,
    } = this.state;

    return (
      <AudioContext.Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          onPlaybackStatusUpdate: this.onPlaybackStatusUpdate,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
