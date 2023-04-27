export const songs = [
  {
    id: 1,
    name: "Shape of You",
    singer: "Ed Sheeran",
    time: "3:54",
    url: require("./assets/pop1.mp3"),
  },
  {
    id: 2,
    name: "Uptown Funk",
    singer: "Mark Ronson ft. Bruno Mars",
    time: "4:30",
    url: require("./assets/pop2.mp3"),
  },
  {
    id: 3,
    name: "Sugar",
    singer: "Maroon 5",
    time: "3:56",
    url: require("./assets/pop3.mp3"),
  },
  {
    id: 4,
    name: "Closer",
    singer: "The Chainsmokers ft. Halsey",
    time: "4:05",
    url: require("./assets/pop4.mp3"),
  },
  {
    id: 5,
    name: "Girls Like You",
    singer: "Maroon 5 ft. Cardi B",
    time: "3:56",
    url: require("./assets/pop5.mp3"),
  },
];

export const artist = [
  { id: 1, songs: [1, 3, 9], name: "Ed Sheeran" },
  { id: 2, songs: [2], name: "Mark Ronson ft. Bruno Mars" },
  { id: 3, songs: [4, 5], name: "Maroon 5" },
  { id: 4, songs: [6], name: "Luis Fonsi ft. Daddy Yankee" },
  { id: 5, songs: [7], name: "OneRepublic" },
  { id: 6, songs: [8], name: "Charlie Puth" },
  { id: 7, songs: [10], name: "Rihanna ft. Mikky Ekko" },
  { id: 8, songs: [11], name: "Twenty One Pilots" },
  { id: 9, songs: [12], name: "Billie Eilish" },
  { id: 10, songs: [13], name: "Justin Bieber" },
  { id: 11, songs: [14], name: "John Legend" },
  { id: 12, songs: [15], name: "Zedd, Maren Morris, Grey" },
  { id: 13, songs: [16], name: "Adele" },
  { id: 14, songs: [17], name: "Justin Timberlake" },
  { id: 15, songs: [18], name: "Whitney Houston" },
  { id: 16, songs: [19], name: "Imagine Dragons" },
  { id: 17, songs: [20], name: "Wiz Khalifa ft. Charlie Puth" },
  { id: 18, songs: [21, 22, 23, 24], name: "Việt Nam" },
];

export const albums = [
  {
    id: 1,
    name: "The Eminem Show",
    singer: "Eminem",
    songs: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "1989",
    singer: "Taylor Swift",
    songs: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ],
  },
  {
    id: 3,
    name: "Folklore",
    singer: "Taylor Swift",
    songs: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    id: 4,
    name: "Thriller",
    singer: "Michael Jackson",
    songs: [9, 10, 11, 12, 13],
  },
  {
    id: 5,
    name: "Abbey Road",
    singer: "The Beatles",
    songs: [1, 2, 3, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24],
  },
  {
    id: 6,
    name: "Purple Rain",
    singer: "Prince",
    songs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    id: 7,
    name: "Back in Black",
    singer: "AC/DC",
    songs: [1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 24],
  },
  // {
  //   id: 8,
  //   name: 'Việt Nam',
  //   singer: 'Tada',
  //   songs: [21, 22, 23, 24],
  // },
];
