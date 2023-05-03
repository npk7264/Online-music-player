import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from '../context/ThemeContext';

const ArtistItem = ({ name, songs, onPressOptionModal }) => {
    const navigation = useNavigation();
    const { colors } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: colors.background }]}
            onPress={() => navigation.navigate('ArtistDetail', { name, songs })}
        >
            <View style={styles.content}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {/* Image */}
                    <Image
                        source={require("../../assets/poster_music.png")}
                        style={styles.poster}
                    />

                    {/* Info */}
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={{ fontSize: 18, color: colors.text }} numberOfLines={1}>
                            {name}
                        </Text>
                        <Text style={{ fontSize: 16, color: "gray" }}>{songs?.length} bài hát</Text>
                    </View>
                </View>

                {/* OPTION */}
                <TouchableOpacity
                    onPress={onPressOptionModal}
                >
                    <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
    )
}

export default ArtistItem;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 70,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    poster: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 100,
    },
}
)