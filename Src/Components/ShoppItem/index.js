import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Util from '../Utils/Util';

export default function ShoppItem({ data, setLoad }) {
    const utilGlobal = new Util();
    console.log(data, "JIJIJIJIJI");
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.subContentLeft}>
                    <Text style={styles.label}>{data.description}</Text>
                </View>
                <View style={styles.subContentRight}>
                    <View style={styles.itemsShoppQtd}>
                        <Text style={styles.subLabel}>Qtd:</Text>
                        <Text style={styles.subValue}>{data.quantities}</Text>
                    </View>

                    <View style={styles.itemsShopp}>
                        <Text style={styles.subLabel}>Unt/Kg:</Text>
                        <Text style={styles.subValue}>{utilGlobal.maskMoney(data.value)}</Text>
                    </View>

                    <View style={styles.itemsShopp}>
                        <Text style={styles.subLabel}>SubTotal:</Text>
                        <Text style={styles.subValue}>{utilGlobal.maskMoney(parseFloat(data.value) * parseFloat(data.quantities))}</Text>
                    </View>
                    {/* <View style={styles.itemsShopp}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={async () => {
                                setLoad(true);

                                setLoad(false);
                            }}
                        >
                            <FontAwesomeIcon size={22} color="#CACACA" icon="trash" />
                        </TouchableOpacity>
                    </View> */}
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#fff',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    subContentLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%'
    },
    subContentRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    itemsShoppQtd: {
        width: '20%'
    },
    itemsShopp: {
        width: '30%'
    },
    date: {
        color: "#CaCaCa",
        fontWeight: 'bold'
    },
    label: {
        color: '#DADADA',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subLabel: {
        color: '#DADADA',
        fontSize: 12,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    subValue: {
        fontSize: 14,
        color: '#DADADA',
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
        borderRadius: 8
    }
})