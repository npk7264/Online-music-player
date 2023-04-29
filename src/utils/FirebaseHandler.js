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
