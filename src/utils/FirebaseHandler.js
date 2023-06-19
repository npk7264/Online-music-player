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
  documentId,
  increment,

} from "firebase/firestore";

import { getTopGenre } from "./helper";
// import jsrmvi from "jsrmvi";
import { removeVI, DefaultOption } from "jsrmvi";

import { Audio } from "expo-av";

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

//fetch limit singer for Suggested screen
export const fetchSingerAllLimit = async (limitSinger) => {
  try {
    const singerCollection = collection(db, "artists");
    const q = query(
      singerCollection,
      orderBy("follower", "desc"),
      limit(limitSinger)
    );
    const querySnapshot = await getDocs(q);
    const singerArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      image: doc.data().image,
      follower: doc.data().follower,
    }));
    return singerArray;
  } catch (e) {
    console.log("🚀 ~ file: FirebaseHandler.js:119 ~ fetchSingerAllLimit ~ e:", e)

  }
}

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

// UPDATE RECENT and update genre
export const updateRecent = async (userId, audioId, audio, recentID, setRecentID, recentData, setRecentData) => {
  // const start = performance.now();

  const userRef = doc(db, "users/" + userId);
  let data = await fetchRecent(userRef);
  let recentList = recentID.filter((item) => {
    return item != audioId;
  });

  let recentListData = recentData.filter((item) => {
    return item.id != audioId;
  });


  const songRef = doc(db, "songs/" + audioId);


  //update thong ke genre
  let songDetail = await fetchDetailSong(songRef);
  const genreCount = data.genre ? data.genre : null;
  const updateDataUser = {};
  songDetail.genre.forEach((key) => {
    updateDataUser[`genre.${key}`] =
      genreCount !== null && genreCount[key] !== undefined
        ? genreCount[key] + 1
        : 1;
  });


  //update recent
  updateDataUser["recently"] = [audioId, ...recentList];
  setRecentID([audioId, ...recentList]);
  setRecentData([audio, ...recentListData]);


  try {
    updateDoc(userRef, updateDataUser);
    updateDoc(songRef, {
      view: increment(1),
    });
  } catch (e) {
    alert("Failed to save recent song!", e);
  }

  // const end = performance.now();
  // console.log(`Execution time: ${end - start} ms`);

};

// FETCH USER
export const fetchUser = async (userId) => {
  try {
    const docRef = doc(db, "users/" + userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log("Fail to fetch user name", error);
  }
};

export const fetchRecentestSong = async (userId, context) => {
  const { updateState } = context;

  const data = await fetchRecent(doc(db, "users/" + userId));
  let recentestId = data.recently[0];
  console.log(userId);

  if (recentestId != undefined) {
    const songRef = doc(db, "songs", recentestId);

    const songSnapshot = await getDoc(songRef);
    const song = {
      id: songSnapshot.id,
      name: songSnapshot.data().name,
      image: songSnapshot.data().image,
      public: songSnapshot.data().public,
      singer: songSnapshot.data().artists,
      album: songSnapshot.data().album,
      uri: songSnapshot.data().url,
      lyric: songSnapshot.data().lyric,
      view: songSnapshot.data().view,
    };

    await updateState(context, {
      userId: userId,
      playbackObj: new Audio.Sound(),
      soundObj: null,
      songData: [song],
      currentAudio: song,
      playbackPosition: data.songPosition ? data.songPosition : null,
      playbackDuration: data.songDuration ? data.songDuration : null,
    });
  } else {
    await updateState(context, {
      userId: userId,
      playbackObj: new Audio.Sound(),
      soundObj: null,
    });
  }
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

//fetch all song of album
export const fetchSongOfAlbum = async (idAlbum) => {
  try {
    const songRef = collection(db, "songs");
    const q = query(songRef, where("album", "==", idAlbum));
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
  } catch (error) {
    console.log("🚀 ~ file: FirebaseHandler.js:302 ~ fetchSongOfAlbum ~ error:", error)
  }
};

//get suggested song list from genre statistics
export const fetchSongListFromGenreStatistics = async (userId, limitSong) => {
  try {
    //lấy danh sách top thể loại nghe nhiều của user
    const userSnap = await getDoc(doc(db, "users/" + userId));
    //lấy danh sách bài hát từ thể loại đã tìm được
    if (userSnap.data().genre) {
      const topGenre = getTopGenre(userSnap.data().genre, 3);
      const querySong = query(collection(db, 'songs'), where("genre", "array-contains-any", topGenre), orderBy("view", "desc"), orderBy("public", "desc"), limit(limitSong));
      const querySnapshot = await getDocs(querySong);
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
      }))
      return songsArray;
    }
    return null;
  } catch (error) {
    console.log("🚀 ~ file: FirebaseHandler.js:314 ~ fetchSongListFromGenreStatistics ~ error:", error);
  }

}

