import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';

import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { DataContext } from "../context/DataContext";
import { PlaylistContext } from "../context//PlaylistContext";
import { AudioContext } from '../context/AudioContext';
import { ThemeContext } from '../context/ThemeContext';
import { NotificationContext } from '../context/NotifyContext';

import { useNavigation } from "@react-navigation/native";
import { removeFavorite, saveFavorite, updateFollowArtistAndUser } from '../utils/FirebaseHandler';


const OptionModal = ({
    visible,
    currentItem,
    onClose,
    options,
    type,
    // onPlayPress,
    // onPlayListPress,
}) => {
    const contextPlaylist = useContext(PlaylistContext);
    const { favoriteData, setFavoriteData, setFavoriteID, favoriteID } = contextPlaylist;
    const contextData = useContext(DataContext);
    const { listIDArtistFollowing, setListIDArtistFollowing, setArtistFollowing, ArtistFollowing } = contextData;
    const contextAudio = useContext(AudioContext);
    const { colors, language } = useContext(ThemeContext);
    const contextNotify = useContext(NotificationContext);
    const navigation = useNavigation();
    const [isLike, setLike] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);

    //check Follow
    const checkFollow = () => {
        if (listIDArtistFollowing) {
            setIsFollowed(listIDArtistFollowing?.includes(currentItem?.id));
        } else {
            setIsFollowed(false);
        }
    };

    const handleFollow = async () => {
        try {
            //Thêm hoặc bớt singer ra khỏi danh sách đang follow
            if (isFollowed) {
                const newListFollow = listIDArtistFollowing?.filter(
                    (item) => item !== currentItem?.id
                );
                setIsFollowed(false);
                setListIDArtistFollowing([...newListFollow]);
                // setArtist({ ...currentItem, follower: currentItem?.follower - 1 });
                updateFollowArtistAndUser(contextAudio.userId, currentItem?.id, "unfollow", newListFollow);
                const listInfArtist = ArtistFollowing?.filter((item) => item?.id !== currentItem?.id);
                setArtistFollowing([...listInfArtist]);
            } else {
                const newListFollow = listIDArtistFollowing
                    ? [...listIDArtistFollowing, currentItem?.id]
                    : [currentItem?.id];
                setIsFollowed(true);
                setListIDArtistFollowing([...newListFollow]);
                // setArtist({ ...currentItem, follower: currentItem?.follower + 1 });
                updateFollowArtistAndUser(contextAudio.userId, currentItem?.id, "follow", newListFollow);
                setArtistFollowing([...ArtistFollowing, { ...currentItem, follower: currentItem?.follower + 1 }]);
            }
        } catch (e) {
            console.log("Fail to follow artist option modal: ", e);
        }
    }

    const handleClose = () => {
        onClose(); // Gọi onClose khi cần thiết
    };

    useEffect(() => {
        if (type === "song")
            setLike(contextPlaylist.favoriteID?.includes(currentItem?.id));
        else
            checkFollow();
    }, [currentItem])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible} statusBarTranslucent>
                <View style={[styles.modal, { backgroundColor: colors.modal }]}>
                    {/* info */}
                    <View style={styles.header}>
                        <View style={styles.info}>
                            <Image
                                source={{ uri: currentItem?.image }}
                                style={styles.poster}
                            />
                            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                                {currentItem?.name}
                            </Text>
                        </View>
                        {type === "song" &&
                            <TouchableOpacity
                                style={styles.controllerItem}
                                onPress={() => {
                                    const flag = !isLike;
                                    setLike(!isLike);
                                    flag ? saveFavorite(contextAudio.userId, currentItem, favoriteData, setFavoriteData, setFavoriteID, favoriteID) : removeFavorite(contextAudio.userId, currentItem, favoriteData, setFavoriteData, setFavoriteID, favoriteID);
                                }}
                            >
                                <FontAwesome
                                    name={isLike ? "heart" : "heart-o"}
                                    size={25}
                                    color={!isLike ? colors.text : colors.primary}
                                />
                            </TouchableOpacity>}
                        {type === "singer" &&
                            <TouchableOpacity
                                style={styles.controllerItem}
                                onPress={() => {
                                    // const flag = !isFollowed;
                                    setIsFollowed(!isFollowed);
                                    handleFollow();
                                }}
                            >
                                <FontAwesome
                                    name={isFollowed ? "heart" : "heart-o"}
                                    size={25}
                                    color={!isFollowed ? colors.text : colors.primary}
                                />
                            </TouchableOpacity>}
                    </View>
                    {/* option */}
                    <View style={styles.optionContainer}>
                        {options.map(({ title, icon, onPress }) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={title}
                                    onPress={() => {
                                        onPress(currentItem, contextAudio, contextData, contextPlaylist, navigation, contextNotify);
                                        handleClose();
                                    }}
                                >
                                    <View style={styles.function} >
                                        <MaterialIcons
                                            name={icon}
                                            size={30}
                                            color={colors.text}
                                        ></MaterialIcons>
                                        <Text style={[styles.option, { color: colors.text }]} >{language[title]}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View style={styles.modalBg} />
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: 'space-evenly',
        alignItems: "center",
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
        paddingRight: 25,
    },
    info: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

    },
    poster: {
        width: 50,
        height: 50,
        marginLeft: 20,
        borderRadius: 15,
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 20,
        color: 'black',
    },
    option: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black',
        paddingVertical: 10,
        letterSpacing: 1,
        paddingLeft: 20,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    function: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        // backgroundColor: 'red'
        // borderColor: '#efefef',
        // borderWidth: 1,
        // borderRadius: 15,
        // paddingHorizontal: 10
    },
});

export default OptionModal;
