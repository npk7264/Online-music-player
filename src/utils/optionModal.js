
//Con thieu tha yeu thich
export const optionSong = [
    {
        title: "Play Next",
        icon: "keyboard-tab",
        onPress: (item) => {
            console.log(`play next ${item.name}`);
        },
    },
    {
        title: "Add to Playing queue",
        icon: "add-to-queue",
        onPress: (item) => {
            console.log(`add queue ${item.name}`);
        },
    },
    {
        title: "Add to playlist",
        icon: "add-circle-outline",
        onPress: (item) => {
            console.log(`add playlist ${item.name}`);
        },
    },
    {
        title: "Go to Album",
        icon: "album",
        onPress: (item) => {
            console.log(`go album ${item.name}`);
        },
    },
    {
        title: "Set as Ringtone",
        icon: "settings-phone",
        onPress: (item) => {
            console.log(`set ringtone ${item.name}`);
        },
    },
    {
        title: "Share",
        icon: "share",
        onPress: (item) => {
            console.log(`share ${item.name}`);
        },
    },
];

export const optionSinger = [
    {
        title: "Play",
        icon: "play-circle-fill",
        onPress: (item) => {
            console.log(`play ${item.name}`);
        },
    },
    {
        title: "Play Next",
        icon: "keyboard-tab",
        onPress: (item) => {
            console.log(`play next ${item.name}`);
        },
    },
    {
        title: "Add to Playing queue",
        icon: "add-to-queue",
        onPress: (item) => {
            console.log(`add queue ${item.name}`);
        },
    },
    {
        title: "Add to playlist",
        icon: "add-circle-outline",
        onPress: (item) => {
            console.log(`add playlist ${item.name}`);
        },
    },

];