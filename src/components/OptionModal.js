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
import { ThemeContext } from '../context/ThemeContext';

const OptionModal = ({
    visible,
    currentItem,
    onClose,
    options,
    onPlayPress,
    onPlayListPress,
}) => {
    const { colors } = useContext(ThemeContext);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible} statusBarTranslucent>
                <View style={[styles.modal, { backgroundColor: colors.modal }]}>
                    {/* info */}
                    <View style={styles.header}>
                        <Image
                            source={require("../../assets/temp.jpg")}
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
                                    onPress={() => optn.onPress(currentItem)}
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
                <TouchableWithoutFeedback onPress={onClose}>
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
    },
});

export default OptionModal;
