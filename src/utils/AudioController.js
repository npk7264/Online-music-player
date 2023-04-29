import { Audio } from "expo-av";
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

export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync(uri, {
      shouldPlay: true,
      progressUpdateIntervalMillis: 1000,
    });
  } catch (error) {
    console.log("error inside play helper method", error.message);
  }
};

export const pause = async (playbackObj) => {
  try {
    return await playbackObj.pauseAsync();
  } catch (error) {
    console.log("error inside pause helper method", error.message);
  }
};

export const resume = async (playbackObj) => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log("error inside resume helper method", error.message);
  }
};

export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error) {
    console.log("error inside playNext helper method", error.message);
  }
};

export const selectSong = async (context, audio) => {
  const {
    userId,
    soundObj,
    playbackObj,
    currentAudio,
    isPlaying,
    onPlaybackStatusUpdate,
    updateAudioState,
  } = context;
  try {
    // play audio first time
    if (soundObj === null) {
      const status = await play(playbackObj, audio.url);
      await updateAudioState({
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        playbackDuration: status.durationMillis,
      });
      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      // lưu vào lịch sử nghe
      updateRecent(userId, audio.id);
      return;
    }

    // pause audio
    if (isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playbackObj);
      await updateAudioState({
        soundObj: status,
        isPlaying: false,
      });
      return;
    }

    // resume audio
    if (!isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playbackObj);
      await updateAudioState({
        soundObj: status,
        isPlaying: true,
      });
      return;
    }

    // play other audio
    if (currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.url);
      await updateAudioState({
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        isLooping: false,
        playbackDuration: status.durationMillis,
      });
      // lưu vào lịch sử nghe
      updateRecent(userId, audio.id);
      return;
    }
  } catch (error) {
    console.log("error inside select song method", error.message);
  }
};


// SAVE RECENT
const fetchRecent = async (docRef) => {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data().recently;
  } catch (error) {
    console.log("Fail to fetch recent songs", error);
  }
};

const updateRecent = async (userId, audioId) => {
  const docRef = doc(db, "users/" + userId);
  let recentList = await fetchRecent(docRef);
  recentList = recentList.filter((item) => {
    return item != audioId;
  });
  try {
    await updateDoc(docRef, {
      recently: [...recentList, audioId],
    });
  } catch (e) {
    alert("Failed to save recent song!", e);
  }
};