//fetch one album
export const fetchOneAlbum = async (idAlbum) => {
  try {
    const ref = doc(db, 'albums/' + idAlbum);
    const snapShot = await getDoc(ref);
    return { image: snapShot.data().image, name: snapShot.data().name };
  }
  catch (error) {
    console.log("🚀 ~ file: FirebaseHandler.js:321 ~ fetchOneAlbum ~ error:", error)
  }
}


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

//fetch favorite
export const fetchFavorite = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, "users/" + userId));
    const userData = docSnap.data();
    const favorite = userData.favorite;

    const songsRef = collection(db, "songs");
    const q = query(songsRef, where(documentId(), "in", favorite));

    const querySnapshot = await getDocs(q);

    const songsArray = await Promise.all(
      querySnapshot.docs.map((docRef) => {
        const songData = {
          id: docRef.id,
          name: docRef.data().name,
          image: docRef.data().image,
          public: docRef.data().public,
          singer: docRef.data().artists,
          album: docRef.data().album,
          uri: docRef.data().url,
          lyric: docRef.data().lyric,
          view: docRef.data().view,
        };
        return songData;
      })
    );
    const sortedSongs = songsArray.sort((a, b) => {
      const indexA = favorite.indexOf(a.id);
      const indexB = favorite.indexOf(b.id);
      return indexA - indexB;
    });
    return sortedSongs;
    // console.log(songsArray);
  } catch (error) {
    console.log("Fail to fetch favorite songs", error);
  }
};

//fetch recent
export const getRecent = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, "users/" + userId));
    const userData = docSnap.data();
    const history = userData.recently;

    const songsRef = collection(db, "songs");
    const q = query(songsRef, where(documentId(), "in", history));

    const querySnapshot = await getDocs(q);

    const songsArray = await Promise.all(
      querySnapshot.docs.map((docRef) => {
        const songData = {
          id: docRef.id,
          name: docRef.data().name,
          image: docRef.data().image,
          public: docRef.data().public,
          singer: docRef.data().artists,
          album: docRef.data().album,
          uri: docRef.data().url,
          lyric: docRef.data().lyric,
          view: docRef.data().view,
        };
        return songData;
      })
    );
    const sortedSongs = songsArray.sort((a, b) => {
      const indexA = history.indexOf(a.id);
      const indexB = history.indexOf(b.id);
      return indexA - indexB;
    });
    return sortedSongs;
    // console.log(songsArray);
  } catch (error) {
    console.log("Fail to fetch history songs", error);
  }
};

// convert VN text to EN text
function VN_to_EN(text) {
  const result = removeVI(text, { replaceSpecialCharacters: false });
  return result;
}

