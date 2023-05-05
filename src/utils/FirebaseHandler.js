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

// FETCH ALL SONGS
export const fetchSongs = async () => {
  const querySnapshot = await getDocs(collection(db, "songs"));
  const songsArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(songsArray);
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
      recently: [...recentList, audioId],
    });
  } catch (e) {
    alert("Failed to save recent song!", e);
  }
};
