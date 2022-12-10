/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loading() {
    return (
        <View style={styles.bgModal}>
            <ActivityIndicator color="#FFD700" size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    bgModal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,.3)',
        width: '100%',
        height: '100%',
        zIndex: 10,
        position: 'absolute'
    },
});
