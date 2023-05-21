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
import { Audio } from "expo-av";

// FETCH ALL SONGS
export const fetchSongs = async () => {
  const querySnapshot = await getDocs(collection(db, "songs"));
  const songsArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return songsArray;
};

export const fetchDetailSong = async (docRef) => {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log("Fail to fetch detail song", error);
  }
};

// SAVE RECENT
export const fetchRecent = async (docRef) => {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log("Fail to fetch recent songs", error);
  }
};

// UPDATE RECENT
export const updateRecent = async (userId, audioId) => {
  const userRef = doc(db, "users/" + userId);
  let data = await fetchRecent(userRef);
  let recentList = data.recently.filter((item) => {
    return item != audioId;
  });

  const songRef = doc(db, "songs/" + audioId);
  let songDetail = await fetchDetailSong(songRef);

  try {
    await updateDoc(userRef, {
      recently: [audioId, ...recentList],
    });
    await updateDoc(songRef, {
      view: songDetail.view + 1,
    });
  } catch (e) {
    alert("Failed to save recent song!", e);
  }
};

// FETCH USER
export const fetchUser = async (userId, setUserName) => {
  try {
    const docRef = doc(db, "users/" + userId);
    const docSnap = await getDoc(docRef);
    setUserName(docSnap.data().name);
  } catch (error) {
    console.log("Fail to fetch user name", error);
  }
};

export const fetchRecentestSong = async (userId, context) => {
  const { songData, updateState } = context;
  const songs = await fetchSongs();
  const data = await fetchRecent(doc(db, "users/" + userId));
  let recentList = data.recently;
  const recentestSong =
    recentList != [] ? songs.find((item) => item.id == recentList[0]) : {};

  // PHÁT NỀN
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
  });

  await updateState(context, {
    userId: userId,
    soundObj: null,
    songData: songs,
    currentAudio: recentestSong,
    playbackObj: new Audio.Sound(),
    playbackPosition: data.songPosition ? data.songPosition : null,
    playbackDuration: data.songDuration ? data.songDuration : null,
  });
  // console.log("lastPosition", data.songPosition);
};

// UPDATE POSITION OF SONG
export const updateRecentestPositon = async (userId, position, duration) => {
  const userRef = doc(db, "users/" + userId);

  try {
    await updateDoc(userRef, {
      songPosition: position,
      songDuration: duration,
    });
  } catch (e) {
    alert("Failed to save recent song!", e);
  }
};
