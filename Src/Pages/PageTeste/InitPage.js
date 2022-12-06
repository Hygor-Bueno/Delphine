/* eslint-disable react-native/no-inline-styles */
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function InitPage() {
    const [item, setItem] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
        const getStorange = async (key) => {
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    setData(value);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getStorange('user');
    }, []);
    useEffect(() => { console.log(item) }, [item]);
    return (
        <View>
            <View style={styles.contentInputs}>
                <Text style={styles.titleText}>Descrição:</Text>
                <TextInput style={styles.textInputs}
                    multiline={false}
                    value={item.description}
                    onChangeText={(text) => captureValue('description', text)}
                />
            </View>
            <View style={styles.contentInputs}>
                <Text style={styles.titleText}>valor</Text>
                <TextInput style={styles.textInputs}
                    multiline={false}
                    value={item.value}
                    keyboardType="numeric"
                    onChangeText={(text) => captureValue('value', text)}
                />
            </View>
            <View style={styles.viewButtons}>
                <TouchableOpacity
                    style={styles.buttonInput}
                    activeOpacity={0.5}
                    onPress={() => { console.log('Entrada') }}
                >
                    <Text style={styles.buttonIcon}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonExit}
                    activeOpacity={0.5}
                    onPress={() => { console.log('Saída') }}
                >
                    <Text style={styles.buttonIcon}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    function captureValue(key, text) {
        let value = item;
        value[key] = text;
        setItem({ ...value });
    }
}

const styles = StyleSheet.create({
    buttonExit: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        height: 40,
        width: '40%',
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#dc3545'
    },
    buttonInput: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        height: 40,
        width: '40%',
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#218838'
    },
    buttonIcon: {
        color: 'white',
        fontSize: 30,
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    contentInputs:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    textInputs: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 250,
        height: 35
    },
    titleText:{
        fontSize:20
    }
})