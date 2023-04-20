import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const ArtistItem = () => {
    return (
        <TouchableOpacity style={styles.container}>
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
                        Đàm Vĩnh Hưng
                    </Text>
                    <Text style={{ fontSize: 16, color: "gray" }}>20 bài hát</Text>
                </View>
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