// SEARCH SONG
export const searchSong = async (text, setResult) => {
  if (text.trim() !== "") {
    text = text.trim();
    try {
      const querySnapshot = await getDocs(collection(db, "songs"));

      // Lọc các bản ghi chứa chuỗi "text"
      const filteredDocs = querySnapshot.docs.filter((doc) => {
        // tìm kiếm tương đối
        return VN_to_EN(text)
          .split(" ")
          .some((char) => VN_to_EN(doc.data().name).includes(char));
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
      console.log("Fail to SEARCH songs", error);
    }
  } else setResult([]);
};

// SEARCH SINGER
export const searchSinger = async (text, setResult) => {
  if (text.trim() !== "") {
    text = text.trim();
    try {
      const querySnapshot = await getDocs(collection(db, "artists"));

      // Lọc các bản ghi chứa chuỗi "text"
      const filteredDocs = querySnapshot.docs.filter((doc) => {
        // tìm kiếm tương đối
        return VN_to_EN(text)
          .split(" ")
          .some((char) => VN_to_EN(doc.data().name).includes(char));
      });

      // Xử lý các bản ghi đã lọc được
      const songsArray = filteredDocs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setResult(songsArray);
    } catch (error) {
      console.log("Fail to SEARCH artists", error);
    }
  } else setResult([]);
};

//fetch limit genre
export const fetchGenre = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "genre"));

    const genreArray =
      querySnapshot.docs.map((docRef) => ({
        ...docRef.data(),
        id: docRef.id,
      }))

    return genreArray;
  } catch (error) {
    console.log("Fail to fetch history songs", error);
  }
}
// fetch Top Song By Genre
export const fetchTopSongByGenre = async (id, topNumber) => {
  try {
    const q = query(
      collection(db, "songs"),
      where("genre", "array-contains", id),
      orderBy("view", "desc"),
      orderBy("public", "desc"),
      limit(topNumber)
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
  } catch (e) {
    console.log("🚀 ~ file: FirebaseHandler.js:567 ~ fetchTopSongByGenre ~ e:", e)

  }
}
//fetch song by genre
export const fetchSongByIDGenre = async (id) => {
  try {
    const q = query(
      collection(db, "songs"),
      where("genre", "array-contains", id),
      orderBy("view", "desc"),
      orderBy("public", "desc")
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
  } catch (e) {
    console.log("🚀 ~ file: FirebaseHandler.js:616 ~ fetchSongByIDGenre ~ e:", e)
  }
}

//update artist when is unfollow or follow by user
export const updateFollowArtistAndUser = async (userId, artistId, type, listIDArtistFollowing) => {
  try {
    updateDoc(doc(db, `users/${userId}`), { follow: listIDArtistFollowing })
    updateDoc(doc(db, `artists/${artistId}`), { follower: type === "unfollow" ? increment(-1) : increment(1) })
  } catch (e) {
    console.log("🚀 ~ file: FirebaseHandler.js:636 ~ updateFollowArtistAndUser ~ e:", e)
  }
}

//fetch Data Artist Followed By User
export const fetchDataArtistFollowedByUser = async (listIDArtist) => {
  try {
    if (!listIDArtist)
      return null;
    const q = query(collection(db, "artists"), where(documentId(), "in", listIDArtist));
    const querySnapshot = await getDocs(q);
    const artistArray = querySnapshot.docs.map((docRef) => ({
      id: docRef.id,
      ...docRef.data(),
    }));
    return artistArray;

  } catch (e) {
    console.log("🚀 ~ file: FirebaseHandler.js:644 ~ fetchDataArtistFollowedByUser ~ e:", e)
  }
}

// save to favorite
export const saveFavorite = async (userId, currentAudio, favoriteData, setFavoriteData, setFavoriteID, favoriteID) => {
  const docRef = doc(db, "users/" + userId);
  try {
    setFavoriteData([currentAudio, ...favoriteData])
    setFavoriteID([currentAudio.id, ...favoriteID]);
    updateDoc(docRef, {
      favorite: [currentAudio.id, ...favoriteID],
    });
  } catch (e) {
    alert("Failed to save favorite song!", e);
  }
};

// remove from favorite
export const removeFavorite = async (userId, currentAudio, favoriteData, setFavoriteData, setFavoriteID, favoriteID) => {
  const docRef = doc(db, "users/" + userId);
  try {
    const newfavoriteID = favoriteID.filter((item) => {
      return item != currentAudio.id;
    });
    const newFavoriteData = favoriteData.filter((item) => {
      return item.id != currentAudio.id;
    });
    setFavoriteData(newFavoriteData);
    setFavoriteID(newfavoriteID);
    updateDoc(docRef, {
      favorite: newfavoriteID,
    });
  } catch (e) {
    alert("Failed to remove favorite song!", e);
  }
};