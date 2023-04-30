import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const ArtistItem = ({ name, songs, onPressOptionModal }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.container}
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
                        <Text style={{ fontSize: 18 }} numberOfLines={1}>
                            {name}
                        </Text>
                        <Text style={{ fontSize: 16, color: "gray" }}>{songs?.length} bài hát</Text>
                    </View>
                </View>

                {/* OPTION */}
                <TouchableOpacity
                    onPress={onPressOptionModal}
                >
                    <Ionicons name="ellipsis-vertical" size={20} />
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
        backgroundColor: "white",
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