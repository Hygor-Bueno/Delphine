/* eslint-disable react-native/no-inline-styles */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import Loading from "../../Components/Loading/Loading";

export default function Releases(props) {
    const [item, setItem] = useState({
        id: '',
        date: '',
        description: '',
        value: '',
        type: ''
    });

    const [lastID, setLastID] = useState('0');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const getStorange = async (key) => {
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    setLastID(value);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getStorange('lastID');
    }, [props]);
    return (
        <View style={styles.container}>
            {load && <Loading/>}
            <View style={styles.contentDatas}>
                <View style={styles.contentInputs}>
                    <Text style={styles.titleText}>Descrição:</Text>
                    <TextInput style={styles.textDesc}
                        multiline={false}
                        value={item.description}
                        onChangeText={async (text) => await captureValue('description', text)}
                    />
                </View>
                <View style={styles.contentInputs}>
                    <Text style={styles.titleText}>valor:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        value={item.value}
                        keyboardType="numeric"
                        onChangeText={async (text) => await captureValue('value', text)}
                    />
                </View>
                <View style={styles.contentInputs}>
                    <Text style={styles.titleText}>Data:</Text>
                    <TouchableOpacity
                        style={styles.buttonCalendar}
                        activeOpacity={0.5}
                        onPress={() => { setOpen(true) }}
                    >
                        <FontAwesomeIcon color='#CACACA' size={30} icon="calendar-days" />
                    </TouchableOpacity>
                    <DatePicker
                        mode="date"
                        modal
                        open={open}
                        date={date}
                        onDateChange={setDate}
                        onConfirm={async (date) => {
                            setOpen(false);
                            await captureValue('date', convertDate(date));
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </View>
            </View>
            <View style={styles.viewButtons}>
                <TouchableOpacity
                    style={styles.buttonInput}
                    activeOpacity={0.5}
                    onPress={async () => {
                        setLoad(true);
                        if (validateItem()) {
                            await captureValue('type', 1);
                            await insertRegister();
                            clearForm();
                        } else {
                            alert('Atenção, os campos descrição e valor são obrigatórios');
                        }
                    }}
                >
                    <Text style={styles.buttonIcon}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonExit}
                    activeOpacity={0.5}
                    onPress={async () => {
                        setLoad(true);
                        if (validateItem()) {
                            await captureValue('type', 0);
                            await insertRegister();
                            clearForm();
                        } else {
                            alert('Atenção, os campos descrição e valor são obrigatórios');
                        }
                    }}
                >
                    <Text style={styles.buttonIcon}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    async function captureValue(key, text) {
        let value = item;
        value[key] = text;
        setItem({ ...value });
    }
    function validateItem() {
        let result = false;
        if (item.description !== '' && item.value !== '') { result = true; }
        return result;
    }
    async function insertRegister() {
        let newItem = props.movements;
        let newID = parseInt(lastID) + 1;
        await captureValue('id', newID);
        item.date === '' && await captureValue('date', convertDate(new Date()));
        newItem.releasesList.push(item);
        newItem.releasesList = orderObjectArrayByString(newItem.releasesList);
        setLastID(newID);
        isDataView(item.date) && reCalculate(item);
        await postStorange('user', JSON.stringify(newItem));
        await postStorange('lastID', newID.toString());
        props.setMovements({ ...newItem });
        setLoad(false);
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
            value = parseFloat(props.balances) + parseFloat(objectItem.value);
            props.setBalances(value);
        } else {
            value = parseFloat(props.spending) + parseFloat(objectItem.value);
            props.setSpending(value);
        }
    }
    function orderObjectArrayByString(array) {
        return array.sort((x, y) => {
            let a = Date.parse(convertDateToUS(x.date)),
                b = Date.parse(convertDateToUS(y.date));
            return a === b ? 0 : a > b ? 1 : -1;
        });
    }
    function convertDateToUS(dateParam) {
        let newDate = dateParam.split('/');
        return newDate[2] + '-' + newDate[1] + '-' + newDate[0];
    }
    function clearForm() {
        setItem({
            ...{
                id: '',
                date: '',
                description: '',
                value: '',
                type: '',
            },
        });
    }
    async function postStorange(key, value) {
        await AsyncStorage.setItem(key, value);
    }
    function convertDate(dates) {
        let newDate = dates;
        let day = String(newDate.getDate()).padStart(2, '0');
        let month = String(newDate.getMonth() + 1).padStart(2, '0');
        let year = newDate.getFullYear();
        return day + '/' + month + '/' + year;
    }
}
const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: '#3a3b3c'
    },
    contentDatas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 4
    },
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
    buttonCalendar: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        margin: 10,
    },
    buttonIcon: {
        color: 'white',
        fontSize: 30,
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    contentInputs: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textDesc: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 200,
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        color: 'white',
    },
    textName: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 300,
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        color: 'white',
    },
    textValue: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 100,
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        color: 'white',
    },
    titleText: {
        fontSize: 20,
        color:'#CACACA',
    }
});
