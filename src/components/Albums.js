import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import AlbumItem from './AlbumItem';
import { albums } from '../../data';

const Albums = () => {
    return (
        <View style={styles.container}>
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
