import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Loading from '../../Components/Loading/Loading';
import MovementsEdit from '../../Components/MovementsEdit';

export default function Historic(props) {
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
    const [monthSelected, setMonthSelected] = useState('');
    const [yar, setYar] = useState(0);
    const [load, setLoad] = useState(false);
    const [listData, setListData] = useState([]);

    return (
        <View style={styles.container}>
            {load && <Loading />}
            <View style={styles.contentDatas}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Mês:</Text>
                    <View style={styles.SelectListView}>
                        <SelectList
                            boxStyles={{ backgroundColor: 'white' }}
                            inputStyles={{ fontSize: 14,color: '#555' }}
                            dropdownStyles={{ backgroundColor: 'white'}}
                            dropdownTextStyles={{ color: '#555' }}
                            placeholder="Selec. um mês"
                            data={month}
                            setSelected={setMonthSelected}
                            />
                    </View>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Ano:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        keyboardType="numeric"
                        value={yar}
                        onChangeText={async (text) => setYar(text)}
                    />
                </View>
                <View style={styles.subContentBtn}>
                    <TouchableOpacity
                        style={styles.buttonInput}
                        activeOpacity={0.5}
                        onPress={async () => {
                            let response = validateItem();
                            if (response.error) {
                                alert(response.message);
                            } else {
                                setLoad(true);
                                let arrayList = props.movements.releasesList || [];
                                let validate = `${monthSelected.padStart(2, '0')}/${yar}`;
                                let newList = [];
                                arrayList.forEach(item => {
                                    if (item.date.includes(validate)) { newList.push(item); }
                                });
                                setListData([...newList]);
                                setLoad(false);

                            }
                        }}
                    >
                        <FontAwesomeIcon color='white' size={22} icon="search" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>

            </View>
            <View style={styles.listData}>
                <FlatList
                    style={styles.list}
                    data={listData}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <MovementsEdit spending={props.spending} balances={props.balances} setBalances={props.setBalances} setSpending={props.setSpending} setLoad={setLoad} listData={listData} setListData={setListData} movements={props.movements} setMovements={props.setMovements} data={item} />}
                />
            </View>
        </View>
    );
    function validateItem() {
        let message = 'Atenção: \n';
        let result = { error: false };
        if (monthSelected === '' || yar === 0) {
            message += "Os campo mês e ano são obrigatórios. \n";
            result.error = true;
        }
        if (parseInt(yar) < 1000) {
            message += "O ano deve conter 4 dígitos. \n";
            result.error = true;
        }
        result.message = message;
        return result;
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#3a3b3c',
    },
    contentDatas: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subContent: {
        justifyContent: 'space-between',
        padding: 2,
        height: 75,
        zIndex: 1
    },
    subContentBtn: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        color: '#CACACA',
    },
    SelectListView: {
        width: 150
    },
    textValue: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 100,
        height: 46,
        fontSize: 22,
        borderRadius: 12,
        color: '#808080',
        backgroundColor: 'white',
    },
    buttonInput: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#218838',
    },
    buttonIcon: {
        color: 'white',
        fontSize: 30,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        backgroundColor: '#1B1E23',
        margin: 12,
        padding: 12,
        height: '65%',
        borderRadius: 12
    }
})