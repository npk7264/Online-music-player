import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import AlbumItem from './AlbumItem';
import { albums } from '../../data';
import { ThemeContext } from '../context/ThemeContext';
import { FontAwesome } from "@expo/vector-icons";
const Albums = () => {
    const { colors } = useContext(ThemeContext);
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View
                style={{
                    height: 50,
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: colors.text }}>
                        7 Album
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: colors.primary,
                            marginRight: 10,
                        }}
                    >
                        Sắp xếp
                    </Text>
                    <View>
                        <FontAwesome name="sort" size={30} color={colors.primary} />
                    </View>
                </TouchableOpacity>
            </View>



            <FlatList
                data={albums}
                renderItem={({ item }) => (
                    <AlbumItem
                        name={item.name}
                        songs={item.songs}
                        singer={item.singer}
                    />
                )}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default Albums;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
