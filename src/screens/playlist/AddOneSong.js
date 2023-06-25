import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import BackBar from "../../components/BackBar";
import PlaylistItem from "../../components/PlaylistItem";
import AddPlaylist from "./AddPlaylist";

import { Feather } from "@expo/vector-icons";
import { AudioContext } from "../../context/AudioContext";
import { ThemeContext } from "../../context/ThemeContext.js";
import { PlaylistContext } from "../../context/PlaylistContext";
import MiniPlayer from "../../components/MiniPlayer";

import { auth, db } from "../../services/firebaseConfig";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
// import { async } from "@firebase/util";

import { useNavigation } from "@react-navigation/native";

const AddOneSong = ({ route }) => {
    const song = route.params.item;
    const navigation = useNavigation();
    const { colors, language } = useContext(ThemeContext);
    const { playlistArray, setPlaylistArray, addOneSongToPlaylist } = useContext(PlaylistContext);
    const [addPlaylist, setAddPlaylist] = useState(false);
    const { userId, currentAudio } = useContext(AudioContext);

    const fetchPlaylist = async () => {
        const querySnapshot = await getDocs(
            collection(db, `users/${userId}/playlist`)
        );

        const playlistData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setPlaylistArray(playlistData);
    };
    const checkPlaylist = (playlist) => {
        const check = async () => {
            setPlaylistArray([playlist, ...playlistArray])
            setAddPlaylist(false);
            await addOneSongToPlaylist(song.id, playlist);
            navigation.goBack();
        }
        check();
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchPlaylist();
        };
        if (playlistArray.length === 0)
            fetchData();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar></StatusBar>

            <BackBar title={language.addToPlaylist} />

            <FlatList
                data={[
                    { id: "add", name: language.addPlaylist },
                    ...playlistArray,
                ]}
                renderItem={({ item }) => {
                    if (item.id === "add") {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    height: 70,
                                    paddingVertical: 5,
                                    paddingHorizontal: 20,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                onPress={() => setAddPlaylist(true)}
                            >
                                <View style={styles.poster}>
                                    <Feather name="plus" size={24} color="white" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{ fontSize: 18, color: colors.text }}
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <PlaylistItem
                                id={item.id}
                                name={item.name}
                                numSong={item.numSong}
                                action={{ action: "add", idSong: song.id, Playlist: item }}
                            />
                        );
                    }
                }}
                nestedScrollEnabled={false}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                    <View style={{ flex: 1 }}>
                        {/* modal add new playlist */}
                        <AddPlaylist
                            visible={addPlaylist}
                            onClose={() => setAddPlaylist(false)}
                            checkPlaylist={checkPlaylist}
                        />
                    </View>
                )}
            />


            {currentAudio && <MiniPlayer />}
        </SafeAreaView>
    )
}

export default AddOneSong

const styles = StyleSheet.create({
    poster: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 50,
        backgroundColor: "#ff8216",
        alignItems: "center",
        justifyContent: "center",
    },
})