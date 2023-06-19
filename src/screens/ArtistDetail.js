import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BackBar from "../components/BackBar";
import {
  fetchSongOfArtist,
  fetchFollowArtist,
  updateFollowArtistAndUser,
  fetchDataArtistFollowedByUser,
} from "../utils/FirebaseHandler";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import FlatListSong from "../components/FlatListSong";
import MiniPlayer from "../components/MiniPlayer";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";

const ArtistDetail = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const {
    listIDArtistFollowing,
    setListIDArtistFollowing,
    setArtistFollowing,
  } = useContext(DataContext);
  const { userId, currentAudio } = useContext(AudioContext);
  const [artist, setArtist] = useState({});
  const [listSong, setListSong] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

  const id = route.params.id;
  const artistName = route.params.name;
  const artistImage = route.params.image;

  //check Follow
  const checkFollow = async () => {
    if (listIDArtistFollowing) {
      setIsFollowed(listIDArtistFollowing?.includes(id));
      console.log(true);
    } else {
      setIsFollowed(false);
      console.log(false);
    }
  };

  const handleFollow = async () => {
    try {
      //Thêm hoặc bớt singer ra khỏi danh sách đang follow
      if (isFollowed) {
        const newListFollow = listIDArtistFollowing?.filter(
          (item) => item !== id
        );
        setIsFollowed(false);
        setListIDArtistFollowing([...newListFollow]);
        setArtist({ ...artist, follower: artist.follower - 1 });
        updateFollowArtistAndUser(userId, id, "unfollow", newListFollow);

        const listInfArtist = await fetchDataArtistFollowedByUser(
          newListFollow
        );
        setArtistFollowing(listInfArtist);
        console.log("unfollow");
      } else {
        const newListFollow = listIDArtistFollowing
          ? [...listIDArtistFollowing, id]
          : [id];
        setIsFollowed(true);
        setListIDArtistFollowing([...newListFollow]);
        setArtist({ ...artist, follower: artist.follower + 1 });
        updateFollowArtistAndUser(userId, id, "follow", newListFollow);

        const listInfArtist = await fetchDataArtistFollowedByUser(
          newListFollow
        );
        setArtistFollowing(listInfArtist);
        console.log("follow");
      }
    } catch (e) {
      console.log("Fail to follow artist: ", e);
    }
  };

  //fetch data singer
  useEffect(() => {
    const fetchData = async () => {
      const follower = await fetchFollowArtist(`artists/${id}`);
      setArtist({
        id,
        name: artistName,
        image: artistImage,
        follower,
      });
      //   console.log(listIDArtistFollowing);
      await checkFollow();
      const songData = await fetchSongOfArtist(id);
      setListSong(songData);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <BackBar isSearch={true}></BackBar>
      <View style={styles.header}>
        {/* info singer */}
        <Image source={{ uri: artist?.image }} style={styles.poster} />
        <Text style={[styles.singer, { color: colors.text }]}>
          {artist?.name}
        </Text>
        <Text style={styles.numSong}>{artist?.follower} người theo dõi</Text>
        {/* button */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleFollow}
          >
            <SimpleLineIcons
              name={!isFollowed ? "user-follow" : "user-following"}
              size={20}
              color="white"
            />
            <Text style={[styles.buttonText, { color: "white" }]}>
              {!isFollowed ? "Theo dõi" : "Đã theo dõi"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.frame }]}
          >
            <Ionicons name="play-circle" size={20} color={colors.primary} />
            <Text style={[styles.buttonText, { color: colors.primary }]}>
              Play
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* line */}
      <View style={styles.line}></View>

      {/* list song */}
      <FlatListSong songs={listSong} />

      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default ArtistDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    // flex: 1,
    marginTop: 10,
    // justifyContent: 'center',
    alignItems: "center",
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 35,
  },
  singer: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 10,
    fontFamily: "sans-serif",
  },
  numSong: {
    fontSize: 15,
    // marginTop: 10,
    color: "gray",
    fontFamily: "sans-serif",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    height: 45,
    width: 160,
    backgroundColor: "#ff973e",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  line: {
    borderColor: "#efefef",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 25,
  },
});
