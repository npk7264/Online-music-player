import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { db, auth } from "../../services/firebaseConfig"
import { collection, addDoc } from "firebase/firestore";

const AddPlaylist = ({
    visible,
    onClose,
}) => {
    const { colors, darkMode } = useContext(ThemeContext);
    const [isFocused, setIsFocused] = useState(false); // focus TextInput
    const [namePlaylist, setNamePlaylist] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    //check keyboard visible
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    //add new playlist
    const handleCreatePlaylist = async () => {
        try {
            const userId = 'MMp5BVLgmzPfKvaiDKSOrewVVvD3';
            const docRef = await addDoc(collection(db, `users/${userId}/playlist`),
                {
                    name: namePlaylist,
                    listSong: []
                });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            alert("create playlist!", e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible} statusBarTranslucent>
                <View style={[styles.modal, { backgroundColor: colors.modal, bottom: isKeyboardVisible ? 250 : 0 }]}>
                    {/* info */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                            Tạo danh sách phát
                        </Text>
                    </View>
                    <TextInput
                        style={[
                            styles.textInput,
                            {
                                borderColor: isFocused ? "#ff8216" : null,
                                backgroundColor: isFocused ? (darkMode ? '#2a221f' : "#fff5ed") : (darkMode ? "#1f222a" : "#f5f5f6"),
                                borderWidth: isFocused ? 1 : 0,
                                color: colors.text
                            },
                        ]}
                        placeholder="Tên danh sách phát"
                        placeholderTextColor={'gray'}
                        autoFocus={true}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={(text) => setNamePlaylist(text)}
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.frame }]}
                            onPress={onClose}
                        >
                            <Text style={{ color: colors.primary, fontSize: 18 }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.primary }]}
                            onPress={() => handleCreatePlaylist()}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Tạo</Text>
                        </TouchableOpacity>
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
        height: 250
    },
    header: {
        justifyContent: 'center',
        alignItems: "center",
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
    },
    textInput: {
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 15,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 20,
        color: 'black',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 80
    },
    button: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
});

export default AddPlaylist;
