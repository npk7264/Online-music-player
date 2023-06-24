import { StyleSheet, Text, View, Modal, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from '../../context/AudioContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetTime = ({ visible, onClose }) => {
    const { colors } = useContext(ThemeContext);
    const contextAudio = useContext(AudioContext);
    const { updateState } = contextAudio;
    const onChange = async (event, selectedDate) => {
        console.log("🚀 ~ file: SetTime.js:12 ~ onChange ~ event:", event)
        if (event.type == "set") {
            const currentDate = selectedDate;
            await updateState(contextAudio, { timeEnd: currentDate });
        }

        onClose();
    };

    return (
        <SafeAreaView style={[styles.centeredView, { backgroundColor: colors.background }]}>
            <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={"time"}
                is24Hour={true}
                onChange={onChange}
            />
        </SafeAreaView>
    );

}

export default SetTime

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
});