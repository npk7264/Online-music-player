import { Alert, Share } from 'react-native';
import { fetchSongOfArtist } from "../utils/FirebaseHandler";
import { selectSong } from "../utils/AudioController"

// Hàm chia sẻ thông tin nhạc
const onShare = async (item, type) => {
    try {
        const result = await Share.share({
            message: type === "song" ?
                `My Music App 🎵🥁\nBài hát: ${song.name}
          \nCa sĩ trình bày: ${song.singer.name}
          \nlinkApp:https://github.com/npk7264/OfflineMusicPlayer`: `My Music App 🎵🥁\nCa sĩ: ${item.name}\nlinkApp:https://github.com/npk7264/OfflineMusicPlayer`,
            title: "My Music App 🎵🥁"
        },);
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        Alert.alert(error.message);
    }
};

//Con thieu tha yeu thich
export const optionSong = [
    {
        title: "playNext",
        icon: "keyboard-tab",
        onPress: (item, contextAudio) => {
            console.log(`play next ${item.name}`);
            const { currentAudioIndex, updateState, songData } = contextAudio;
            const newSongData = [...songData]
            newSongData.splice(currentAudioIndex + 1, 0, item)
            updateState(contextAudio, { songData: newSongData })
        },
    },
    {
        title: "addToQueue",
        icon: "add-to-queue",
        onPress: (item, contextAudio) => {
            console.log(`add queue ${item.name}`);
            const { updateState, songData } = contextAudio;
            updateState(contextAudio, { songData: [...songData, item] })
        },
    },
    {
        title: "addToPlaylist",
        icon: "add-circle-outline",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`add playlist ${item.name}`);
            navigation.navigate('AddOneSong', { item })
        },
    },
    {
        title: "goToArtist",
        icon: "person-outline",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`go artist ${item.name}`);
            navigation.navigate('ArtistDetail', { id: item.singer.id, name: item.singer.name, image: item.singer.image })
        },
    },
    {
        title: "goToAlbum",
        icon: "album",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`go album ${item.name}`);
            navigation.navigate('AlbumDetail', { singer: item.singer.name, id: item.album })
        },
    },
    // {
    //     title: "Set as Ringtone",
    //     icon: "settings-phone",
    //     onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
    //         console.log(`set ringtone ${item.name}`);
    //     },
    // },
    {
        title: "share",
        icon: "share",
        onPress: (item) => {
            console.log(`share ${item.name}`);
            onShare(item, "song");
        },
    },
];

export const optionSinger = [
    {
        title: "play",
        icon: "play-circle-fill",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation, contextNotify) => {
            const startFunction = async () => {
                console.log(`play ${item.name}`);
                const listSong = await fetchSongOfArtist(item.id);
                console.log(listSong[0]);
                selectSong(contextAudio, listSong[0], listSong, contextPlaylist, contextNotify);
            }
            startFunction();
        },
    },
    // {
    //     title: "Play Next",
    //     icon: "keyboard-tab",
    //     onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
    //         console.log(`play next ${item.name}`);
    //     },
    // },
    {
        title: "addToQueue",
        icon: "add-to-queue",
        onPress: async (item, contextAudio) => {
            console.log(`add queue ${item.name}`);
            const listSong = await fetchSongOfArtist(item.id);
            contextAudio.updateState(contextAudio, { songData: [...contextAudio.songData, ...listSong] });
        },
    },
    // {
    //     title: "Add to playlist",
    //     icon: "add-circle-outline",
    //     onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
    //         console.log(`add playlist ${item.name}`);
    //     },
    // },
    {
        title: "share",
        icon: "share",
        onPress: (item) => {
            console.log(`share ${item.name}`);
            onShare(item, "singer");
        },
    },

];