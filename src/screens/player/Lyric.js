import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import BackBar from '../../components/BackBar';
import { ThemeContext } from '../../context/ThemeContext';



const Lyric = () => {
    const [fileContent, setFileContent] = useState('');
    const { colors } = useContext(ThemeContext);
    useEffect(() => {
        const url = 'https://firebasestorage.googleapis.com/v0/b/musicapp-80f91.appspot.com/o/lyrics%2Fpop1.txt?alt=media&token=8cec7d24-fc76-4144-93e6-17845b9f4aa9'; // Đường link đến file txt

        const fetchFile = async () => {
            try {
                const response = await fetch(url);
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
            <BackBar title={'Lyric'}></BackBar>
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