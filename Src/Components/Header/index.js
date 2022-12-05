import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 1;

export default function header({ name }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.username}>{name}</Text>
                <TouchableOpacity style={styles.buttonUser}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8000ff',
        paddingTop: statusBarHeight,
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44,
        flexDirection: 'row'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    username: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonUser: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255,.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2
    }

})