import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import BackBar from '../../components/BackBar';
import { ThemeContext } from '../../context/ThemeContext';
import { AudioContext } from '../../context/AudioContext';


const Lyric = () => {
    const { currentAudio } = useContext(AudioContext)
    const [fileContent, setFileContent] = useState('');
    const { colors, language } = useContext(ThemeContext);
    useEffect(() => {

        const fetchFile = async () => {
            try {
                const response = await fetch(currentAudio.lyric);
                const fileContent = await response.text();
                setFileContent(fileContent);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFile();
    }, []);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <BackBar title={language.lyric}></BackBar>
            <ScrollView>
                <View style={[styles.borderLyric, { backgroundColor: colors.frame }]}>
                    <Text style={[styles.text, { color: colors.text }]}>{fileContent}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Lyric;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    borderLyric: {
        margin: 20,
        padding: 10,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        lineHeight: 35,
    },
});