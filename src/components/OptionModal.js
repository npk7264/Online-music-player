import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    SafeAreaView,
    Image,
} from 'react-native';

import { MaterialIcons } from "@expo/vector-icons";
import { DataContext } from "../context/DataContext";
import { PlaylistContext } from "../context//PlaylistContext";
import { AudioContext } from '../context/AudioContext';
import { ThemeContext } from '../context/ThemeContext';

import { useNavigation } from "@react-navigation/native";


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
    const contextData = useContext(DataContext);
    const contextAudio = useContext(AudioContext);
    const { colors } = useContext(ThemeContext);
    const navigation = useNavigation();

    const handleClose = () => {
        onClose(); // Gọi onClose khi cần thiết
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible} statusBarTranslucent>
                <View style={[styles.modal, { backgroundColor: colors.modal }]}>
                    {/* info */}
                    <View style={styles.header}>
                        <Image
                            source={{ uri: currentItem?.image }}
                            style={styles.poster}
                        />
                        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                            {currentItem?.name}
                        </Text>
                    </View>
                    {/* option */}
                    <View style={styles.optionContainer}>
                        {options.map(optn => {
                            return (
                                <TouchableWithoutFeedback
                                    key={optn.title}
                                    onPress={() => {
                                        optn.onPress(currentItem, contextAudio, contextData, contextPlaylist, navigation);
                                        handleClose();
                                    }}
                                >
                                    <View style={styles.function} >
                                        <MaterialIcons
                                            name={optn.icon}
                                            size={30}
                                            color={colors.text}
                                        ></MaterialIcons>
                                        <Text style={[styles.option, { color: colors.text }]} >{optn.title}</Text>
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
        alignItems: "center",
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
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
        fontSize: 25,
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
