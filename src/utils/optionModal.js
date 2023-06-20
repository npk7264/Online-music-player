import { Alert, Share } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

// Hàm chia sẻ thông tin nhạc
const onShare = async (song) => {
    try {
        const result = await Share.share({
            message:
                `Bài hát: ${song.name}
          \nCa sĩ trình bày: ${song.singer.name}
          \nlinkApp:https://github.com/npk7264/OfflineMusicPlayer`,
            title: "My Music App 🎵🥁"
        },);
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log("🚀 ~ file: optionModal.js:14 ~ onShare ~ result.activityType:", result.activityType)
                // shared with activity type of result.activityType
            } else {
                // shared
                console.log("🚀 ~ file: optionModal.js:18 ~ onShare ~ result.activityType 2:", result.activityType)
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
        title: "Play Next",
        icon: "keyboard-tab",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`play next ${item.name}`);
            const { currentAudioIndex, updateState, songData } = contextAudio;
            const newSongData = [...songData]
            newSongData.splice(currentAudioIndex + 1, 0, item)
            updateState(contextAudio, { songData: newSongData })
        },
    },
    {
        title: "Add to Playing queue",
        icon: "add-to-queue",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`add queue ${item.name}`);
            const { updateState, songData } = contextAudio;
            updateState(contextAudio, { songData: [...songData, item] })
        },
    },
    {
        title: "Add to playlist",
        icon: "add-circle-outline",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`add playlist ${item.name}`);
        },
    },
    {
        title: "Go to Artist",
        icon: "person-outline",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`go artist ${item.name}`);
            navigation.navigate('ArtistDetail', { id: item.singer.id, name: item.singer.name, image: item.singer.image })
        },
    },
    {
        title: "Go to Album",
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
        title: "Share",
        icon: "share",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`share ${item.name}`);
            onShare(item);
        },
    },
];

export const optionSinger = [
    {
        title: "Play",
        icon: "play-circle-fill",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`play ${item.name}`);
        },
    },
    {
        title: "Play Next",
        icon: "keyboard-tab",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`play next ${item.name}`);
        },
    },
    {
        title: "Add to Playing queue",
        icon: "add-to-queue",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`add queue ${item.name}`);
        },
    },
    {
        title: "Add to playlist",
        icon: "add-circle-outline",
        onPress: (item, contextAudio, contextData, contextPlaylist, navigation) => {
            console.log(`add playlist ${item.name}`);
        },
    },

];