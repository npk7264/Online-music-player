import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';

const OptionModal = ({
    visible,
    currentItem,
    onClose,
    options,
    onPlayPress,
    onPlayListPress,
}) => {

    return (
        <>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible} statusBarTranslucent>
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>
                        {currentItem?.song}
                    </Text>
                    <View style={styles.optionContainer}>
                        {options.map(optn => {
                            return (
                                <TouchableWithoutFeedback
                                    key={optn.title}
                                    onPress={optn.onPress}
                                >
                                    <Text style={styles.option}>{optn.title}</Text>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBg} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
        backgroundColor: 'white',
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: 'black',
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 10,
        letterSpacing: 1,
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

export default OptionModal;
