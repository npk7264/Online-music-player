export const optionSong = [
    {
        title: "Play Next",
        icon: "keyboard-tab",
        onPress: (item) => {
            console.log(`play next ${item.name}`);
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

export const optionSinger = [
    {
        title: "Play Next",
        icon: "keyboard-tab",
        onPress: (item) => {
            console.log(`play next ${item.song}`);
        },
    },
    {
        title: "Add to playlist",
        icon: "add-circle-outline",
        onPress: (item) => {
            console.log(`add playlist ${item.song}`);
        },
    },
];