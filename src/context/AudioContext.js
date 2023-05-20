import React, { Component, createContext } from "react";
import { Audio } from "expo-av";
import { changeSong } from "../utils/AudioController";
import { fetchSongs, fetchRecent } from "../utils/FirebaseHandler";
import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export const AudioContext = createContext();
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      songData: [],
      playbackObj: null,
      soundObj: null,
      currentAudio: null,
      currentAudioIndex: null,
      isPlaying: false,
      isLooping: false,
      playbackPosition: null,
      playbackDuration: null,
      recentestPosition: null,
    };
  }

  onPlaybackStatusUpdate = async (playbackStatus) => {
    // if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
    //   this.updateState(this, {
    //     playbackPosition: playbackStatus.positionMillis,
    //   });
    // }

    if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
      // this.updateState(this, {
      //   playbackPosition: playbackStatus.positionMillis,
      // });
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
      songData,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      isLooping,
      playbackPosition,
      playbackDuration,
      recentestPosition,
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
