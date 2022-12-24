import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Util from '../Utils/Util';

export default function ShoppItem({ data, editItemList, deleteItemList }) {
    const utilGlobal = new Util();
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
                    <View style={styles.buttonsItem}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={ () => {
                                editItemList(data);
                            }}
                        >
                            <FontAwesomeIcon size={12} color="#218838" icon="pencil" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={ () => {
                                deleteItemList(data);
                            }}
                        >
                            <FontAwesomeIcon size={12} color="#dc3545" icon="trash" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    // teste: {
    //     flex: 0,
    //     position: 'absolute',
    //     right: 8,
    //     top: -10,
    // },
    // teste2: {
    //     flex: 0,
    //     position: 'absolute',
    //     right: 20,
    //     top: -10,
    // },
    buttonsItem: {
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        marginTop: 12,
        marginBottom: 12,
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
        width: '35%'
    },
    subContentRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '65%'
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
        fontSize: 11,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    subValue: {
        fontSize: 12,
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