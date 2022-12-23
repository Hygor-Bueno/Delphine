import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function MovementsEdit({ data, movements, setMovements, listData, setListData, setLoad, balances, setBalances, spending, setSpending }) {
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{data.date}</Text>
            <View style={styles.content}>
                <Text style={styles.label}>{data.description}</Text>
                <View style={styles.subContent}>
                    <Text style={data.type === 1 ? styles.value : styles.expenses}>{data.type === 1 ? maskMoney(data.value) : `-${maskMoney(data.value)}`}</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={async () => {
                            setLoad(true);
                            let array = movements.releasesList || [];
                            movements.releasesList = deleteItem(array);
                            listData = deleteItem(listData);
                            await AsyncStorage.setItem('user', JSON.stringify(movements));
                            setMovements({ ...movements });
                            setListData([...listData]);
                            if (isDataView(data.date)) { reCalculate(data); };
                            setLoad(false);
                        }}
                    >

                        <FontAwesomeIcon size={22} color="#CACACA" icon="trash" />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
    function maskMoney(value) {
        let newValue = parseFloat(value ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return newValue;
    }

    function deleteItem(array) {
        array.forEach((mov, index) => {
            if (mov.id === data.id) {
                array.splice(index, 1);
            }
        });
        return array;
    }

    function isDataView(dateValidate) {
        let dates = new Date();
        let month = String(dates.getMonth() + 1).padStart(2, '0');
        let year = dates.getFullYear();
        let validate = `${month}/${year}`;
        return dateValidate.includes(validate);
    }
    function reCalculate(objectItem) {
        let value;
        if (objectItem.type === 1) {
            value = parseFloat(balances) - parseFloat(objectItem.value);
            setBalances(value);
        } else {
            value = parseFloat(spending) - parseFloat(objectItem.value);
            setSpending(value);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#fff'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    subContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'50%'
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
        borderRadius: 8
    }
})