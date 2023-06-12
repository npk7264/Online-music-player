import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

import { Audio } from "expo-av";

// FETCH ALL SONGS
export const fetchSongs = async () => {
  const querySnapshot = await getDocs(collection(db, "songs"));
  const songsArray = querySnapshot.docs.map((docRef) => ({
    id: docRef.id,
    name: docRef.data().name,
    image: docRef.data().image,
    public: docRef.data().public,
    singer: docRef.data().artists,
    album: docRef.data().album,
    uri: docRef.data().url,
    lyric: docRef.data().lyric,
  }));

  return songsArray;
};

//Fetch limit song
export const loadSongs = async (listSong, limitSong, lastVisibleSong) => {
  // const limitSong = 10;
  const songsCollection = collection(db, "songs");
  let q = null;
  // console.log(listSong.length)
  if (listSong.length > 0) {
    // const lastVisibleSong = listSong[listSong.length - 1];
    // console.log(lastVisibleSong);
    q = query(
      songsCollection,
      orderBy("view", "desc"),
      orderBy("public", "desc"),
      startAfter(lastVisibleSong),
      limit(limitSong)
    );
  } else
    q = query(
      songsCollection,
      orderBy("view", "desc"),
      orderBy("public", "desc"),
      limit(limitSong)
    );

  const querySnapshot = await getDocs(q);

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const songsArray = querySnapshot.docs.map((docRef) => ({
    id: docRef.id,
    name: docRef.data().name,
    image: docRef.data().image,
    public: docRef.data().public,
    singer: docRef.data().artists,
    album: docRef.data().album,
    uri: docRef.data().url,
    lyric: docRef.data().lyric,
  }));
  // console.log([songsArray, lastVisible])
  return [songsArray, lastVisible];
};
//fetch limit singer
export const loadSinger = async (
  listSinger,
  limitSinger,
  lastVisibleSinger
) => {
  const singerCollection = collection(db, "artists");
  let q = null;
  if (listSinger.length > 0)
    q = query(
      singerCollection,
      orderBy("follower", "desc"),
      startAfter(lastVisibleSinger),
      limit(limitSinger)
    );
  else
    q = query(
      singerCollection,
      orderBy("follower", "desc"),
      limit(limitSinger)
    );

  const querySnapshot = await getDocs(q);

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  const singerArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    image: doc.data().image,
    follower: doc.data().follower,
  }));
  return [singerArray, lastVisible];
};

//fetch limit album
export const loadAlbum = async (listAlbum, limitAlbum, lastVisibleAlbum) => {
  const albumCollection = collection(db, "albums");
  let q = null;
  if (listAlbum.length > 0)
    q = query(
      albumCollection,
      orderBy("public", "desc"),
      startAfter(lastVisibleAlbum),
      limit(limitAlbum)
    );
  else q = query(albumCollection, orderBy("public", "desc"), limit(limitAlbum));
  const querySnapshot = await getDocs(q);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  let albumData = [];
  for (const docRef of querySnapshot.docs) {
    const album = docRef.data();

    // get singer
    const signer = await getDoc(album.singer);
    //object song
    const song = {
      id: docRef.id,
      name: album.name,
      image: album.image,
      singer: signer.data().name,
      idSinger: signer.id,
      public: album.public,
    };
    albumData.push(song);
  }

  return [albumData, lastVisible];
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
  // const songs = await fetchSongs();
  const data = await fetchRecent(doc(db, "users/" + userId));
  let recentList = data.recently;
  const recentestSong =
    recentList != [] ? songData.find((item) => item.id == recentList[0]) : {};

  // PHÁT NỀN
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
  });

  await updateState(context, {
    userId: userId,
    soundObj: null,
    // songData: songs,
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

//Fetch all artist

export const fetchAllArtist = async () => {
  const querySnapshot = await getDocs(collection(db, "artists"));
  const artistData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    image: doc.data().image,
    follower: doc.data().follower,
  }));
  // console.log(artistData);
  return artistData;
};

//Fetch 1 artist
export const fetchOneArtist = async (address) => {
  const docRef = doc(db, address);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data(), docSnap.id)

  const singer = {
    name: docSnap.data().name,
    follower: docSnap.data().follower,
    image: docSnap.data().image,
  };
  return singer;
};

export const fetchFollowArtist = async (address) => {
  const docRef = doc(db, address);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data(), docSnap.id)

  return docSnap.data().follower;
};

//fetch all song of artist
export const fetchSongOfArtist = async (idSigner) => {
  const songRef = collection(db, "songs");
  const q = query(songRef, where("artists.id", "==", idSigner));
  const querySnapshot = await getDocs(q);
  const songsArray = querySnapshot.docs.map((docRef) => ({
    id: docRef.id,
    name: docRef.data().name,
    image: docRef.data().image,
    // public: docRef.data().public,
    singer: docRef.data().artists,
    album: docRef.data().album,
    uri: docRef.data().url,
    lyric: docRef.data().lyric,
    // view: docRef.data().view
  }));
  // console.log(songsArray);
  return songsArray;
};

//fetch all album
export const fetchAllAlbum = async () => {
  const querySnapshot = await getDocs(collection(db, "albums"));
  let albumData = [];
  for (const docRef of querySnapshot.docs) {
    const album = docRef.data();

    // get singer
    const signer = await getDoc(album.singer);
    //object song
    const song = {
      id: docRef.id,
      name: album.name,
      image: album.image,
      singer: signer.data().name,
      idSinger: signer.id,
      public: album.public,
    };
    albumData.push(song);
  }
  // console.log(artistData);
  return albumData;
};

//fetch top song
export const fetchTopSong = async () => {
  const songsRef = collection(db, "songs");
  const q = query(
    songsRef,
    orderBy("view", "desc"),
    orderBy("public", "desc"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  const songsArray = querySnapshot.docs.map((docRef) => ({
    id: docRef.id,
    name: docRef.data().name,
    image: docRef.data().image,
    public: docRef.data().public,
    singer: docRef.data().artists,
    album: docRef.data().album,
    uri: docRef.data().url,
    lyric: docRef.data().lyric,
    view: docRef.data().view,
  }));
  return songsArray;
};

// SEARCH
export const searchSong = async (text, setResult) => {
  if (text.trim() !== "") {
    try {
      const querySnapshot = await getDocs(collection(db, "songs"));

      // Lọc các bản ghi chứa chuỗi "text"
      const filteredDocs = querySnapshot.docs.filter((doc) => {
        return doc.data().name.toLowerCase().includes(text.toLowerCase()); // Thay "name" bằng trường tên bài hát của bạn
      });

      // Xử lý các bản ghi đã lọc được
      const songsArray = filteredDocs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        public: doc.data().public,
        singer: doc.data().artists,
        album: doc.data().album,
        uri: doc.data().url,
        lyric: doc.data().lyric,
        view: doc.data().view,
      }));

      setResult(songsArray);
    } catch (error) {
      console.log("Fail to fetch history songs", error);
    }
  } else setResult([]);
};

export const searchSinger = async (text, setResult) => {
  if (text.trim() !== "") {
    try {
      const querySnapshot = await getDocs(collection(db, "artists"));

      // Lọc các bản ghi chứa chuỗi "text"
      const filteredDocs = querySnapshot.docs.filter((doc) => {
        return doc.data().name.includes(text); // Thay "name" bằng trường tên bài hát của bạn
      });

      // Xử lý các bản ghi đã lọc được
      const songsArray = filteredDocs.map((doc) => {
        return doc.data();
      });

      setResult(songsArray);
    } catch (error) {
      console.log("Fail to fetch history songs", error);
    }
  } else setResult([]);
};
