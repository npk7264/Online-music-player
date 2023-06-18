import { updateRecent, updateRecentestPositon } from "./FirebaseHandler";

// play audio
export const play = async (playbackObj, uri, lastPosition) => {
  try {
    // return await playbackObj.loadAsync(
    //   { uri },
    //   {
    //     shouldPlay: true,
    //     progressUpdateIntervalMillis: 1000,
    //   }
    // );
    if (!lastPosition)
      return await playbackObj.loadAsync(
        { uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );

    // but if there is lastPosition then we will play audio from the lastPosition
    await playbackObj.loadAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 }
    );

    return await playbackObj.playFromPositionAsync(lastPosition);
  } catch (error) {
    console.log("error inside play helper method", error.message);
  }
};

// pause audio
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error) {
    console.log("error inside pause helper method", error.message);
  }
};

// resume audio
export const resume = async (playbackObj) => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log("error inside resume helper method", error.message);
  }
};

// select another audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error) {
    console.log("error inside playNext helper method", error.message);
  }
};

export const selectSong = async (context, audio, songData, contextPlaylist) => {
  const {
    userId,
    // songData,
    soundObj,
    playbackObj,
    currentAudio,
    currentAudioIndex,
    isPlaying,
    updateState,
    onPlaybackStatusUpdate,
    playbackPosition,
  } = context;

  const { recentID, setRecentID, recentData, setRecentData } = contextPlaylist;
  try {
    // playing audio for the first time.
    if (soundObj === null) {
      const status = await play(
        playbackObj,
        audio.uri,
        currentAudio ? (audio.id == currentAudio.id ? playbackPosition : 0) : 0
      );
      const index = songData?.findIndex(({ id }) => id === audio.id);
      console.log(index);
      updateState(context, {
        currentAudio: audio,
        currentAudioIndex: index,
        soundObj: status,
        songData: songData,
        isPlaying: true,
        playbackDuration: status.durationMillis,
        // playbackPosition: 0,
      });
      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      updateRecent(userId, audio.id, audio, recentID, setRecentID, recentData, setRecentData);
      return;
    }

    // pause audio
    if (isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playbackObj);
      updateState(context, {
        soundObj: status,
        isPlaying: false,
        playbackPosition: status.positionMillis,
      });
      updateRecentestPositon(
        userId,
        status.positionMillis,
        status.durationMillis
      );
      return;
    }

    // resume audio
    if (!isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playbackObj);
      return updateState(context, { soundObj: status, isPlaying: true });
    }

    // select another audio
    if (currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
      const index = songData.findIndex(({ id }) => id === audio.id);
      console.log("select another audio", index);
      updateState(context, {
        currentAudio: audio,
        currentAudioIndex: index,
        soundObj: status,
        isPlaying: true,
        songData: songData,
        isLooping: false,
        playbackDuration: status.durationMillis,
        // playbackPosition: 0,
      });
      // updateRecent(userId, audio.id);
      updateRecent(userId, audio.id, audio, recentID, setRecentID, recentData, setRecentData);
      return;
    }
  } catch (error) {
    console.log("error inside select audio method.", error.message);
  }
};

export const changeSong = async (context, option, contextPlaylist) => {
  const {
    userId,
    songData,
    soundObj,
    playbackObj,
    currentAudio,
    currentAudioIndex,
    isPlaying,
    updateState,
  } = context;

  const { recentID, setRecentID, recentData, setRecentData } = contextPlaylist;

  let nextIndex;

  // set next/previous song
  if (option == "next") {
    const temp = currentAudioIndex + 1;
    nextIndex = temp < songData.length ? temp : 0;
  } else if (option == "previous") {
    const temp = currentAudioIndex - 1;
    nextIndex = temp >= 0 ? temp : songData.length - 1;
  }

  // play new song
  try {
    const nextAudio = songData[nextIndex];
    const status = await playNext(playbackObj, nextAudio.uri);
    updateState(context, {
      currentAudio: nextAudio,
      currentAudioIndex: nextIndex,
      soundObj: status,
      isPlaying: true,
      isLooping: false,
      playbackDuration: status.durationMillis,
    });
    updateRecent(userId, nextAudio.id, nextAudio, recentID, setRecentID, recentData, setRecentData);
    return;
  } catch (e) {
    console.log("error inside change audio method", e);
  }
};
