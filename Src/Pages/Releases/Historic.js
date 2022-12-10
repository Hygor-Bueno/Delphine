import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function Historic() {
    const month = [
        { key: '1', value: 'Janeiro' },
        { key: '2', value: 'Fevereiro' },
        { key: '3', value: 'Março' },
        { key: '4', value: 'Abril' },
        { key: '5', value: 'Maio' },
        { key: '6', value: 'Junho' },
        { key: '7', value: 'Julhl' },
        { key: '8', value: 'Agosto' },
        { key: '9', value: 'Setembro' },
        { key: '10', value: 'Outubro' },
        { key: '11', value: 'Novembro' },
        { key: '12', value: 'Dezembro' }
    ];
    const [monthSelected, setMonthSelected] = useState("");
    useEffect(() => { }, []);
    useEffect(() => { console.log(monthSelected) }, [monthSelected]);
    return (
        <View style={styles.container}>
            <View style={styles.contentDatas}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Mês:</Text>
                    <View style={styles.SelectListView}>
                        <SelectList
                            boxStyles={{ backgroundColor: 'white' }}
                            inputStyles={{ fontSize: 18 }}
                            dropdownStyles={{ backgroundColor: 'white' }}
                            placeholder="Selecione um mês"
                            style={styles.textMonth}
                            data={month}
                            setSelected={setMonthSelected} />
                    </View>
                </View>
                <View style={styles.subContent}>
                <Text style={styles.titleText}>Ano:</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#3a3b3c',
    },
    contentDatas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subContent: {
        padding:2,
        width:'50%'
    },
    titleText: {
        fontSize: 20,
        color: '#CACACA',
    },
    textMonth: {
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 25,
        borderRadius: 12,
        color: 'white',
    },
    SelectListView: {
        width: 200
    }
})