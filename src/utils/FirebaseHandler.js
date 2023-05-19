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

// SAVE RECENT
export const fetchRecent = async (docRef) => {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data().recently;
  } catch (error) {
    console.log("Fail to fetch recent songs", error);
  }
};

// UPDATE RECENT
export const updateRecent = async (userId, audioId) => {
  const docRef = doc(db, "users/" + userId);
  let recentList = await fetchRecent(docRef);
  recentList = recentList.filter((item) => {
    return item != audioId;
  });
  try {
    await updateDoc(docRef, {
      recently: [audioId, ...recentList],
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
  // console.log(songData)
  const songs = await fetchSongs();
  const recentList = await fetchRecent(doc(db, "users/" + userId));
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
  });
};
