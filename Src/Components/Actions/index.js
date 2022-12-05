import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default function Movements({ data }) {
    return (
        <ScrollView style={styles.container} horizontal={true} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton} >
                    <FontAwesomeIcon icon="mug-saucer" />
                </View>
                <Text style={styles.labelButton}>Entradas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton} >
                    <FontAwesomeIcon icon="home-user" />
                </View>
                <Text style={styles.labelButton}>Compras</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <FontAwesomeIcon icon="fa-square-check" />
                </View>
                <Text style={styles.labelButton}>Carteira</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton} />
                <Text style={styles.labelButton}>Boletos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton} />
                <Text style={styles.labelButton}>Conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 84,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14
    },
    actionButton: {
        alignItems: "center",
        marginRight: 32
    },
    areaButton: {
        backgroundColor: "#ecf0f1",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center'
    },
    labelButton: {
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})