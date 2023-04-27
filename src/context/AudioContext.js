import { useState, useEffect, createContext } from "react";
import { Audio } from "expo-av";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  // STATE
  const [audioState, setAudioState] = useState({
    playbackObj: null,
    soundObj: null,
    currentAudio: {},
    isPlaying: false,
    playbackPosition: null,
    playbackDuration: null,
  });

  // UPDATE STATE
  const updateAudioState = (newState = {}) => {
    setAudioState((prevState) => ({ ...prevState, ...newState }));
  };

  // STATUS FOLLOW
  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      updateAudioState({
        playbackPosition: playbackStatus.positionMillis,
        playbackDuration: playbackStatus.durationMillis,
      });
      console.log(playbackStatus.positionMillis);
    }
    if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
      console.log("Pause!");
    }
    if (playbackStatus.didJustFinish) {
      console.log("Finish!");
      updateAudioState({
        isPlaying: playbackStatus.isPlaying,
      });
    }
  };

  useEffect(() => {
    if (audioState.playbackObj === null) {
      updateAudioState({ playbackObj: new Audio.Sound() });
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        ...audioState,
        updateAudioState,
        onPlaybackStatusUpdate,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
