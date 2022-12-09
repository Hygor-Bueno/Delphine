import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Movements({ data }) {
    const [showValue, setShowValue] = useState(false);
    return (
        <TouchableOpacity style={styles.container} onPress={()=>setShowValue(!showValue)}>
            <Text style={styles.date}>{data.date}</Text>
            <View style={styles.content}>
                <Text style={styles.label}>{data.description}</Text>
                {
                    showValue ? (<Text style={data.type === 1 ? styles.value : styles.expenses}>{data.type === 1 ? maskMoney(data.value) : `-${maskMoney(data.value)}`}</Text>) :(<View style={styles.skeleton}></View>)
                }
            </View>
        </TouchableOpacity>
    );
    function maskMoney(value) {
        let newValue = parseFloat(value ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return newValue;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DADADA'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: "#DADADA",
        fontWeight: 'bold'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    expenses: {
        fontSize: 16,
        color: '#e75c3c',
        fontWeight: 'bold'
    },
    skeleton: {
        marginTop: 6,
        width: 80,
        height: 10,
        backgroundColor: '#DADADA',
        borderRadius:8
    }
})